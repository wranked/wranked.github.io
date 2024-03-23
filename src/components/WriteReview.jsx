import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import Review from './Review'

export default function WriteReview() {

  const [toggle, setToggle] = useState(false)

  return (
    toggle
      ?
      <Review editMode="true" />
      :
      <button onClick={() => setToggle(!toggle)}> <FaPencilAlt /> Write a review </button>
  )
}
