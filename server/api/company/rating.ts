interface RatingInterface{
  rating: number
  reviewCount: number
}

export default defineEventHandler(() => {
  const rating = <RatingInterface>{
    rating: 4.7,
    reviewCount: 19
  }
  return rating
})
