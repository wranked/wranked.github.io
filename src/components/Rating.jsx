import React from "react"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import { useState } from "react"


export default function Rating(props) {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1
        if (props.mode === 'edit')
          return (
            <label>
              <input
                style={{display: "None"}}
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <FaStarHalfAlt
                style={{cursor: "pointer"}}
                size={15}
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        else {
          return (
            <label>
              <FaStar
                size={15}
                color={currentRating <= props.stars ? "#ffc107" : "#e4e5e9"}
              />
            </label>
          )
        }
      }
      )
      } Your rating is {props.stars || rating}
    </div>
  )
}
