import React, { useState } from "react"

import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { FaTrashAlt } from "react-icons/fa"

import StarRatingIcon from 'shared/icons/StarRatingIcon'
import Time from 'shared/ui/Time'
import UserAvatar from 'shared/ui/UserAvatar'
import { useApiClient } from 'context/ApiClient'
import { useParams } from "react-router-dom"
import { useAuth } from 'features/auth'
import { Navigate } from 'react-router-dom'
import './Review.css'

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
      .post(`companies/${company_id}/reviews/`,
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
          headers: { Authorization: `Token ${authContext.token}` }
        },
      )
      .then(function (res) {
        if (res.status == 201) {
          props.setMode("view")
          props.updateParent(state => !state)
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function editReview(event) {
    event.preventDefault()
    client
      .patch(`companies/${company_id}/reviews/me/`,
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
          headers: { Authorization: `Token ${authContext.token}` }
        },
      )
      .then(function (res) {
        if (res.status == 200) {
          props.setMode("view")
          props.updateParent(state => !state)
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

  if (props.mode === "create") return (
    authContext.user ?
      <Card className="review-card mb-2">
        <Card.Body>
          {props.ownReview ? <h4>Your review</h4> : null}
          <UserAvatar size="45" public={publicReview} image={authContext.user.picture} />{publicReview ? authContext.user.display_name : "Anonymous review"} <br />
          <Form onSubmit={createReview}>
            <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
            Role: Generic position<br />
            Salary range: <b>800 - 1000 EUR</b><br />
            <StarRatingIcon editMode={true} value={rating} onChange={e => setRating(e.target.value)} /><br />
            <Form.Control as="textarea" rows={5} name="comment" onChange={e => setComment(e.target.value)} /><br />
            <Button onClick={cancelCreate}>Cancel</Button>
            <Button type="submit">Save</Button>
          </Form>
        </Card.Body>
      </Card>
      : <Navigate to="/login/" />
  )

  if (props.mode === "edit") return (
    <Card className="review-card mb-2">
      <Card.Body>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="45" public={publicReview} image={authContext.user.picture} />{publicReview ? authContext.user.display_name : "Anonymous review"} <br />
        <Form onSubmit={editReview}>
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          Role: Generic position<br />
          Salary range: <b>800 - 1000 EUR</b><br />
          <StarRatingIcon editMode={true} value={props.review.rating} onChange={e => setRating(e.target.value)} /><br />
          <Form.Control as="textarea" rows={5} name="comment" value={comment} onChange={e => setComment(e.target.value)} /><br />
          <Button onClick={cancelEdit}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  )

  return (
    <Card className="review-card mb-2">
      <Card.Body>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="45" public={publicReview} image={props.review.reviewer_avatar} /> {publicReview ? props.review.reviewer_display_name : "Anonymous review"} <br />
        <Time time={props.review.created_at} /><br />
        Role: Generic position<br />
        Salary range: <b>800 - 1000 EUR</b><br />
        <StarRatingIcon editMode={false} value={props.review.rating} /><br />
        <Card.Text>{props.review.comment}</Card.Text>
        {props.ownReview ? <><Button onClick={editMode}>Edit</Button><Button type="button" onClick={editMode}><FaTrashAlt /></Button></> : null}
      </Card.Body>
    </Card>
  )
}
