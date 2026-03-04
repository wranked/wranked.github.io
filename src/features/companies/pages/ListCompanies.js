import { useState, useEffect } from 'react'

import LoadingSpinner from 'common/LoadingSpinner'
import { ReviewSummary } from 'features/reviews'
import AppContent from 'components/AppContent'
import { useApiClient } from 'context/ApiClient'
import { useLocation } from "context/LocationContext"

import { FaLocationDot } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function ListCompanies() {

  const { destination } = useLocation()
  const client = useApiClient()

  const [data, setData] = useState(null)
  const [filters, setFilters] = useState(destination ? { country: destination } : {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCompanies() {
    setLoading(true)
    const queryParams = new URLSearchParams(filters).toString()
    await client.get(`/companies/?${queryParams}`)
      .then(function (response) {
        setData(response.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }

  useEffect(function () {
    fetchCompanies()
  }, [])

  if (error) return <p>Error: {error.message}</p>

  return (
    <AppContent>
      <h1>Companies {destination ? "in " + destination : "around the world"}</h1>
      <p>How to calculate the Companies Ranking:</p>
      <ul >
        <li>Only one review/rating per company and user is allowed</li>
        <li>The companies need at least 3 ratings to be listed in the ranking</li>
        <li>The ratings are valid for 18 months, reviews will always be visible</li>
        <li>Ratings from unverified mobile phone users are not taken into account</li>
        <li>Ratings from company admin users are not taken into account</li>
        <li>Ratings from public reviews are worth more than anonymous ones</li>
      </ul>
      <Navbar className="justify-content-between">
        <Form onSubmit={e => { e.preventDefault(); fetchCompanies(e) }}>
          <Row>
            <Col xs="auto">
              <InputGroup>
                <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <InputGroup>
                <InputGroup.Text id="basic-addon2"><FaLocationDot /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit">Search</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
      <div style={{ minHeight: "500px" }}>
      {loading ?
        <LoadingSpinner />
        :
        <>
          {
            data.map((company, index) =>
              <ReviewSummary company={company} key={company.id} />
            )
          }
        </>
      }
      </div>
    </AppContent>
  )
}
