import React, { useEffect, useState } from 'react'

import AppContent from 'components/AppContent'
import JobDetails from 'features/jobs/components/JobDetails'

import { useParams } from 'react-router-dom'
import { useApiClient } from 'context/ApiClient'
import LoadingSpinner from 'common/LoadingSpinner'


export default function JobPage() {

  const { job_id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()


  useEffect(function () {
      setLoading(true)
      client.get(`/jobs/${job_id}`)
        .then(function (res) {
          setData(res.data)
          setLoading(false)
        })
        .catch(function (err) {
          setError(err)
        })
    }, [])


  return (
    <AppContent>
      {loading ?
        <LoadingSpinner />
        :
      <><h1>Job Details</h1>
      <JobDetails job={data} /></>
      }
    </AppContent>
  )
}
