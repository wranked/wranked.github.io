import React, { Component, useState } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './navbar.css'

import { menuItemsData } from '../menuItemsData'
import Dropdown from './Dropdown'


export default function Navbar() {

  return (
    <nav className='desktop-nav'>
      <ul className='menus'>
        {/* {console.log(menuItemsData)} */}
        {menuItemsData.map((menu, index) => {
          // console.log(menu)
          return (
            <MenuItems items={menu} key={index} />
          )
        })}
      </ul>
    </nav>
  )
}

// function MenuItems({ items, children, ...props }) {
// const path = window.location.pathname
// const resolvedPath = useResolvedPath(items.url)
// const isActive = useMatch({ path: resolvedPath.pathname, end: true })
function MenuItems({ items }) {
  const [dropdown, setDropdown] = useState(false)
  // console.log("MenuItems")
  // console.log(items)
  return (
    // <li className={isActive ? "active" : ""}>
    <li className="menu-items">
      {items.submenu ? (
        
        <>
          <button type="button" aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"} onClick={() => setDropdown((prev) => !prev)}>
            {items.title}{" "}
          </button>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        // <Link to={items.url} {...props}>
        //   {children}
        // </Link>
        // <>{console.log("Sin submenu")}
        <Link to={items.url}>{items.title}</Link>
        // </>
      )}
    </li >
  )
}
