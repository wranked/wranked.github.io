import React, { useState } from "react"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Comment from "features/reviews/components/Comment"
import StarRatingIcon from 'shared/icons/StarRatingIcon'
import Time from 'shared/ui/Time'
import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'
import { Link } from 'react-router-dom'

export default function MyReviewListing(props) {

  const [publicReview, setPublicReview] = useState(props.review ? props.review.is_public : false)
  const [rating, setRating] = useState(props.review ? props.review.rating : 0)
  const [comment, setComment] = useState(props.review ? props.review.comment : "")
  const [role, setRole] = useState("other")
  const [salaryRange, setSalaryRange] = useState("1000-1200")
  const [salaryCurrency, setSalaryCurrency] = useState("EUR")
  const [salaryFrequency, setSalaryFrequency] = useState("monthly")
  const [error, setError] = useState()
  const [mode, setMode] = useState(props.mode || "view")
  const [company, setCompany] = useState("")

  const client = useApiClient()
  const authContext = useAuth()

  function createReview(event) {
    event.preventDefault()
    client
      .post(`/companies/${company}/reviews/`,
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
          setMode("view")
        }
      })
      .catch(function (err) {
        setError(err)
      })
  }

  function editReview(event) {
    event.preventDefault()
    client
      .patch(`/companies/${props.review.company.id}/reviews/me/`,
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

  function cancelCreate(event) {
    event.preventDefault()
    props.cancel(state => !state)
  }

  function cancelEdit(event) {
    event.preventDefault()
    setMode("view")
  }

  function editMode(event) {
    event.preventDefault()
    setMode("edit")
  }


  if (mode === "create") return (
    <>{console.log("create mode")}
    <Card className="listing-card">
      <Card.Body>
        <Form onSubmit={createReview}>
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          <FloatingLabel controlId="floatingInput" label="Company" className="mb-2">
            <Form.Control type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required /><br />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Role" className="mb-2">
            <Form.Control type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required /><br />
          </FloatingLabel>
          <Card.Text>Salary range: <b>800 - 1000 EUR</b></Card.Text>
          <StarRatingIcon editMode={true} value={rating} onChange={e => setRating(e.target.value)} /><br />

          <Form.Control as="textarea" rows={5} name="comment" placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} required />

          <Button type="button" onClick={cancelCreate}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  </>
  )

  if (mode === "edit") return (
    <>{console.log("edit mode")}
    <Card className="listing-card">
      <Card.Body>
        <Form onSubmit={editReview}>
          Generic position at <Link styles={{ textDecoration: 'none' }} to={`/company/${props.review.company.id}`}>{props.review.company.display_name}</Link><br />
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          <Card.Text>Role: Generic position</Card.Text>
          <Form.Control type="text" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required /><br />
          <Card.Text>Salary range: <b>800 - 1000 EUR</b></Card.Text>
          <StarRatingIcon editMode={true} value={props.review.rating} onChange={e => setRating(e.target.value)} /><br />

          <Form.Control as="textarea" rows={5} name="comment" placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} required />

          <Button type="button" onClick={cancelEdit}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  </>
  )

  return (
      <>{console.log("view mode")}
    <Card className="listing-card">
      <Card.Body>
        Generic position at <Link styles={{ textDecoration: 'none' }} to={`/company/${props.review.company.id}`}>{props.review.company.display_name}</Link><br />
        <Time time={props.review.created_at} /><br />
        <Card.Text>Salary range: <b>800 - 1000 EUR</b></Card.Text>
        <StarRatingIcon editMode={false} value={props.review.rating} />
        <Comment value={props.review.comment} />
        <Button onClick={editMode}>Edit</Button>
      </Card.Body>
    </Card>
    </>
  )

}
