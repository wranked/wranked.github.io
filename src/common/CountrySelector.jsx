import React from 'react'

import { useLocation } from "../context/LocationContext"
import countries from "../placeholders/country_selector.json"


export default function CountrySelector() {

  const { origin, setOrigin, destination, setDestination } = useLocation()

  return (
    <form>
      <label htmlFor="origin">Origin</label>
      <select id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}>
      <option value="">Select Origin...</option>
        {
          countries
            .filter(country => country.areas.includes("LATIN_AMERICA"))
            .map(country => <option key={country.country_code} value={country.country_code}>{country.name}</option>)
        }
      </select>
      <label htmlFor="destination">Destination</label>
      <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
      <option value="">Select Destination...</option>
        {
          countries
            .filter(country => country.continent === "Europe")
            .map(country => <option key={country.country_code} value={country.country_code}>{country.name}</option>)
        }
      </select>
    </form>
  )
}