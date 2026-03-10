import React from 'react'
import Navbar from 'shared/layout/NavbarMenu'
import { Link } from 'react-router-dom'

import embassies from "placeholders/embassies.json"
import AppContent from 'shared/layout/AppContent'
import Card from 'shared/ui/Card'
import Flag from 'shared/ui/Flag'

export default function EmbassiesPage() {
  const country = "Croatia"

  return (
    <AppContent>
      <h1>Embassies and Consulates for {country}</h1>
      {
        embassies.map((embassy, index) =>
          <div key={index}>
            <Card>
            <h3><Flag country={(embassy.country_code || "").toLowerCase()}/> {embassy.country}</h3>
              
              <p>Location: {embassy.location}</p>
              <p>Website: <Link to={embassy.website} target="_blank">{embassy.website}</Link></p>
              <p>e-mail: <Link to={"mailto:" + embassy.email}>{embassy.email}</Link></p>
              <p>Telephone: {embassy.telephone}</p>
              <p>Address: {embassy.address}</p>
            </Card>
          </div>
        )
      }
    </AppContent>
  )
}
