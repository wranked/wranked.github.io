import React from 'react'
import StarRatingIcon from 'shared/icons/StarRatingIcon'
import Card from 'react-bootstrap/Card'
import CertifiedIcon from 'shared/icons/CertifiedIcon'
import BlacklistedIcon from 'shared/icons/BlacklistedIcon'

import { Link } from 'react-router-dom'
import { Accordion, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function CompanyListing({ company }) {
  const stars = 5
  const media = company.reviews_rating
  const count = company.reviews_count

  return (
    <Card style={{ width: '400px' }} className="mb-2">
      <Card.Body>
        <Card.Title><Link style={{ textDecoration: 'none' }} to={`/company/${company.id}`}>{company.display_name}</Link> {company.blacklisted_at !== null ? <BlacklistedIcon /> : null}</Card.Title>
        <p>{company.category} <CertifiedIcon isCertified={company.is_certified} /></p>
        {company.branches.length > 1 ? (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Locations</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {company.branches.map((branch, index) => (
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
        ) : company.branches.length === 1 ? (
          <Card.Text>{company.branches[0].location}</Card.Text>
        ) : null}


        <Card.Title>{Number(media).toFixed(1)}</Card.Title>
        <StarRatingIcon editMode={false} value={media} stars={stars} />
        <Card.Text>{`${count} ${count === 1 ? 'review' : 'reviews'}`}</Card.Text>
      </Card.Body>
    </Card>
  )
}