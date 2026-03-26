import { useState, useEffect } from 'react'

import AppContent from 'shared/layout/AppContent'
import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'

import ContributionListing from 'features/reviews/components/ContributionListing'
import { Navigate } from 'react-router-dom'
import WriteReview from 'features/reviews/components/WriteReview'
import LoadingSpinner from 'shared/ui/LoadingSpinner'
import WriteContribution from '../components/WriteContribution'


export default function ContributionsPage() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState("")

  const client = useApiClient()
  const authContext = useAuth()

  function updateMode(value) {
    setMode(value)
  }

  useEffect(function () {
    setLoading(true)
    client.get(`/reviews/me/`,
      { headers: { Authorization: `Token ${authContext.token}` } }
    )
      .then(function (res) {
        setData(res.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [mode, setMode])

  if (error) {
    if (error.response.status == 401) return <Navigate to="/login/" />
    return <p>Error: {error.message}</p>
  }

  return (
    <AppContent>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h1>Contributions</h1>
          <p>Your contributions help other job seekers like you. New contributions are reviewed by our team and remain "pending" until it is approved.</p>
          <p>How to calculate the Companies Ranking:</p>
          <ul>
            <li>Only one contribution per company and user is allowed</li>
            <li>The companies need at least 3 valid ratings to be listed in the ranking</li>
            <li>The ratings are valid for a certain period of time, reviews will always be visible</li>
            <li>Ratings from unverified mobile phone users are not taken into account</li>
            <li>Ratings from company admin users are not taken into account</li>
            <li>Ratings from public reviews are worth more than anonymous ones</li>
          </ul>
          <WriteContribution setMode={updateMode} />
          <h2>My reviews</h2>
          {
            data.map((review, index) =>
              <ContributionListing key={review.id} review={review} setMode={setMode} />
            )
          }
        </>
      }
    </AppContent>
  )
}
