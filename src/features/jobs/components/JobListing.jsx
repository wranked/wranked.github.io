import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Time from 'shared/ui/Time'
import { CompanyAvatar } from 'features/companies'

import { Link } from 'react-router-dom'
import 'styles/listingCards.css'
import './JobListing.css'


export default function JobListing(props) {
  return (
    <Card className="listing-card job-card">
      <Card.Body>
        <Row className="align-items-start">
          <Col md="auto" className="job-company-avatar-col">
            <CompanyAvatar size="60" image={props.job.company_avatar_url} />
          </Col>
          <Col>
            <Link className="job-title-link" to={`/job/${props.job.id}`}><h4 className="job-title">{props.job.title}</h4></Link>
            <Card.Text className="job-meta">{props.job.company_name}</Card.Text>
            <Card.Text className="job-meta">{props.job.location}</Card.Text>
            <Card.Text className="job-meta"><Time time={props.job.created_at} /></Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
