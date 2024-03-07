import React from 'react'


export default function Card({
  width = "400px",
  margin = "5px",
  padding = "10px",
  ...props
}) {

  const styles = {
    width: width,
    margin: margin,
    padding: padding,
    border: "1px solid #999",
    borderRadius: "5px",
    boxShadow: "1px 1px 2px #999",
    textAlign: "",
    maxWidth: "",
    minWidth: "",
    // "display": "inline-block",
  }

  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}
