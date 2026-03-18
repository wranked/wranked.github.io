import { useState, useEffect } from 'react'

import LoadingSpinner from 'shared/ui/LoadingSpinner'
import { CompanyListing } from 'features/companies'
import AppContent from 'shared/layout/AppContent'
import { useApiClient } from 'context/ApiClient'
import { useLocation } from "context/LocationContext"
import CertifiedIcon from 'shared/icons/CertifiedIcon'
import { FaTrophy } from "react-icons/fa6"
import { LuSkull } from "react-icons/lu"


import { FaLocationDot } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import BlacklistedIcon from 'shared/icons/BlacklistedIcon'


export default function CompanyListPage() {

  const { destination } = useLocation()
  const client = useApiClient()

  const [data, setData] = useState(null)
  const [filters, setFilters] = useState(destination ? { country: destination } : {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCompanies(currentFilters = filters) {
    setLoading(true)
    const queryParams = new URLSearchParams(currentFilters).toString()
    await client.get(`/companies/?${queryParams}`)
      .then(function (response) {
        setData(response.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function applyOrderingFilter(ordering) {
    const nextFilters = { ...filters, ordering }
    setFilters(nextFilters)
    fetchCompanies(nextFilters)
  }

  useEffect(function () {
    fetchCompanies()
  }, [])

  if (error) return <p>Error: {error.message}</p>

  return (
    <AppContent>
      <h1>Companies {destination ? "in " + destination : "around the world"}</h1>
      
      <p>References:</p>

      <p><CertifiedIcon /> Intermediary (agency) who issued an employment permit.</p>
      <p><BlacklistedIcon /> Company with undeclared work during the inspection.</p>


      <Navbar className="justify-content-between">
        <Form className="w-100" onSubmit={e => { e.preventDefault(); fetchCompanies() }}>
          <div className="d-flex flex-wrap gap-2 w-100">
            <InputGroup className="flex-grow-1" style={{ minWidth: '220px' }}>
              <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Company"
                value={filters.search || ""}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </InputGroup>

            <InputGroup className="flex-grow-1" style={{ minWidth: '220px' }}>
              <InputGroup.Text id="basic-addon2"><FaLocationDot /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Location"
                value={filters.location || ""}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </InputGroup>

            {/* <Button variant="primary" type="submit">Search</Button> */}
            <Button variant="outline-success" type="button" onClick={() => applyOrderingFilter('-reviews_rating')}><FaTrophy color='#F80' /> Top companies</Button>
            <Button variant="outline-danger" type="button" onClick={() => applyOrderingFilter('reviews_rating')}><LuSkull color='#000' /> Blacklist</Button>
          </div>
        </Form>
      </Navbar>
      <div style={{ minHeight: "500px" }}>
        {loading ?
          <LoadingSpinner />
          :
          <>
            {data.length > 0
              ? data.map((company) => <CompanyListing company={company} key={company.id} />)
              : <p>There are no companies matching the search criteria...</p>}
          </>
        }
      </div>
    </AppContent>
  )
}
