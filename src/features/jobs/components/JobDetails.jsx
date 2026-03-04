import React from 'react'
import Card from 'react-bootstrap/Card'
import Time from '../../../common/Time'
import { CompanyAvatar } from '../../companies'
import GoBack from '../../../common/GoBack'
import { Badge, Stack } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { MdVerified } from "react-icons/md"

import { Link } from 'react-router-dom'

export default function JobDetails(props) {

  return (
    <Card>
      <Card.Body>
        <CompanyAvatar size="60" image={props.job.company_avatar_url} />
        <Link to={`/company/${props.job.company}/jobs`}>{props.job.company_name}
        </Link> {props.job.has_sponsorship ? <MdVerified title="Certified Agency" style={{ color: "#1DA1F2" }} /> : null}
        <h4>{props.job.title}</h4>
        {props.job.location} - <Time time={props.job.created_at} /><br />
        <Stack direction="horizontal" gap={1}>
          <Badge pill bg="primary">{props.job.hiring_type}</Badge>
          <Badge pill bg="primary">{props.job.hours}</Badge>
          <Badge pill bg="primary">{props.job.duration}</Badge>
          <Badge pill bg="primary">{props.job.place}</Badge>
        </Stack>
        <p>{props.job.description.split("\n").map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            <br />
          </React.Fragment>
        ))}</p>
        <Stack direction="vertical" gap={1}>
          <span>Work permit: {props.job.has_sponsorship ? <FaCheckCircle style={{ color: "green" }} /> : <FaTimesCircle style={{ color: "red" }} />}</span>
          <span>Accommodation: {props.job.has_accommodation ? <FaCheckCircle style={{ color: "green" }} /> : <FaTimesCircle style={{ color: "red" }} />}</span>
          <span>Food: {props.job.has_meal ? <FaCheckCircle style={{ color: "green" }} /> : <FaTimesCircle style={{ color: "red" }} />}</span>
        </Stack>

        <GoBack />
      </Card.Body>
    </Card>
  )
}
