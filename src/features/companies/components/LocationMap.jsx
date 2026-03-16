import React from 'react'
import './Locations.css'

export default function LocationMap({ location, apiKey }) {
  if (!location) {
    return null
  }

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&zoom=16&q=${encodeURIComponent(location)}`

  return (
    <iframe
      className="location-map"
      title="Company location"
      width="100%"
      height="400"
      frameBorder="0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={googleMapsUrl}
    />
  )
}
