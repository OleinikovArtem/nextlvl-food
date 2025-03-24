import Link from 'next/link'
import Image from 'next/image'

import classes from './meal-item.module.css'
import { Meal } from '@/types'
import { BASE_IMG_URl } from '@/constants'

export default function MealItem({ title, slug, image, summary, creator }: Meal) {

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={`${BASE_IMG_URl}/${image}`} alt={title} fill priority sizes='100%'/>
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}
