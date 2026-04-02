import { MdVerified } from "react-icons/md"


export default function CertifiedBadge({ isCertified = true }) {
  if (!isCertified) {
    return null
  }

  return (
    <span
      title="Certified"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.4rem 0.45rem",
        border: "1px solid #77cff1",
        borderRadius: "4px",
        boxShadow: "4px 4px 4px rgba(255, 188, 2, 0.51)",
        backgroundColor: "#074375",
        color: "#78d9ff",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
        verticalAlign: "middle",
      }}
    >
      <MdVerified style={{ color: "#d4af37", fontSize: "1rem" }} />
      Certified
    </span>
  )
}