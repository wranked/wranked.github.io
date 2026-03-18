import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import ReviewListing from 'features/reviews/components/ReviewListing'

import { Button } from 'react-bootstrap'

export default function WriteReview(props) {

  const [toggle, setToggle] = useState(false)

  function updateMode(value) {
    props.setMode(value)
  }


  return (
    toggle
      ?
      <ReviewListing mode="create" cancel={setToggle} setMode={updateMode} />
      :
      <Button onClick={() => setToggle(!toggle)}> <FaPencilAlt /> Write a review </Button>
  )
}
