import React, { useState } from "react"
import { FaStar } from "react-icons/fa"
import HalfStarIcon from 'shared/icons/HalfStarIcon'


export default function StarRatingIcon({
  activeColor = "#fc0",
  bgColor = "#ddd",
  stars = 5,
  size = 15,
  ...props
}) {
  const [value, setValue] = useState(props.value)
  const [hover, setHover] = useState(null)

  return (
    <>
      {[...Array(parseInt(stars))].map((star, index) => {
        const currentRating = index + 1
        if (props.editMode)
          return (
        // <form>
            <label key={index}>
              <input
                style={{ display: "None" }}
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setValue(currentRating)}
                onChange={props.onChange}
              />
              <FaStar
                style={{ cursor: "pointer" }}
                size={size}
                color={currentRating <= (hover || value) ? activeColor : bgColor}
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
            // </form>
          )

        return (
          <React.Fragment key={index}>
            {
              (props.value > currentRating + -0.8 && props.value < currentRating - 0.2)
                ?
                <HalfStarIcon size={size} activeColor={activeColor} bgColor={bgColor}/>
                :
                <FaStar size={size} color={currentRating - 0.2 <= props.value ? activeColor : bgColor} />
            }
          </React.Fragment>
        )

      }
      )
      }
    </>
  )
}
