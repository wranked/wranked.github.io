import React from 'react'
import { useState, useEffect } from 'react'
import { useApiClient } from 'context/ApiClient'

import LoadingSpinner from 'shared/ui/LoadingSpinner'

import { useLocation } from "context/LocationContext"
import { FaLocationDot } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"

import AppContent from 'shared/layout/AppContent'
import JobListing from 'features/jobs/components/JobListing'

import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'


export default function JobListPage() {

  const { destination } = useLocation()
  const client = useApiClient()

  const [data, setData] = useState(null)
  const [filters, setFilters] = useState(destination ? { country: destination } : {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchJobs() {
    setLoading(true)
    const queryParams = new URLSearchParams(filters).toString()
    client.get(`/jobs/?${queryParams}`)
      .then(function (response) {
        setData(response.data.results)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }

  useEffect(function () {
    fetchJobs()
  }, [])


  return (
    <AppContent>
      <h1>JobsPage</h1>
      <Navbar className="justify-content-between">
        <Form className="w-100" onSubmit={e => { e.preventDefault(); fetchJobs(e) }}>
          <div className="d-flex flex-wrap gap-2 w-100">
            <InputGroup className="flex-grow-1" style={{ minWidth: '220px' }}>
              <InputGroup.Text id="basic-addon1"><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Keywords"
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

            <Button variant="primary" type="submit">Search</Button>
          </div>
        </Form>
      </Navbar>
      <div style={{ minHeight: "1000px" }}>
      {loading ?
        <LoadingSpinner />
        :
        <>
          {
            data.map((job, index) =>
              <JobListing key={job.id} job={job} />
            )
          }
        </>
      }
      </div>
    </AppContent>
  )
}
