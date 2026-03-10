import React, { useEffect, useState } from 'react'

import LoadingSpinner from 'shared/ui/LoadingSpinner'
import Review from 'features/reviews/components/Review'
import { useCompanyData } from 'features/companies'
import { useApiClient } from 'context/ApiClient'
import { useParams } from 'react-router-dom'
import MyCompanyReview from 'features/reviews/components/MyCompanyReview'
import ReviewSummary from 'features/reviews/components/ReviewSummary'
import { useAuth } from 'features/auth'

export default function ListReviews(props) {

  const { company_id } = useParams()


  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { companyData, setCompanyData } = useCompanyData()
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
  }, [])


  function updateCompany() {
    setLoading(true)
    client.get(`/companies/${company_id}`)
      .then(function (response) {
        setCompanyData(response.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }

  if (error) return <p>Error: {error.message}</p>

  if (loading) return <LoadingSpinner />

  return (
    <>
      <h4>Review Summary</h4>
      <ReviewSummary company={companyData} />
      <MyCompanyReview updateParent={updateCompany} />
      <h4>Reviews</h4>
      {
        (data.length == 0) ?
          <p>There are no more reviews for now.</p>
          :
          data.map((review, index) =>
            <Review key={review.id} review={review} />
          )
      }
    </>
  )
}
