import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Time from 'common/Time'
import { CompanyAvatar } from 'features/companies'

import { Link } from 'react-router-dom'


export default function Job(props) {
  return (
    <Card style={{ width: '500px' }} className="mb-2">
      <Card.Body>
        <Row>
          <Col md="auto">
            <CompanyAvatar size="60" image={props.job.company_avatar_url} />
          </Col>
          <Col>
            <Link to={`/job/${props.job.id}`}><h4>{props.job.title}</h4></Link>
            <Card.Text>{props.job.company_name}</Card.Text>
            <Card.Text>{props.job.location}</Card.Text>
            <Card.Text><Time time={props.job.created_at} /></Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
