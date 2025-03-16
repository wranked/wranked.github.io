import React from 'react'
import Card from '../common/Card'
import Time from '../common/Time'
import CompanyAvatar from './CompanyAvatar'

import { Link } from 'react-router-dom'


export default function Job(props) {
  return (
    <Card>
      <CompanyAvatar size="60" image={props.job.company_avatar_url} />
      <Link to={`/job/${props.job.id}`}><h4>{props.job.title}</h4></Link>
      <p>{props.job.company_name}</p>
      <p>{props.job.location}</p>
      <Time time={props.job.created_at} /><br />
    </Card>
  )
}
