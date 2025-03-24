import fs from 'node:fs'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

import { Meal, NewMeal } from '@/types'
import { simulateDelay } from '@/utils/simulateDelay'

const db = sql('meals.db')

export async function getMeals() {
  await simulateDelay(2000)

  const meals = await db
    .prepare('SELECT * FROM meals')
    .all() as Meal[]

  // simulateRandomError()

  return meals
}

export async function getMeal(slug: string) {
  await simulateDelay(2000)

  const meal = await db
    .prepare('SELECT * FROM meals WHERE slug = ?')
    .get(slug) as Meal | undefined

  // simulateRandomError()

  return meal
}

export async function saveMeal(meal: NewMeal & { image: File }) {
  const slug = slugify(meal.title, { lower: true })
  const instructions = xss(meal.instructions)

  // image
  const extension = meal.image.name.split('.').pop()
  const fileName = `${meal.title}-${Date.now()}.${extension}`

  const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed')
    }
  })

  const newMeal = {
    ...meal,
    slug,
    instructions,
    image: `/images/${fileName}`
  }

  await db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(newMeal)
}
