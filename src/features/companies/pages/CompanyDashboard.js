import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AppContent from 'components/AppContent'
import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'
import Company from 'features/companies/components/Company'
import LoadingSpinner from 'common/LoadingSpinner'


export default function CompanyDashboard(props) {

  const { company_id } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState("view")

  const authContext = useAuth()
  const client = useApiClient()

  useEffect(function () {
    if (authContext.user) {
      setLoading(true)
      client.get(`/companies/${company_id}/admin/`,
        { headers: { Authorization: `Token ${authContext.token}` } }
      )
        .then(function (response) {
          setData(response.data)
          setLoading(false)
        })
        .catch(function (err) {
          setError(err)
        })
    }
  }, [company_id, props.mode, authContext.user])

  return (
    <AppContent>
      {loading ?
        <LoadingSpinner /> :
        <>
          <h1>Company Dashboard</h1>
          <Company mode={mode} setMode={setMode} company={data} />
        </>
      }
    </AppContent>
  )
}
