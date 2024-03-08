import React from 'react'

import Review from './Review'
import { useData } from "../pages/CompanyDetails"


export default function ListReviews() {

  const { data } = useData()

  return (
    <>
      {
        data.reviews.map((review, index) =>
          <Review index={index} review={review} />
        )
      }
    </>
  )
}
