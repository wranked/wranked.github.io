import React from 'react'
import { useCompanyData } from 'features/companies/index'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'


export default function CompanyAbout() {

  const [selectedLocation, setSelectedLocation] = useState("")
  const { companyData } = useCompanyData()
  const API_KEY = "AIzaSyDmm12sorDfX8xsYOei0qUDY-Ld86jIZGE"

  function renderLocation() {
    let defaultLocation = ""
    if (companyData.branches && companyData.branches.length > 0) {
      defaultLocation = companyData.branches[0].address || companyData.branches[0].location
    } else if (companyData.address) {
      defaultLocation = companyData.address
    } else {
      return null
    }

    const location = selectedLocation || defaultLocation
    const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&zoom=16&q=${location}`


    return (
      <>
        <Card.Title>Locations</Card.Title>
        {
          companyData.branches.map((branch) => (
            <Card.Text key={branch.id} onClick={() => setSelectedLocation(branch.address || branch.location)}>
              <b>{branch.name ? branch.name + " - " : null}</b>{branch.address || branch.location}
            </Card.Text>
          ))
        }
        <iframe
          width="100%"
          height="400"
          frameborder="0"
          style={{ border: 0 }}
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src={googleMapsUrl}
        />
      </>
    )
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Overview</Card.Title>
          <Card.Text style={{ whiteSpace: "pre-line" }}>{companyData.description}</Card.Text>
          {
            companyData.url ?
              <>
                <Card.Title>Website</Card.Title>
                <Card.Text><a href={companyData.url} target="_blank" rel="noopener noreferrer">{companyData.url}</a></Card.Text>
              </>
              :
              null
          }

          <Card.Title>Industry</Card.Title>
          <Card.Text>{companyData.category}</Card.Text>

          {renderLocation()}
        </Card.Body>
      </Card>
    </div>
  )
}
