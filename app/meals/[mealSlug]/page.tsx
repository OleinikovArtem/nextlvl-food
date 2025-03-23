export default async function MealDetailsPage({ params }: { params: Promise<{ mealSlug: string }> }) {
  const { mealSlug } = await (params);

  return (
    <h1 className='title'>Meal Details Page: {mealSlug}</h1>
  )
}
