import React from 'react'
import StarRatingIcon from 'shared/icons/StarRatingIcon'
import Card from 'react-bootstrap/Card'
import Rating from 'shared/ui/Rating'
import './ReviewSummary.css'
import ReviewCounter from 'shared/ui/ReviewCounter'

import { Link } from 'react-router-dom'
import { useState } from "react"
import { Stack, Accordion, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap"


export default function ReviewSummary(props) {

  const stars = 5
  const summary = props.company.rating_summary || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, media: 0, count: 0 }
  const media = props.company.reviews_rating
  const count = props.company.reviews_count
  const auxArray = [...Array(stars).keys()].reverse()
  const maxRating = Math.max(...auxArray.map((index) => summary[index + 1] || 0))
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <Card className="review-summary-card mb-2">
      <Card.Body>
        <Card.Title>Review Summary</Card.Title>
        {/* {props.company.branches.length > 1 ? (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Locations</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {props.company.branches.map((branch, index) => (
                    <OverlayTrigger
                      key={index}
                      overlay={<Tooltip>{branch.location}</Tooltip>}
                    >
                      <ListGroup.Item>
                        {branch.name}
                      </ListGroup.Item>
                    </OverlayTrigger>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : props.company.branches.length === 1 ? (
          <Card.Text>{props.company.branches[0].location}</Card.Text>
        ) : null} */}

        <div className="review-summary-content">
          <div className="review-summary-progress-column">
            {
              auxArray.map((index) => (
                <Card.Text key={index} className="review-summary-progress-row">{index + 1} <progress className="review-summary-progress" max={maxRating} value={summary[index + 1] || 0} /></Card.Text>
              ))
            }
          </div>

          <div className="review-summary-rating-column">
            <div className="review-summary-rating-row">
              <Rating value={media} />
              <div className="review-summary-rating-details">
                <div>
                  <StarRatingIcon editMode={false} value={media} stars={stars} />
                </div>
                <ReviewCounter value={count} />
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
