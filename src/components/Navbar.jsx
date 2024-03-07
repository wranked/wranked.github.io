import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { GenerateMenu } from '../menuItemsData'
import Dropdown from './Dropdown'
import { useAuth } from '../context/AuthProvider'

import './navbar.css'


export default function Navbar() {

  const authContext = useAuth()
  const menuItemsData = Object.values(GenerateMenu(authContext.user))

  // TODO: Check if necessary to get User all the time
  useEffect(() => {
    authContext.checkUser()
  }, [])

  return (
    <nav className='desktop-nav'>
      <ul className='menus'>
        {menuItemsData.map((menu, index) => {
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
        <Link to={items.url}>{items.title}</Link>
        // </>
      )}
    </li >
  )
}
