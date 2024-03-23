import React, { useEffect, useState } from "react"

import Card from "../common/Card"
import Comment from "./Comment"
import StarRating from "../common/StarRating"
import Time from "../common/Time"
import UserAvatar from "./UserAvatar"
import { useApiClient } from '../context/ApiClient'
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export default function Review(props) {

  const { company_id } = useParams()

  const [anonymous, setAnonymous] = useState(true)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [role, setRole] = useState("other")
  const [salaryRange, setSalaryRange] = useState("1000-1200")
  const [salaryCurrency, setSalaryCurrency] = useState("EUR")
  const [salaryFrequency, setSalaryFrequency] = useState("monthly")
  const [error, setError] = useState()

  const client = useApiClient()
  const authContext = useAuth()

  function updateParent(value) {
    props.setToggleRefresh(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    client
      .post(`companies/${company_id}/reviews`,
        {
          "is_anonymous": anonymous,
          "rating": rating,
          "comment": comment,
          "role": role,
          "salary_range": salaryRange,
          "salary_currency": salaryCurrency,
          "salary_frequency": salaryFrequency,
        },
        { withXSRFToken: true },
      )
      .then(function (res) {
        if (res.status == 201) {
          updateParent(true)
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  return (

    (props.editMode === "true") ?
      <Card>
        <UserAvatar size="60" anonymous={anonymous} />{anonymous ? "Anonymous review" : authContext.user.username} <br />
        <form onSubmit={handleSubmit}>
          <label><input type="checkbox" defaultChecked onChange={e => setAnonymous(e.target.checked)} /> Anonymous</label><br />
          Role: Generic position<br />
          Salary range: <b>800 - 1000 EUR</b><br />
          <StarRating editMode="true" value={rating} onChange={e => setRating(e.target.value)} /><br />
          <input name="comment" onChange={e => setComment(e.target.value)} /><br />
          <button type="submit">Save</button>
        </form>
      </Card>
      :
      <Card>
        <UserAvatar size="60" anonymous={props.review.is_anonymous} /> {props.review.is_anonymous ? "Anonymous review" : authContext.user.username} <br />
        <Time time={props.review.created_at} /><br />
        Role: Generic position<br />
        Salary range: <b>800 - 1000 EUR</b><br />
        <StarRating editMode="false" value={props.review.rating} />
        <Comment value={props.review.comment}></Comment>
      </Card>
  )
}
