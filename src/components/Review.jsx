import React, { Component } from "react"
import StarRating from "../common/StarRating"
import Comment from "./Comment"


export default function Review(props) {
  
    return (
      <div>
        <StarRating mode="edit"></StarRating>
        <StarRating stars={props.reviews["rating"]}></StarRating>
        <Comment value={props.reviews["comment"]}></Comment>
      </div>
    )
  
}