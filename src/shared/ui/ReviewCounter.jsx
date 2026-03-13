import React from 'react'


export default function ReviewCounter({ value = 0 }) {

  return (
    <>
      {`${value} ${value === 1 ? 'review' : 'reviews'}`}
    </>
  )
}