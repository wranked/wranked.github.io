import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { GenerateMenu } from 'menuItemsData'
// import Dropdown from './Dropdown'
import { useAuth } from 'features/auth'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'

import { FaArrowRight } from "react-icons/fa"
import OriginDestinationAvatar from 'shared/ui/OriginDestinationAvatar'
import { useLocation } from 'context/LocationContext'


export default function NavbarMenu() {

  const authContext = useAuth()
  const menuItemsData = Object.values(GenerateMenu(authContext.user, authContext.companies))
  const { origin, destination } = useLocation()
  const [expanded, setExpanded] = useState(false)
  const navbarRef = useRef(null)

  // TODO: Check if necessary to get User all the time
  // useEffect(function () {
  //   authContext.checkUser()
  // }, [])

  useEffect(() => {
    if (!expanded) {
      return
    }

    function closeOnOutsideClick(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false)
      }
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setExpanded(false)
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('touchstart', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('touchstart', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [expanded])


  return (
    <Navbar
      ref={navbarRef}
      expand="md"
      bg="light"
      data-bs-theme="light"
      sticky="top"
      expanded={expanded}
      onToggle={(nextExpanded) => setExpanded(nextExpanded)}
    >
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/" className="logo">
            <OriginDestinationAvatar country={origin} />
            <FaArrowRight />
            <OriginDestinationAvatar country={destination} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {menuItemsData.map((menu, index) => {return <MenuItems items={menu} key={index} />})}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function MenuItems({ items }) {
  return (
    items.submenu ?
      <NavDropdown title={items.title} id="basic-nav-dropdown">
        {items.submenu.map((submenu, index) => {
          return (
            submenu.title === "divider" ?
              <NavDropdown.Divider key={index} />
              :
            <NavDropdown.Item href={submenu.url} key={index}>{submenu.title}</NavDropdown.Item>
          )
        })}
      </NavDropdown>
      :
      <Nav.Link href={items.url}>{items.title}</Nav.Link>
  )
}
