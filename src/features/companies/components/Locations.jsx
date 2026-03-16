import React, { useMemo, useState } from 'react'
import Card from 'react-bootstrap/Card'
import LocationMap from './LocationMap'
import './Locations.css'

export default function Locations({ companyData, apiKey }) {
  const [selectedLocation, setSelectedLocation] = useState('')

  const defaultLocation = useMemo(() => {
    if (companyData?.branches && companyData.branches.length > 0) {
      return companyData.branches[0].address || companyData.branches[0].location || ''
    }

    return companyData?.address || ''
  }, [companyData])

  if (!defaultLocation) {
    return null
  }

  const location = selectedLocation || defaultLocation

  return (
    <>
      <Card.Title>Locations</Card.Title>

      {companyData?.branches?.map((branch) => {
        const branchLocation = branch.address || branch.location

        if (!branchLocation) {
          return null
        }

        const isSelected = location === branchLocation

        return (
          <Card.Text
            key={branch.id || branchLocation}
            className={`location-item ${isSelected ? 'location-item--selected' : ''}`}
            onClick={() => setSelectedLocation(branchLocation)}
          >
            <b>{branch.name ? `${branch.name} - ` : null}</b>
            {branchLocation}
          </Card.Text>
        )
      })}

      <LocationMap location={location} apiKey={apiKey} />
    </>
  )
}
