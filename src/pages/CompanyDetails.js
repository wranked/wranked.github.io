import React, { useEffect, useState, useTransition } from 'react'
import { Link, Outlet, useOutletContext, useParams } from 'react-router-dom'

import AppContent from '../components/AppContent'
// import ReviewSummary from '../components/ReviewSummary'
import { useApiClient } from '../context/ApiClient'
import { useTranslation } from 'react-i18next'
import CompanyAvatar from '../components/CompanyAvatar'
import LoadingSpinner from '../common/LoadingSpinner'



export default function CompanyDetails() {

  const { company_id } = useParams()
  const { t } = useTranslation()

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
        <LoadingSpinner />
        :
        <div>
          <CompanyAvatar size="60" image={data.avatar_url} /> <b>{data.display_name}</b>
          <h3>id: {company_id}</h3>
          <h3>id_name: {data.id_name}</h3>
          {/* <h5>legal_name: {data.legal_name}</h5> */}
          <h3><Link to={data.url}>{data.url}</Link></h3>
          <h3>{data.primary_location}</h3>
          <nav>
            <Link to="about">{t("about")}</Link> <Link to="reviews" >{t("reviews")}</Link> <Link to="jobs">{t("jobs")}</Link>
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
