import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApiClient } from '../context/ApiClient'
import Job from './Job'
import LoadingSpinner from '../common/LoadingSpinner'


export default function ListJobs() {

  const { company_id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()

  let url = `/jobs/`
  if (company_id) url = `/companies/${company_id}/jobs/`

  useEffect(function () {
    setLoading(true)
    client.get(url)
      .then(function (res) {
        setData(res.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [])

  if (error) return <p>Error: {error.message}</p>

  if (loading) return <LoadingSpinner/>

  const arr = data.map((job, index) => <Job key={job.id} job={job} />)
  
  if (arr.length > 0) return arr

  return <h3>There are no jobs right now...</h3>

}
