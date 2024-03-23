import React, { useEffect, useState } from 'react'

import Review from './Review'
import WriteReview from './WriteReview'
import { useApiClient } from '../context/ApiClient'
import { useParams } from 'react-router-dom'

export default function MyReview() {

  const { company_id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()

  useEffect(function () {
    setLoading(true)
    client.get(`/companies/${company_id}/reviews/me`)
      .then(function (res) {
        setData(res.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [])

  if (error) {
    if (error.response.status == 404) return <WriteReview />
    return <p>Error: {error.message}</p>
  }

  return (
    loading
      ?
      <p>Loading...</p>
      :
      <Review editMode="false" review={data} />
  )
}
