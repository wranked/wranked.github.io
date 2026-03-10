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
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "1px 1px 2px #ddd",
    textAlign: "",
    maxWidth: "",
    minWidth: "",
    // "display": "inline-block",
  }

  return (
    <div style={styles} className="card">
      {props.children}
    </div>
  )
}
