import { Metadata } from 'next'
import Image from 'next/image'

import { notFound } from 'next/navigation'

import classes from './page.module.css'

import { getMeal } from '@/lib/meals'
import { BASE_IMG_URl } from '@/constants'


export async function generateMetadata({ params }: { params: Promise<{ mealSlug: string }> }): Promise<Metadata> {
  const { mealSlug } = await params
  const meal = await getMeal(mealSlug)

  if (!meal) return notFound()

  return {
    title: meal?.title,
    description: meal?.summary
  }
}

export default async function MealDetailsPage({ params }: { params: Promise<{ mealSlug: string }> }) {
  const { mealSlug } = await (params)
  const meal = await getMeal(mealSlug)

  if (!meal) return notFound()

  const instructions = meal.instructions.replaceAll(/\n/g, '<br/>')

  return (
   <>
     <header className={classes.header}>
       <div className={classes.image}>
         <Image fill src={`${BASE_IMG_URl}${meal.image}`} alt={meal.slug}  />
       </div>
       <div className={classes.headerText}>
         <h1>{meal.title}</h1>
         <p className={classes.creator}>
           by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
         </p>
         <p className={classes.summary}>{meal.summary}</p>
       </div>
     </header>
     <main>
       <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: instructions }}></p>
     </main>
   </>
  )
}
