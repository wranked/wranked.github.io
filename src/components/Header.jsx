import { Link } from 'react-router-dom'
import NavbarMenu from 'components/NavbarMenu'
import OriginDestinationAvatar from 'components/OriginDestinationAvatar'
import { useLocation } from 'context/LocationContext'
import { FaArrowRight } from "react-icons/fa"

import Container from 'react-bootstrap/Container'

export default function Header() {

  const { origin, destination } = useLocation()


  return (
    <header>
      {/* <div className="nav-area">
        <Link to="/" className="logo">
          <OriginDestinationAvatar country={origin} />
          <FaArrowRight/>
          <OriginDestinationAvatar country={destination} />
        </Link>
      </div> 
      <Container className="d-flex justify-content-center">
        <div className="content-box"> */}
          <NavbarMenu />
        {/* </div>
      </Container> */}
    </header>
  )
}
