'use client'

import { useFormStatus } from 'react-dom'

export const MealsFormSubmit = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sharing...' : 'Share Meal'}
    </button>
  )
}
