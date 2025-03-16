import React from 'react'
import { FaBuilding } from "react-icons/fa"

export default function CompanyAvatar({
  size = 30,
  ...props
}) {

  const avatar = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "10%",
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
    borderRadius: "10%",
    margin: "5px",
    padding: "5px",
    border: "1px solid #ddd",
    boxShadow: "1px 1px 2px #ddd",
    textAlign: "center",
    verticalAlign: "middle",
  }
 
  return (
    <>
    {!props.image ? <FaBuilding style={anonymous} /> : <img src={props.image} style={avatar}></img>}
    </>
  )
}
