import React, { Component } from "react"
import Rating from "./Rating"
import Comment from "./Comment"


export default function Review(props) {
  
    return (
      <div>
        <Rating mode="edit"></Rating>
        <Rating stars={props.reviews["rating"]}></Rating>
        <Comment value={props.reviews["comment"]}></Comment>
      </div>
    )
  
}