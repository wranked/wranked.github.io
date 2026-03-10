import React from 'react'
import { FaEarthAmericas } from 'react-icons/fa6'
import Flag from 'shared/ui/Flag'


export default function OriginDestinationAvatar({
  size = 30,
  ...props
}) {

  const avatar = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    margin: "5px",
    border: "1px solid #ddd",
    boxShadow: "1px 1px 2px #ddd",
    textAlign: "center",
    verticalAlign: "middle",
  }

  const anonymous = {
    width: size,
    height: size,
    color: "#444",
    borderRadius: "50%",
    margin: "5px",
    padding: "5px",
    border: "1px solid #ddd",
    boxShadow: "1px 1px 2px #ddd",
    textAlign: "center",
    verticalAlign: "middle",
  }

  return (
    <>
      {
        props.country ?
          <Flag country={(props.country || "").toLowerCase()} style={avatar} />
          :
          <FaEarthAmericas style={anonymous} />
      }
    </>
  )
}
