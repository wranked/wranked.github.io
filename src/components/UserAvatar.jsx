import React from 'react'
import { FaUserSecret } from 'react-icons/fa'


export default function UserAvatar({
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

  const source = `https://i.pravatar.cc/${size}`
 
  return (
    <>
    {props.anonymous === true ? <FaUserSecret style={anonymous} /> : <img src={source} style={avatar}></img>}
    </>
  )
}
