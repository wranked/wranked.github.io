import React from 'react'

const styles = {
}

function ReviewSummary(props) {
  return (
    <div>
      <label>5. {props.ratings[5]}</label><br/>
      <label>4. {props.ratings[4]}</label><br/>
      <label>3. {props.ratings[3]}</label><br/>
      <label>2. {props.ratings[2]}</label><br/>
      <label>1. {props.ratings[1]}</label><br/>
      <label>Average: {props.ratings["media"]}</label><br/>
      <label>Total: {props.ratings["total"]}</label><br/>
    </div>

  )
}

export default ReviewSummary