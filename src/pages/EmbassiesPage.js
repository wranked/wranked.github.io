import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

import embassies from "../placeholders/embassies.json"
import AppContent from '../components/AppContent'

export default function EmbassiesPage() {
  const country = "Croatia"

  return (
    <AppContent>
      <div><h1>Embassies for {country}</h1></div>
      {
        embassies.map((embassy, index) =>
          <div key={index}>
            <h3>{embassy.country}</h3>
            <ul>
              <li>Location: {embassy.location}</li>
              <li>Website: <Link to={embassy.website} target="_blank">{embassy.website}</Link></li>
              <li>e-mail: <Link to={"mailto:" + embassy.email}>{embassy.email}</Link></li>
              <li>Telephone: {embassy.telephone}</li>
              <li>Address: {embassy.address}</li>
            </ul>
          </div>
        )
      }
    </AppContent>
  )
}
