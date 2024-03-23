import React, { useEffect, useState } from 'react'

import Review from './Review'
import { useData } from "../pages/CompanyDetails"
import { useApiClient } from '../context/ApiClient'
import { useParams } from 'react-router-dom'
import MyReview from './MyReview'
import ReviewSummary from './ReviewSummary'

export default function ListReviews() {
  
  const { company_id } = useParams()

  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toggleRefresh, setToggleRefresh] = useState(false)  // TODO: Find how to update parent state to refresh list of reviews after post a new one 
  
  const { companyData } = useData()
  const client = useApiClient()

  useEffect(function () {
    setLoading(true)
    client.get(`/companies/${company_id}/reviews/`)
      .then(function (res) {
        setData(res.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [])

  if (error) return <p>Error: {error.message}</p>

  return (
    loading
      ?
      <p>Loading...</p>
      :
      <>
        <ReviewSummary company={companyData} />
        <MyReview />
        {
          data.map((review, index) =>
            <Review index={index} review={review} toggleRefresh={toggleRefresh} setToggleRefresh={setToggleRefresh} />
          )
        }
      </>
  )
}
