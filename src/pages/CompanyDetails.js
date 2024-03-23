import React, { useEffect, useState } from 'react'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'

import AppContent from '../components/AppContent'
import ReviewSummary from '../components/ReviewSummary'
import { useApiClient } from '../context/ApiClient'


export default function CompanyDetails() {

  const { company_id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const companyData = data

  const client = useApiClient()

  useEffect(function () {
    setLoading(true)
    client.get(`/companies/${company_id}`)
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
          <h3>display_name: {data.display_name}</h3>
          <h3>id: {company_id}</h3>
          <h3>id_name: {data.id_name}</h3>
          <h3>legal_name: {data.legal_name}</h3>
          <nav>
            <Link to="">About</Link> <Link to="reviews" >Reviews</Link> <Link to="jobs">Jobs</Link>
          </nav>
          <Outlet context={{ companyData }} />
        </div>
      }
    </AppContent>
  )
}

export function useData() {
  return useOutletContext()
}
