import { useState, useEffect } from 'react'

import LoadingSpinner from '../common/LoadingSpinner'
import ReviewSummary from '../components/ReviewSummary'
import AppContent from '../components/AppContent'
import { useApiClient } from '../context/ApiClient'

import { FaLocationDot } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"

export default function ListCompanies() {

  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()

  async function fetchCompanies() {
    // event.preventDefault()
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

  // useEffect(function () {
  //   setLoading(true)
  //   client.get(`/companies/`)
  //     .then(function (res) {
  //       setData(res.data.results)
  //       setLoading(false)
  //     })
  //     .catch(function (err) {
  //       setError(err)
  //     })
  // }, [])

  if (error) return <p>Error: {error.message}</p>

  return (
    <AppContent>
      <h1>Companies Ranking</h1>
      <form onSubmit={e => {e.preventDefault(); fetchCompanies(e)}}>
        <FaSearch /><input type="text" placeholder="Company" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <FaLocationDot /><input type="text" placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
        <button type="submit">Search</button>
      </form>
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
    </AppContent>
  )
}
