import React from 'react'


export default function Rating({ value = 0 }) {

  return (
    <div className="fs-2 fw-bold">
      {Number(value).toFixed(1)}
    </div>
  )
}