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
import 'styles/listingCards.css'


export default function ReviewListing(props) {

  const { company_id } = useParams()

  const [publicReview, setPublicReview] = useState(props.review ? props.review.reviewer != null : false)
  const [rating, setRating] = useState(props.review ? props.review.rating : 0)
  const [comment, setComment] = useState(props.review ? props.review.comment : "")
  const [position, setPosition] = useState(props.review ? props.review.position : "")
  const [salaryRange, setSalaryRange] = useState(props.review ? props.review.salary_range : "")
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
          "position": position,
          "salary_range": salaryRange,
          "salary_currency": salaryCurrency,
          "salary_frequency": salaryFrequency,
        },
        {
          headers: { Authorization: `Token ${authContext.token}` }
        },
      )
      .then(function (res) {
        if (res.status === 201) {
          console.log("res.data", res.data)
          if (typeof props.setMode === 'function') {
            props.setMode("view")
          }
          if (typeof props.updateParent === 'function') {
            props.updateParent()
          }
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
          "position": position,
          "salary_range": salaryRange,
          "salary_currency": salaryCurrency,
          "salary_frequency": salaryFrequency,
        },
        {
          headers: { Authorization: `Token ${authContext.token}` }
        },
      )
      .then(function (res) {
        if (res.status === 200) {
          if (typeof props.setMode === 'function') {
            props.setMode("view")
          }
          if (typeof props.updateParent === 'function') {
            props.updateParent()
          }
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
      <Card className="listing-card">
        <Card.Body>
          {props.ownReview ? <h4>Your review</h4> : null}
          <UserAvatar size="45" public={publicReview} image={authContext.user.picture} />{publicReview ? authContext.user.display_name : "Anonymous review"} <br />
          <Form onSubmit={createReview}>
            <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" value={position} onChange={e => setPosition(e.target.value)} /><br />
          <Form.Label>Salary range</Form.Label>
          <Form.Control type="number" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} />
          <Form.Text id="salaryHelpBlock" muted>Gross salary in EUR per month.</Form.Text><br />
            <Form.Label>Overall rating</Form.Label>
            <StarRatingIcon editMode={true} size={25} value={rating} onChange={e => setRating(e.target.value)} /><br />
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={5} name="comment" onChange={e => setComment(e.target.value)} /><br />
            <Button onClick={cancelCreate}>Cancel</Button>
            <Button type="submit">Save</Button>
          </Form>
        </Card.Body>
      </Card>
      : <Navigate to="/login/" />
  )

  if (props.mode === "edit") return (
    <Card className="listing-card">
      <Card.Body>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="45" public={publicReview} image={authContext.user.picture} />{publicReview ? authContext.user.display_name : "Anonymous review"} <br />
        <Form onSubmit={editReview}>
          <Form.Check type="switch" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} label="Public review"/>
          <Form.Label>Position</Form.Label><Form.Control type="text" value={position} onChange={e => setPosition(e.target.value)} />
          <>
          <Form.Label>Salary range</Form.Label>
          <Form.Control type="number" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} />
          <Form.Text id="salaryHelpBlock" muted>Gross salary in EUR per month.</Form.Text><br />
          </>
          <Form.Label>Overall rating</Form.Label> <StarRatingIcon editMode={true} size={25} value={props.review.rating} onChange={e => setRating(e.target.value)} /><br />
          <Form.Control as="textarea" rows={5} name="comment" value={comment} onChange={e => setComment(e.target.value)} /><br />
          <Button onClick={cancelEdit}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  )

  return (
    <Card className="listing-card">
      <Card.Body>
        {props.ownReview ? <h4>Your review</h4> : null}
        <UserAvatar size="45" public={publicReview} image={publicReview ? props.review.reviewer.picture : null} /> {publicReview ? props.review.reviewer.display_name : "Anonymous review"} <br />
        <Time time={props.review.created_at} /><br />
        <Card.Text>{props.review.position}</Card.Text>
        <Card.Text>Salary: <b>{props.review.salary_range} EUR </b></Card.Text>
        <StarRatingIcon editMode={false} value={props.review.rating} /><br />
        <Card.Text>{props.review.comment}</Card.Text>
        {props.ownReview ? <>
        <Card.Text>Status: <b>{props.review.is_approved ? "Approved" : "Pending"}</b></Card.Text>
        <Button onClick={editMode}>Edit</Button><Button type="button" onClick={editMode}><FaTrashAlt /></Button>
        </> : null}
      </Card.Body>
    </Card>
  )
}
