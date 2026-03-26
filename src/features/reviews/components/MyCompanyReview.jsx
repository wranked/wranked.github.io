import React, { useEffect, useState } from 'react'

import ReviewListing from 'features/reviews/components/ReviewListing'
import WriteReview from 'features/reviews/components/WriteReview'
import { useApiClient } from 'context/ApiClient'
import { useParams } from 'react-router-dom'
import { useAuth } from 'features/auth'
import LoadingSpinner from 'shared/ui/LoadingSpinner'


export default function MyCompanyReview(props) {

  const { company_id } = useParams()

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
    setError(null)
    client.get(`/companies/${company_id}/reviews/me/`,
      { headers: { Authorization: `Token ${authContext.token}` } }
    )
      .then(function (res) {
        setError(null)
        setData(res.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
        setLoading(false)
      })
  }, [mode, setMode])

  if (error) {
    if (error.response.status == 404 || error.response.status == 401) return <WriteReview setMode={updateMode} />
    return <p>Error: {error.message}</p>
  }

  if (loading) return <LoadingSpinner />

  return (<ReviewListing mode={mode} ownReview={true} review={data} setMode={setMode} publicReview={data.is_public} updateParent={props.updateParent} />)
}
