import React from 'react'


export default function Rating({ value = 0 }) {

  return (
    <div style={{ fontSize: "2rem", fontWeight: "500"}}>
      {Number(value).toFixed(1)}
    </div>
  )
}