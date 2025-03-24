import { S3 } from '@aws-sdk/client-s3'

import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'

import { Meal, NewMeal } from '@/types'
import { simulateDelay } from '@/utils/simulateDelay'
import { BASE_IMG_URl } from '@/constants'

const s3 = new S3({
  region: 'eu-north-1'
});
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

  const extension = meal.image.name.split('.').pop()
  const fileName = `${slug}-${Date.now()}.${extension}`

  const bufferedImage = await meal.image.arrayBuffer()
  const bucketName = BASE_IMG_URl?.slice(8).split('.')[0]

  await s3.putObject({
    Bucket: bucketName,
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  })


  const image = fileName

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run({
    title: meal.title,
    summary: meal.summary,
    instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    image,
    slug
  })
}
