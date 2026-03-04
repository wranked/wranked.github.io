import React from 'react'
import StarRating from 'common/StarRating'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'
import { useState } from "react"
import { Accordion, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap"

const styles = {
  width: "300px",
  height: "1rem",
}


export default function ReviewSummary(props) {

  const stars = 5
  const summary = props.company.rating_summary || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, media: 0, count: 0 }
  const media = props.company.reviews_rating
  const count = props.company.reviews_count
  const auxArray = [...Array(stars).keys()].reverse()
  const maxRating = Math.max(...auxArray.map((index) => summary[index + 1] || 0))
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <Card style={{ width: '400px' }} className="mb-2">
      <Card.Body>
        <Card.Title><Link style={{ textDecoration: "none" }} to={`/company/${props.company.id}`}>{props.company.display_name}</Link></Card.Title>
        {props.company.branches.length > 1 ? (
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
        ) : null}

        {
          auxArray.map((index) => (
            <Card.Text key={index} style={{ marginBottom: "4px", lineHeight: "1.2" }}>{index + 1} <progress style={styles} max={maxRating} value={summary[index + 1] || 0} /></Card.Text>
          ))
        }
        <Card.Title>{Number(media).toFixed(1)}</Card.Title>
        <StarRating editMode={false} value={media} stars={stars} />
        <Card.Text>{`${count} ${count === 1 ? 'review' : 'reviews'}`}</Card.Text>
      </Card.Body>
    </Card>
  )
}
