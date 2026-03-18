import React from 'react'
import StarRatingIcon from 'shared/icons/StarRatingIcon'
import Card from 'react-bootstrap/Card'
import CertifiedIcon from 'shared/icons/CertifiedIcon'
import BlacklistedIcon from 'shared/icons/BlacklistedIcon'
import CompanyAvatar from 'features/companies/components/CompanyAvatar'
import Rating from 'shared/ui/Rating'
import 'styles/listingCards.css'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Stack, Accordion, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function CompanyListing({ company }) {
  const stars = 5
  const media = company.reviews_rating
  const count = company.reviews_count

  return (
    <Card className="listing-card">
      <Card.Body>

        <Card.Title><Link style={{ textDecoration: 'none' }} to={`/company/${company.id}`}><CompanyAvatar size="45" image={company.avatar_url} />{company.display_name}</Link> {company.blacklisted_at !== null ? <BlacklistedIcon /> : null}</Card.Title>
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

        <Stack direction="horizontal" gap={3}>
          <Rating value={media} />
          <Stack direction="vertical" gap={1}>
            <Stack direction="horizontal">
              <StarRatingIcon editMode={false} value={media} stars={stars} />
            </Stack>
            <Card.Text>{`${count} ${count === 1 ? 'review' : 'reviews'}`}</Card.Text>
          </Stack>
        </Stack>

      </Card.Body>
    </Card>
  )
}