import React, { useEffect, useState } from 'react'

import LoadingSpinner from '../common/LoadingSpinner'
import Review from './Review'
import { useData } from "../pages/CompanyDetails"
import { useApiClient } from '../context/ApiClient'
import { useParams } from 'react-router-dom'
import MyCompanyReview from './MyCompanyReview'
import ReviewSummary from './ReviewSummary'
import { useAuth } from '../context/AuthProvider'

export default function ListReviews() {
  
  const { company_id } = useParams()

  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toggleRefresh, setToggleRefresh] = useState(false)  // TODO: Find how to update parent state to refresh list of reviews after post a new one 
  
  const { companyData } = useData()
  const client = useApiClient()
  const authContext = useAuth()

  useEffect(function () {
    setLoading(true)
    let url = `/companies/${company_id}/reviews/`
    let headers = {}
    if (authContext.user) {
      url = `/companies/${company_id}/reviews/others/`
      headers = { Authorization: `Token ${authContext.token}` }
    }
    client.get(url, 
      { headers: headers }
    )
      .then(function (res) {
        setData(res.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [toggleRefresh])

  if (error) return <p>Error: {error.message}</p>

  if (loading) return <LoadingSpinner/>

  return (
      <>
        <ReviewSummary company={companyData} />
        <MyCompanyReview />
        <h4>Reviews</h4>
        {
          data.map((review, index) =>
            <Review key={review.id} review={review} updateParent={setToggleRefresh} />
          )
        }
      </>
  )
}
