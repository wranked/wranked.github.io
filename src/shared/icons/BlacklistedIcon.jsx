import { FaFlag } from 'react-icons/fa6'


export default function BlacklistedIcon({ isBlacklisted=true }) {
  return (
    isBlacklisted ? <FaFlag title="Blacklisted Company" style={{ color: "#F00" }} /> : null
  )
}