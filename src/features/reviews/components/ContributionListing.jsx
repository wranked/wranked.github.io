import React, { useState, useEffect, useRef } from "react"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import Comment from "features/reviews/components/Comment"
import StarRatingIcon from 'shared/icons/StarRatingIcon'
import CompanyAvatar from 'features/companies/components/CompanyAvatar'
import Time from 'shared/ui/Time'
import countries from 'placeholders/countries.json'
import { useApiClient } from 'context/ApiClient'
import { useAuth } from 'features/auth'
import { Link } from 'react-router-dom'

export default function ContributionListing(props) {

  const countryOptions = Object.entries(countries).sort(function (a, b) {
    return a[1].localeCompare(b[1])
  })

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
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companySuggestions, setCompanySuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [createCompanyInline, setCreateCompanyInline] = useState(false)
  const [newCompanyData, setNewCompanyData] = useState({
    website: "",
    industry: "",
    country: ""
  })
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
    const reviewPayload =
    {
      "is_public": publicReview,
      "rating": rating,
      "comment": comment,
      "position": position,
      "salary_range": salaryRange,
      "salary_currency": salaryCurrency,
      "salary_frequency": salaryFrequency,
    }

    const authHeaders = {
      headers: { Authorization: `Token ${authContext.token}` }
    }

    function createReviewForCompany(targetCompanyId) {
      return client.post(`/companies/${targetCompanyId}/reviews/`, reviewPayload, authHeaders)
    }

    if (createCompanyInline) {
      const displayName = companySearch.trim()
      if (!displayName || !newCompanyData.website.trim() || !newCompanyData.industry.trim() || !newCompanyData.country.trim()) {
        setError(new Error("Please complete all company fields."))
        return
      }

      client
        .post(`/companies/`,
        {
          "display_name": displayName,
          "url": newCompanyData.website.trim(),
          "category": newCompanyData.industry.trim(),
          "country": newCompanyData.country.trim(),
          "legal_name": displayName,
        },
        authHeaders,
        )
        .then(function (companyRes) {
          if (!companyRes?.data?.id) {
            throw new Error("Company created, but response did not include an id.")
          }
          return createReviewForCompany(companyRes.data.id)
        })
        .then(function (res) {
          if (res.status === 201) {
            if (typeof props.setMode === "function") {
              props.setMode(`created-${Date.now()}`)
            }

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
      return
    }

    if (!companyId) {
      setError(new Error("Please select a company from the suggestions or add a new one."))
      return
    }

    createReviewForCompany(companyId)
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
            <Form.Label>Company</Form.Label>
            <div style={{ position: 'relative' }}>
              <Form.Control
                type="text"
                placeholder="Company"
                value={companySearch}
                style={{ paddingLeft: selectedCompany && companyId ? '48px' : undefined }}
                onChange={e => {
                  setCompanySearch(e.target.value)
                  setCompanyId("")
                  setSelectedCompany(null)
                  setError(null)
                }}
                autoComplete="off"
                required
              />
              {selectedCompany && companyId ? (
                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 3,
                    pointerEvents: 'none'
                  }}
                >
                  <CompanyAvatar size="24" image={selectedCompany.avatar_url} />
                </div>
              ) : null}
            </div>
            {showDropdown && companySearch.length >= 3 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1000, background: '#fff', border: '1px solid #dee2e6', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                {companySuggestions.length > 0 ? (
                  companySuggestions.map(function (c) {
                    return (
                      <div
                        key={c.id}
                        style={{ padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        onMouseDown={function () {
                          setCompanySearch(c.display_name)
                          setCompanyId(c.id)
                          setSelectedCompany(c)
                          setShowDropdown(false)
                          setCreateCompanyInline(false)
                          setError(null)
                        }}
                      >
                        <CompanyAvatar size="30" image={c.avatar_url} />
                        {c.display_name}
                      </div>
                    )
                  })
                ) : null}
                {!createCompanyInline ? (
                  <div style={{ padding: '8px 12px', color: '#6c757d', borderTop: '1px solid #e9ecef' }}>
                    Can't find the company?
                    <Button
                      variant="link"
                      className="p-0 ms-1"
                      onMouseDown={function (e) {
                        e.preventDefault()
                        setCreateCompanyInline(true)
                        setShowDropdown(false)
                        setError(null)
                      }}
                    >
                      Add it here
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {createCompanyInline ? (
            <div
              className="mb-3"
              style={{
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '16px'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '12px', color: '#495057' }}>
                New company details
              </div>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com"
                value={newCompanyData.website}
                onChange={e => setNewCompanyData({ ...newCompanyData, website: e.target.value })}
                required
              />
              <br />
              <Form.Label>Industry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Industry"
                value={newCompanyData.industry}
                onChange={e => setNewCompanyData({ ...newCompanyData, industry: e.target.value })}
                required
              />
              <br />
              <Form.Label>Country</Form.Label>
              <Form.Select
                value={newCompanyData.country}
                onChange={e => setNewCompanyData({ ...newCompanyData, country: e.target.value })}
                required
              >
                <option value="">Select country</option>
                {countryOptions.map(function (country) {
                  return (
                    <option key={country[0]} value={country[1]}>{country[1]}</option>
                  )
                })}
              </Form.Select>
            </div>
          ) : null}
        
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} required /><br />
     
            <Form.Label>Salary EUR per month</Form.Label>
            <Form.Control type="text" placeholder="Salary" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} required /><br />
         
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
