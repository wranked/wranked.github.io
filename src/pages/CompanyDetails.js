import React, { useEffect, useState } from 'react'
import { FaUserSecret } from "react-icons/fa";
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'

import AppContent from '../components/AppContent'
import Card from '../common/Card'
import Review from '../components/Review'
import ReviewSummary from '../components/ReviewSummary'
import { useApiClient } from '../context/ApiClient'


export default function CompanyDetails() {

  const { id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()

  useEffect(function () {
    setLoading(true)
    client.get(`/companies/${id}/`)
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
    <AppContent>
      {loading ?
        <p>Loading...</p>
        :
        <div>
          <h1>Company Details</h1>
          <h3>ID: {id}</h3>
          <h3>{data.name}</h3>
          <h3>{data.legal_name}</h3>
          <ReviewSummary company={data} />
          <nav>
            <Link to="">About</Link> <Link to="reviews" >Reviews</Link> <Link to="jobs">Jobs</Link>
          </nav>
          <Outlet context={{ data }} />

        </div>
      }
    </AppContent>
  )
}

export function useData() {
  return useOutletContext()
}
