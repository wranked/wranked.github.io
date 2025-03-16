import React from 'react'
import StarRating from '../common/StarRating'
import Card from '../common/Card'
import { Link } from 'react-router-dom'


const styles = {
  width: "300px",
  height: "1rem",
}


function ReviewSummary(props) {

  const stars = 5
  const sumary = props.company.rating_summary || {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, media: 0, count: 0} // TODO: Check if this is the best way to handle the default value
  const auxArray = [...Array(stars).keys()].reverse()
  const maxRating = Math.max(...auxArray.map((index) => sumary[index + 1] || 0))

  return (
    <Card>
      <Link to={`/company/${props.company.id}`}><h3>{props.company.display_name}</h3></Link>
      {
        auxArray.map((index) => (
          <p key={index}>{index + 1}. <progress style={styles} max={maxRating} value={sumary[index + 1] || 0} /></p>
        ))
      }
      <h1>{Number(sumary["media"]).toFixed(1)}</h1>
      <StarRating editMode={false} value={sumary["media"]} stars={stars} />
      <label>{sumary["count"]} reviews</label><br />
    </Card>

  )
}

export default ReviewSummary