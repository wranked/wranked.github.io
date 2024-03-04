import { Link } from "react-router-dom"

export default function Dropdown ({ submenus, dropdown }) {
  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <Link to={submenu.url}>{submenu.title}</Link>
        </li>
      ))}
    </ul>
  )
}