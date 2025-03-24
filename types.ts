export type Meal = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  creator: string;
  image: string;
  creator_email: string;
  instructions: string;
}

export type NewMeal = Omit<Meal, 'image' | 'id'>
