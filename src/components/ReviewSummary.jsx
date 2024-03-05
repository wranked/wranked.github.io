import React from 'react'
import Rating from './Rating'



const styles = {
  "border": "1px solid #999",
  "border-radius": "10px",
  "box-shadow": "2px 2px 5px #999",
  "padding": "20px",
  "margin": "10px",
  "text-align": "left",
  "max-width": "400px",
  // "display": "inline-block",

  "hover": {
    "border": "5px solid #000",
  }
}

const ratingBar = {
  width: "300px",
  height: "1rem",
}


function ReviewSummary(props) {

  const sumary = props.company.rating_summary
  const maxRating = Math.max(...[...Array(5).keys()].map((index, b) => sumary[index +1]))
  const media = 3.4

  return (
    <div style={styles} key={props.index}>
      <h3>{props.company.name}</h3>
      <label>5. <progress style={ratingBar} max={maxRating} value={sumary[5]} /></label><br/>
      <label>4. <progress style={ratingBar} max={maxRating} value={sumary[4]} /></label><br/>
      <label>3. <progress style={ratingBar} max={maxRating} value={sumary[3]} /></label><br/>
      <label>2. <progress style={ratingBar} max={maxRating} value={sumary[2]} /></label><br/>
      <label>1. <progress style={ratingBar} max={maxRating} value={sumary[1]} /></label><br/>
      <h1>{sumary["media"]}</h1>
      <Rating editMode="true" value={sumary["media"]} />
      <label>{sumary["total"]} reviews</label><br/>
    </div>

  )
}

export default ReviewSummary