import React, { useEffect, useState } from "react"

import Card from "../common/Card"
import Comment from "./Comment"
import StarRating from "../common/StarRating"
import Time from "../common/Time"
import UserAvatar from "./UserAvatar"
import { useApiClient } from '../context/ApiClient'
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Link, Navigate } from 'react-router-dom'

export default function Review(props) {

  const { company_id } = useParams()

  const [publicReview, setPublicReview] = useState(props.review ? props.review.is_public : false)
  const [rating, setRating] = useState(props.review ? props.review.rating : 0)
  const [comment, setComment] = useState(props.review ? props.review.comment : "")
  const [role, setRole] = useState("other")
  const [salaryRange, setSalaryRange] = useState("1000-1200")
  const [salaryCurrency, setSalaryCurrency] = useState("EUR")
  const [salaryFrequency, setSalaryFrequency] = useState("monthly")
  const [error, setError] = useState()

  const client = useApiClient()
  const authContext = useAuth()


  function createReview(event) {
    event.preventDefault()
    client
      .post(`companies/${company_id}/reviews/`,  // TODO: Check if the trailing slash is mandatory or not
        {
          "is_public": publicReview,
          "rating": rating,
          "comment": comment,
          "role": role,
          "salary_range": salaryRange,
          "salary_currency": salaryCurrency,
          "salary_frequency": salaryFrequency,
        },
        { 
          // withXSRFToken: true,
          headers: { Authorization: `Token ${authContext.token}` }
        },
      )
      .then(function (res) {
        if (res.status == 201) {
          props.setMode("view")
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function editReview(event) {
    event.preventDefault()
    client
      .patch(`companies/${company_id}/reviews/me/`,  // TODO: Check if the trailing slash is mandatory or not
        {
          "is_public": publicReview,
          "rating": rating,
          "comment": comment,
          "role": role,
          "salary_range": salaryRange,
          "salary_currency": salaryCurrency,
          "salary_frequency": salaryFrequency,
        },
        { 
          // withXSRFToken: true,
          headers: { Authorization: `Token ${authContext.token}` }
         },
      )
      .then(function (res) {
        if (res.status == 200) {
          props.setMode("view")
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function cancelCreate(event) {
    event.preventDefault()
    props.cancel(state => !state)
  }

  function cancelEdit(event) {
    event.preventDefault()
    props.setMode("view")
  }

  function editMode(event) {
    event.preventDefault()
    props.setMode("edit")
  }

  // function renderCreateReview() {
  if (props.mode === "create") return (
      authContext.user ? 
      <Card>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="60" public={publicReview} image={authContext.user.picture} />{publicReview ? authContext.user.display_name : "Anonymous review"} <br />
        <form onSubmit={createReview}>
        {/* <form> */}
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          Role: Generic position<br />
          Salary range: <b>800 - 1000 EUR</b><br />
          <StarRating editMode={true} value={rating} onChange={e => setRating(e.target.value)} /><br />
          <textarea name="comment" onChange={e => setComment(e.target.value)} /><br />
          <button type="button" onClick={cancelCreate}>Cancel</button>
          <button type="submit">Save</button>
        </form>
      </Card>
      : <Navigate to="/login/" />
    )
  // }

  // function renderEditReview() {
  if (props.mode === "edit") return (
      <Card>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="60" public={publicReview} image={authContext.user.picture} />{publicReview ? authContext.user.display_name : "Anonymous review"} <br />
        <form onSubmit={editReview}>
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          Role: Generic position<br />
          Salary range: <b>800 - 1000 EUR</b><br />
          <StarRating editMode={true} value={props.review.rating} onChange={e => setRating(e.target.value)} /><br />
          <textarea name="comment" value={comment} onChange={e => setComment(e.target.value)} /><br />
          <button type="button" onClick={cancelEdit}>Cancel</button>
          <button type="submit">Save</button>
        </form>
      </Card>
    )
  // }

  // function renderReview() {
    return (
      <Card>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="60" public={publicReview} image={props.review.reviewer_avatar} /> {publicReview ? props.review.reviewer_display_name : "Anonymous review"} <br />
        <Time time={props.review.created_at} /><br />
        Role: Generic position<br />
        Salary range: <b>800 - 1000 EUR</b><br />
        <StarRating editMode={false} value={props.review.rating} /><br />
        <textarea value={props.review.comment} disabled={props.mode === "view"} />
        {/* </Comment> */}
        {props.ownReview ? <button type="button" onClick={editMode}>Edit</button> : null}
      </Card>
    )
  // }

  // return (
  //   (props.mode === "create")
  //     ?
  //     renderCreateReview()
  //     :
  //     (props.mode === "edit")
  //       ?
  //       renderEditReview()
  //       :
  //       renderReview()
  // )
}
