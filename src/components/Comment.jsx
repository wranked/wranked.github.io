import React, { Component, useState } from "react"

export default function Comment(props) {

  return (
    <div>
      <form>
        <input name="comment" value={props.value} />
      </form>
    </div>
  )
}