import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { GenerateMenu } from 'menuItemsData'
// import Dropdown from './Dropdown'
import { useAuth } from 'features/auth'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'

import { FaArrowRight } from "react-icons/fa"
import OriginDestinationAvatar from 'shared/ui/OriginDestinationAvatar'
import { useLocation } from 'context/LocationContext'


export default function NavbarMenu() {

  const authContext = useAuth()
  const menuItems = GenerateMenu(authContext.user, authContext.companies)
  const userMenuItem = menuItems.user
  const mainMenuItems = Object.entries(menuItems)
    .filter(([key]) => key !== 'user')
    .map(([, value]) => value)
  const { origin, destination } = useLocation()
  const [expanded, setExpanded] = useState(false)
  const [mobileUserExpanded, setMobileUserExpanded] = useState(false)
  const navbarRef = useRef(null)

  // TODO: Check if necessary to get User all the time
  // useEffect(function () {
  //   authContext.checkUser()
  // }, [])

  useEffect(() => {
    if (!expanded && !mobileUserExpanded) {
      return
    }

    function closeOnOutsideClick(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false)
        setMobileUserExpanded(false)
      }
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setExpanded(false)
        setMobileUserExpanded(false)
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
  }, [expanded, mobileUserExpanded])


  return (
    <Navbar
      ref={navbarRef}
      expand="md"
      bg="light"
      data-bs-theme="light"
      sticky="top"
      expanded={expanded}
      onToggle={(nextExpanded) => {
        setExpanded(nextExpanded)
        if (nextExpanded) {
          setMobileUserExpanded(false)
        }
      }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/" className="logo">
            <OriginDestinationAvatar country={origin} />
            <FaArrowRight />
            <OriginDestinationAvatar country={destination} />
          </Link>
        </Navbar.Brand>
        <Nav className="d-md-none ms-auto me-2">
          {userMenuItem ? (
            <Button
              variant="link"
              onClick={() => {
                setMobileUserExpanded((prev) => !prev)
                setExpanded(false)
              }}
              aria-expanded={mobileUserExpanded}
              style={{ cursor: 'pointer', textDecoration: 'none', padding: 0, color: 'inherit' }}
            >
              {userMenuItem.title}
            </Button>
          ) : null}
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {mainMenuItems.map((menu, index) => {return <MenuItems items={menu} key={index} />})}
            {userMenuItem ? <div className="d-none d-md-block"><MenuItems items={userMenuItem} /></div> : null}
          </Nav>
        </Navbar.Collapse>
        <Collapse in={mobileUserExpanded} className="d-md-none w-100">
          <div className="border-top mt-2 pt-2">
            <Nav className="flex-column pb-2">
              {userMenuItem?.submenu?.map((submenu, index) => {
                if (submenu.title === "divider") {
                  return <hr key={index} className="my-1" />
                }
                return (
                  <Nav.Link
                    href={submenu.url}
                    key={index}
                    onClick={() => setMobileUserExpanded(false)}
                  >
                    {submenu.title}
                  </Nav.Link>
                )
              })}
            </Nav>
          </div>
        </Collapse>
      </Container>
    </Navbar>
  )
}

function MenuItems({ items }) {
  return (
    items.submenu ?
      <NavDropdown title={items.title} id="basic-nav-dropdown" align="end">
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
