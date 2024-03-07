import React from 'react'


export default function Time(props) {

  var date_post = new Date(props.time)
  var date_now = new Date()

  var d = Math.abs(date_post - date_now) / 1000
  var r = {}
  var s = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  Object.keys(s).forEach(function (key) {
    r[key] = Math.floor(d / s[key])
    d -= r[key] * s[key]
  })

  let maxPeriod = null
  let periodValue = null

  for (let period in r) {
    if (r[period]) {
      maxPeriod = period
      periodValue = r[period]
      break
    }
  }

  return (
    <>{periodValue} {periodValue > 1 ? maxPeriod + "s" : maxPeriod} ago</>
  )
}
