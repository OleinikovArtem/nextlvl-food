'use server'

import { saveMeal } from '@/lib/meals'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function isInvalidText(text: string) {
  return !text || text.trim() === ''
}


export async function shareMeal(prevState: unknown, formData: FormData) {

  const meal = {
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    title: formData.get('title') as string,
    image: formData.get('image') as File,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
  }

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) {
    return {
      message: 'Invalid meal data. Please check your inputs and try again.'
    }
  }

  await saveMeal(meal)
  revalidatePath('/meals')
  redirect('/meals')
}
