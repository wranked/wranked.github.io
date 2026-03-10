import React, { useEffect, useState } from 'react'
import { Link, Outlet, useOutletContext, useParams, useLocation } from 'react-router-dom'

import AppContent from 'shared/layout/AppContent'
import { useApiClient } from 'context/ApiClient'
import { useTranslation } from 'react-i18next'
import CompanyAvatar from 'features/companies/components/CompanyAvatar'
import LoadingSpinner from 'shared/ui/LoadingSpinner'

import { FaExclamationTriangle } from "react-icons/fa"
import CertifiedIcon from 'shared/icons/CertifiedIcon'

import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'



export default function CompanyDetailsPage() {

  const { company_id } = useParams()
  const { t } = useTranslation()

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
              <h3>{companyData.display_name} {companyData.blacklisted_at !== null ? <FaExclamationTriangle title={`Blacklisted Company ${companyData.blacklisted_at}`} style={{ color: "#FF0000" }} /> : null}</h3>
              <p>{companyData.category} <CertifiedIcon isCertified={companyData.is_certified} /> - {companyData.primary_location}</p>
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
