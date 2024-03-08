import React from "react"

import Card from "../common/Card"
import Comment from "./Comment"
import StarRating from "../common/StarRating"
import Time from "../common/Time"
import UserAvatar from "./UserAvatar"


export default function Review(props) {

  return (
    <Card>
      <UserAvatar size="60" /> Anonymous user<br />
      <Time time={props.review.created_at} /><br />
      Role: Generic position<br />
      Salary range: <b>800 - 1000 EUR</b><br />
      <StarRating editMode="false" value={props.review.rating} />
      <Comment value={props.review.comment}></Comment>
    </Card>
  )
}
