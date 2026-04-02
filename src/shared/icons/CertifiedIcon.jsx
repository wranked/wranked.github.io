import { MdVerified } from "react-icons/md"


export default function CertifiedIcon({ isCertified = true }) {
  return (
    isCertified ? <MdVerified title="Certified Agency" style={{ color: "#1DA1F2" }} /> : null
  )
}