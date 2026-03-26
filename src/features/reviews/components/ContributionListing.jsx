import React, { useState, useEffect, useRef } from "react"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Alert from 'react-bootstrap/Alert'

import Comment from "features/reviews/components/Comment"
import StarRatingIcon from 'shared/icons/StarRatingIcon'
import CompanyAvatar from 'features/companies/components/CompanyAvatar'
import Time from 'shared/ui/Time'
import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'
import { Link } from 'react-router-dom'

export default function ContributionListing(props) {

  const [publicReview, setPublicReview] = useState(props.review ? props.review.is_public : false)
  const [rating, setRating] = useState(props.review ? props.review.rating : 0)
  const [comment, setComment] = useState(props.review ? props.review.comment : "")
  const [position, setPosition] = useState(props.review ? props.review.position : "")
  const [salaryRange, setSalaryRange] = useState(props.review ? props.review.salary_range : "")
  const [salaryCurrency, setSalaryCurrency] = useState(props.review ? props.review.salary_currency : "EUR")
  const [salaryFrequency, setSalaryFrequency] = useState(props.review ? props.review.salary_frequency : "monthly")
  const [error, setError] = useState()
  const [mode, setMode] = useState(props.mode || "view")
  const [companySearch, setCompanySearch] = useState("")
  const [companyId, setCompanyId] = useState("")
  const [companySuggestions, setCompanySuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const companySearchRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  const client = useApiClient()
  const authContext = useAuth()

  useEffect(function () {
    if (companySearch.length >= 3) {
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = setTimeout(function () {
        client.get(`/companies/?search=${encodeURIComponent(companySearch)}`)
          .then(function (res) {
            setCompanySuggestions(res.data.results)
            setShowDropdown(true)
          })
          .catch(function () {
            setCompanySuggestions([])
          })
      }, 300)
    } else {
      clearTimeout(searchTimeoutRef.current)
      setCompanySuggestions([])
      setShowDropdown(false)
      if (!companyId) setCompanyId("")
    }
    return function () { clearTimeout(searchTimeoutRef.current) }
  }, [companySearch])

  useEffect(function () {
    function handleClickOutside(e) {
      if (companySearchRef.current && !companySearchRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return function () { document.removeEventListener("mousedown", handleClickOutside) }
  }, [])

  function createReview(event) {
    event.preventDefault()
    setError(null)
    if (!companyId) {
      setError(new Error("Please select a company from the suggestions."))
      return
    }
    client
      .post(`/companies/${companyId}/reviews/`,
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
          // Notify parent to refetch lists that depend on mode changes.
          if (typeof props.setMode === "function") {
            props.setMode(`created-${Date.now()}`)
          }

          // In create mode this closes the form and remounts the listing tree.
          if (typeof props.cancel === "function") {
            props.cancel(false)
          } else {
            setMode("view")
          }
        }
      })
      .catch(function (err) {
        if (err?.response?.status === 409) {
          setError(new Error("You already submitted a review for this company."))
          return
        }
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
    <Card className="listing-card">
      <Card.Body>
        <Form onSubmit={createReview}>
          {error?.message ? <Alert variant="warning" className="mb-2">{error.message}</Alert> : null}
          <div ref={companySearchRef} style={{ position: 'relative' }} className="mb-2">
            <FloatingLabel controlId="floatingCompany" label="Company">
              <Form.Control
                type="text"
                placeholder="Company"
                value={companySearch}
                onChange={e => { setCompanySearch(e.target.value); setCompanyId("") }}
                autoComplete="off"
                required
              />
            </FloatingLabel>
            {showDropdown && companySuggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000, background: '#fff', border: '1px solid #dee2e6', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                {companySuggestions.map(function (c) {
                  return (
                    <div
                      key={c.id}
                      style={{ padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                      onMouseDown={function () { setCompanySearch(c.display_name); setCompanyId(c.id); setShowDropdown(false); setError(null) }}
                    >
                      <CompanyAvatar size="30" image={c.avatar_url} />
                      {c.display_name}
                    </div>
                  )
                })}
              </div>
            )}
            {showDropdown && companySuggestions.length === 0 && companySearch.length >= 3 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000, background: '#fff', border: '1px solid #dee2e6', borderRadius: '4px', padding: '8px 12px', color: '#6c757d', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Link style={{ textDecoration: 'none' }} to="/companies/new">No companies found. Add it!</Link>
              </div>
            )}
          </div>
        
            <FloatingLabel controlId="floatingInput" label="Position">
              <Form.Control type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} required /><br />
            </FloatingLabel>
     
            <FloatingLabel controlId="floatingInput" label="Salary EUR per month">
              <Form.Control type="text" placeholder="Salary" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} required /><br />
            </FloatingLabel>
         
          <Card.Text><b>{salaryRange} {salaryCurrency} {salaryFrequency}</b></Card.Text>

          <label>Overall rating <StarRatingIcon size={25} editMode={true} value={rating} onChange={e => setRating(e.target.value)} /></label><br />

          <Form.Control as="textarea" rows={5} name="comment" placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} required />
          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          <Button type="button" onClick={cancelCreate}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  )

  if (mode === "edit") return (
    <Card className="listing-card">
      <Card.Body>
        <Form onSubmit={editReview}>
          <Card.Title>Edit your review</Card.Title>
          <Card.Text>Company: <Link styles={{ textDecoration: 'none' }} to={`/company/${props.review.company.id}`}>{props.review.company.display_name}</Link></Card.Text>
          
          <Form.Control type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} required /><br />
          <Form.Control type="text" placeholder="Salary" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} required /><br />
          <Card.Text><b>{salaryRange} {salaryCurrency} {salaryFrequency}</b></Card.Text>

          <StarRatingIcon editMode={true} value={props.review.rating} onChange={e => setRating(e.target.value)} /><br />

          <Form.Control as="textarea" rows={5} name="comment" placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} required />

          <label><input type="checkbox" checked={publicReview} onChange={e => setPublicReview(e.target.checked)} /> Public review</label><br />
          <Button type="button" onClick={cancelEdit}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Form>
      </Card.Body>
    </Card>
  )

  return (
    <Card className="listing-card">
      <Card.Body>
        <Card.Text><b>{position} at <Link styles={{ textDecoration: 'none' }} to={`/company/${props.review.company.id}`}>{props.review.company.display_name}</Link></b></Card.Text>

        <Time time={props.review.created_at} /><br />
        <Card.Text>Salary: <b>{salaryRange} {salaryCurrency} {salaryFrequency}</b></Card.Text>
        <StarRatingIcon editMode={false} value={rating} />
        <Comment value={comment} />
        <Card.Text>Status: <b>{props.review.is_approved ? "Approved" : "Pending"}</b></Card.Text>
        <Card.Text>Submitted: <b>{new Date(props.review.created_at).toLocaleDateString()}</b></Card.Text>
        <Button onClick={editMode}>Edit</Button>
      </Card.Body>
    </Card>
  )

}
