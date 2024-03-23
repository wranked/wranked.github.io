import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useApiClient } from '../context/ApiClient'
import Job from './Job'


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
        setData(res.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [])

  function list_jobs() {
    const arr = data.map((job, index) => <Job index={index} job={job} />)
      return (arr.length > 0) ? arr : <h3>There are no jobs right now...</h3>
  }

  return (
    loading ?
      <p>Loading...</p>
      :
      <>{list_jobs()}</>
  )
}
