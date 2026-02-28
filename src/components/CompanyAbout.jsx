import React from 'react'
import { useCompanyData } from '../pages/CompanyDetails'
import { Link } from 'react-router-dom'
// import Card from '../common/Card'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'


export default function CompanyAbout() {

  const [selectedLocation, setSelectedLocation] = useState("")
  const { companyData } = useCompanyData()
  const API_KEY = "AIzaSyDmm12sorDfX8xsYOei0qUDY-Ld86jIZGE"

  // function renderLocation() {
  //   const position = [51.505, -0.09]
  //     return (
  //       <MapContainer center={[45, 15]} zoom={6} style={{ height: "300px", width: "100%" }}>
  //       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  //       {companyData.branches.map((branch) => (
  //         <Marker key={branch.addresses[0].id} position={[branch.addresses[0].latitude, branch.addresses[0].longitude]}>
  //           <Popup>
  //             <strong>{branch.addresses[0].name}</strong>
  //             <br />
  //             {branch.addresses[0].address}
  //           </Popup>
  //         </Marker>
  //       ))}
  //     </MapContainer>
  //   )
  // }

  function renderLocation() {
    

    let defaultLocation = ""
    if (companyData.branches && companyData.branches.length > 0) {
      defaultLocation = companyData.branches[0].address || companyData.branches[0].location
      // location = [companyData.branches[0].addresses[0].street + " " + companyData.branches[0].addresses[0].number, companyData.branches[0].addresses[0].postal_code, companyData.branches[0].addresses[0].location].join(", ")
    } else if (companyData.address) {
      defaultLocation = companyData.address
    // } else if (companyData.primary_location) {
    //   defaultLocation = companyData.primary_location
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
      <Card style={{ width: "800px" }}>
        <Card.Body>
          <Card.Title>Overview</Card.Title>
          <Card.Text>{companyData.description}</Card.Text>
          {
            companyData.url ?
              <>
                <Card.Title>Website</Card.Title>
                <Card.Text><Link to={companyData.url}>{companyData.url}</Link></Card.Text>
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
