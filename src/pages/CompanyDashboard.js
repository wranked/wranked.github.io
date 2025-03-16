import React, { useEffect, useState, useTransition } from 'react'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'

import AppContent from '../components/AppContent'
import { useApiClient } from '../context/ApiClient'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthProvider'
import CompanyAvatar from '../components/CompanyAvatar'
import Company from '../components/Company'
import LoadingSpinner from '../common/LoadingSpinner'



export default function CompanyDashboard(props) {

  const { company_id } = useParams()
  const { t } = useTranslation()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState("view")

  const companyData = data

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
{
  // loading ?
  //   <LoadingSpinner />

  //   :
  // <div>
  //   <h1>Company Dashboard</h1>
  //   <CompanyAvatar size="60" image={data.avatar_url} /> <b>{data.display_name}</b>
  //   <h3>legal_name: {data.legal_name}</h3>
  //   <h3>id: {company_id}</h3>
  //   <h3>id_name: {data.id_name}</h3>
  //   <h3>locations:</h3>
  //   <ul>{data.locations.map((location, index) => <li>{location}</li>)}</ul>
  //   <h3>admins:</h3>
  //   <ul>{data.admins.map((admin, index) => <li>{admin.user_email}</li>)}</ul>

  // </div>
}