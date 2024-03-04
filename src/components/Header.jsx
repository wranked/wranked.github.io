import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Header() {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          Logo
        </Link>
        <Navbar />
      </div>
    </header>
  )
}
