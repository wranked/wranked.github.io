import React from "react"
import { useNavigate } from "react-router-dom"


export default function GoBack() {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)}>Go Back</button>
  )
}