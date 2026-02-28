import React, { useEffect, useState } from 'react'
import { Link, Outlet, useOutletContext, useParams, useLocation } from 'react-router-dom'

import AppContent from '../components/AppContent'
// import ReviewSummary from '../components/ReviewSummary'
import { useApiClient } from '../context/ApiClient'
import { useTranslation } from 'react-i18next'
import CompanyAvatar from '../components/CompanyAvatar'
import LoadingSpinner from '../common/LoadingSpinner'
// import Card from '../common/Card'

import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'



export default function CompanyDetails() {

  const { company_id } = useParams()
  const { t } = useTranslation()

  // const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toggleRefresh, setToggleRefresh] = useState(false)
  const location = useLocation()

  const [companyData, setCompanyData] = useState(null)

  const client = useApiClient()

  useEffect(function () {
    setLoading(true)
    client.get(`/companies/${company_id}`)
      .then(function (response) {
        // setData(response.data)
        setCompanyData(response.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [toggleRefresh])


  if (error) return <p>Error: {error.message}</p>

  return (
    <AppContent>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <Card>
            <Card.Body>
              <CompanyAvatar size="60" image={companyData.avatar_url} />
              <h3>{companyData.display_name}</h3>
              <p>{companyData.category} - {companyData.primary_location}</p>
            </Card.Body>
            <Card.Footer>
              <Nav variant="pills" defaultActiveKey="about">
                <Nav.Item>
                  <Nav.Link as={Link} to="about" className={location.pathname.includes("about") ? "active" : ""}>{t("about")}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="reviews" className={location.pathname.includes("reviews") ? "active" : ""}>{t("reviews")}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="jobs" className={location.pathname.includes("jobs") ? "active" : ""}>{t("jobs")}</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Footer>
          </Card>
          <Outlet context={{ companyData, setCompanyData, toggleRefresh, setToggleRefresh }} />
        </>
      }
    </AppContent>
  )
}

export function useCompanyData() {
  return useOutletContext()
}
