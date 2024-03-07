import { useState, useEffect } from 'react'

import ReviewSummary from '../components/ReviewSummary'
import AppContent from '../components/AppContent'
import { useApiClient } from '../context/ApiClient'


export default function ListCompanies() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()

  useEffect(() => {
    setLoading(true)
    client.get(`/companies/`)
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
        <>
          <h1>Companies Ranking</h1>
          {
            data.map((company, index) =>
              <ReviewSummary company={company} index={index} />
            )
          }
        </>
      }
    </AppContent>
  )
}
