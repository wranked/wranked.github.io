import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

import embassies from "../placeholders/embassies.json"
import AppContent from '../components/AppContent'
import Card from '../common/Card'

export default function EmbassiesPage() {
  const country = "Croatia"

  return (
    <AppContent>
      <div><h1>Embassies for {country}</h1></div>
      {
        embassies.map((embassy, index) =>
          <div key={index}>
            <Card>
              <h3>{embassy.country}</h3>
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
