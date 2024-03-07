import React from "react"
import StarRating from "../common/StarRating"
import Comment from "./Comment"
import Time from "../common/Time"


export default function Review(props) {

  return (
    <>
      <StarRating editMode="true" /><br />
      <StarRating value={props.review.rating} /><Time time={props.review.created_at} />
      <Comment value={props.review.comment}></Comment>
    </>
  )
}
