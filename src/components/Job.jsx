import React from 'react'
import Card from '../common/Card'
import Time from '../common/Time'

export default function Job(props) {
  return (
    <Card>
      <h4>{props.job.title}</h4>
      <p>{props.job.company_name}</p>
      <p>{props.job.location}</p>
      <Time time={props.job.created_at} /><br />
    </Card>
  )
}
