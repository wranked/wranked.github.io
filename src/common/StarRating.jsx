import React, { useState } from "react"
import { FaStar } from "react-icons/fa"
import StarHalfSvg from "../assets/svg/StarHalfSvg"


export default function StarRating({
  activeColor = "#fc0",
  bgColor = "#ddd",
  stars = 5,
  size = 15,
  ...props
}) {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  
  return (
    <div>
      {[...Array(parseInt(stars))].map((star, index) => {
        const currentRating = index + 1
        if (props.editMode === "true")
          return (
            <label>
              <input
                style={{ display: "None" }}
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
              />
              <FaStar
                style={{ cursor: "pointer" }}
                size={size}
                color={currentRating <= (hover || rating) ? activeColor : bgColor}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}

              // TODO: Check following code to select half star in edit mode:
              // onMouseLeave={() => {
              //   let svgDom = document.getElementsByClassName('star')[index]
              //   let pathDom = svgDom.children[0]
              //   pathDom.style.fill = ''
              //   setHover(null)
              // }}
              // onMouseMove={e => {
              //   let svgDom = document.getElementsByClassName('star')[index]
              //   let pathDom = svgDom.children[0]
              //   if (e.pageX - svgDom.getBoundingClientRect().left <= 15 / 2) {
              //     pathDom.style.fill = 'url(#orange_red)'
              //   } else {
              //     pathDom.style.fill = ''
              //   }
              // }}

              />
            </label>
          )

        return (
          <>
            {
              (props.value > currentRating + -0.8 && props.value < currentRating - 0.2)
                ?
                <StarHalfSvg size={size} activeColor={activeColor} bgColor={bgColor}/>
                :
                <FaStar size={size} color={currentRating - 0.2 <= props.value ? activeColor : bgColor} />
            }
          </>
        )

      }
      )
      }
    </div>
  )
}
