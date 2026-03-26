import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import ContributionListing from 'features/reviews/components/ContributionListing'

import { Button } from 'react-bootstrap'

export default function WriteContribution(props) {

  const [toggle, setToggle] = useState(false)

  function updateMode(value) {
    props.setMode(value)
  }


  return (
    toggle
      ?
      <ContributionListing mode="create" cancel={setToggle} setMode={updateMode} />
      :
      <Button onClick={() => setToggle(!toggle)}> <FaPencilAlt /> Write a review </Button>
  )
}
