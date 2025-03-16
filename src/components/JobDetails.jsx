import React from 'react'
import Card from '../common/Card'
import Time from '../common/Time'
import CompanyAvatar from './CompanyAvatar'
import GoBack from '../common/GoBack'
import {Badge } from 'react-bootstrap';
import {Stack} from 'react-bootstrap'

import { Link } from 'react-router-dom'

export default function JobDetails(props) {

  return (
    <Card>
      <CompanyAvatar size="60" image={props.job.company_avatar_url} />
      <Link to={`/company/${props.job.company}/jobs`}>{props.job.company_name}</Link>
      <h4>{props.job.title}</h4>
      {props.job.location} - <Time time={props.job.created_at} /><br />
      <Stack direction="horizontal" gap={1}>
        <Badge bg="secondary">{props.job.hiring_type}</Badge>
        <Badge bg="secondary">{props.job.hours}</Badge>
        <Badge bg="secondary">{props.job.duration}</Badge>
        <Badge bg="secondary">{props.job.place}</Badge>
      </Stack>
      <p>{props.job.description}</p>
      <p>Work permit: {props.job.has_sponsorship ? "Yes" : "No"}</p>
      <p>Accommodation: {props.job.has_accommodation ? "Yes" : "No"}</p>
      <p>Food: {props.job.has_meal ? "Yes" : "No"}</p>
      <GoBack />
    </Card>
  )
}
