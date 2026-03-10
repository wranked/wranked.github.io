import { useState, useEffect } from 'react'

import AppContent from 'shared/layout/AppContent'
import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'

import MyReview from 'features/reviews/components/MyReview'
import { Navigate } from 'react-router-dom'
import WriteReview from 'features/reviews/components/WriteReview'
import LoadingSpinner from 'shared/ui/LoadingSpinner'


export default function ContributionsPage() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState("")

  const client = useApiClient()
  const authContext = useAuth()

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
          <p>Your contributions help other job seekers like you. New contributions are reviewed by our team and remain "pending" until the process is complete.</p>
          <h2>My reviews</h2>
          <WriteReview setMode={setMode} />
          {
            data.map((review, index) =>
              <MyReview key={review.id} review={review} setMode={setMode} />
            )
          }
        </>
      }
    </AppContent>
  )
}
