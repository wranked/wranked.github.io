import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import MyReviewListing from 'features/reviews/components/MyReviewListing'

import { Button } from 'react-bootstrap'

export default function WriteContribution(props) {

  const [toggle, setToggle] = useState(false)

  function updateMode(value) {
    props.setMode(value)
  }


  return (
    toggle
      ?
      <MyReviewListing mode="create" cancel={setToggle} setMode={updateMode} />
      :
      <Button onClick={() => setToggle(!toggle)}> <FaPencilAlt /> Write a review </Button>
  )
}
