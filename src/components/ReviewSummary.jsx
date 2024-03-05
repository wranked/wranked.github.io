import React from 'react'
import StarRating from '../common/StarRating'
import Card from '../common/Card'


const styles = {
  width: "300px",
  height: "1rem",
}


function ReviewSummary(props) {

  const stars = 5
  const sumary = props.company.rating_summary
  const auxArray = [...Array(stars).keys()].reverse()
  const maxRating = Math.max(...auxArray.map((index) => sumary[index + 1] || 0))

  return (
    <Card>
      <h3>{props.company.name}</h3>
      {
        auxArray.map((index) => (
          <p>{index + 1}. <progress style={styles} max={maxRating} value={sumary[index + 1] || 0} /></p>
        ))
      }
      <h1>{sumary["media"]}</h1>
      <StarRating editMode="false" value={sumary["media"]} stars={stars} />
      <label>{sumary["total"]} reviews</label><br />
    </Card>

  )
}

export default ReviewSummary