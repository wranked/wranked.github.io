import React from 'react'


export default function Flag(props) {

  const flag_source = `https://flagcdn.com/h20/${props.country}.png`

  return (
    <>
      <img src={flag_source} />
    </>
  )
}
