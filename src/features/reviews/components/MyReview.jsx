import React, { useState } from "react"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Comment from "./Comment"
import StarRating from "../../../common/StarRating"
import Time from "../../../common/Time"
import { useApiClient } from '../../../context/ApiClient'
import { useAuth } from '../../auth'
import { Link } from 'react-router-dom'

export default function MyReview(props) {

  const [publicReview, setPublicReview] = useState(props.review ? props.review.is_public : false)
  const [rating, setRating] = useState(props.review ? props.review.rating : 0)
  const [comment, setComment] = useState(props.review ? props.review.comment : "")
  const [role, setRole] = useState("other")
  const [salaryRange, setSalaryRange] = useState("1000-1200")
  const [salaryCurrency, setSalaryCurrency] = useState("EUR")
  const [salaryFrequency, setSalaryFrequency] = useState("monthly")
  const [error, setError] = useState()
  const [mode, setMode] = useState("view")

  const client = useApiClient()
  const authContext = useAuth()

  function editReview(event) {
    event.preventDefault()
    client
      .put(`/reviews/me/`,
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
          setMode("view")
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function cancelEdit(event) {
    event.preventDefault()
    setMode("view")
  }

  function editMode(event) {
    event.preventDefault()
    setMode("edit")
  }


  if (mode === "edit") return (
    <Card>
      <Card.Body>
        <Form onSubmit={editReview}>
          Generic position at <Link to={`/company/${props.review.company.id}`}>{props.review.company.display_name}</Link><br />
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          <Card.Text>Role: Generic position</Card.Text>
          <Card.Text>Salary range: <b>800 - 1000 EUR</b></Card.Text>
          <StarRating editMode={true} value={props.review.rating} onChange={e => setRating(e.target.value)} /><br />

          <Form.Control as="textarea" rows={5} name="comment" placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} required />

          <Button type="button" onClick={cancelEdit}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  )

  return (
    <Card>
      <Card.Body>
        Generic position at <Link to={`/company/${props.review.company.id}/reviews`}>{props.review.company.display_name}</Link><br />
        <Time time={props.review.created_at} /><br />
        <Card.Text>Salary range: <b>800 - 1000 EUR</b></Card.Text>
        <StarRating editMode={false} value={props.review.rating} />
        <Comment value={props.review.comment} />
        <Button onClick={editMode}>Edit</Button>
      </Card.Body>
    </Card>
  )

}
