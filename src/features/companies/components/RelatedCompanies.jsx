import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import CompanyAvatar from './CompanyAvatar'
import './RelatedCompanies.css'

export default function RelatedCompanies({ companyData }) {
  // Check if related companies exist
  if (!companyData.related_companies || companyData.related_companies.length === 0) {
    return null
  }

  return (
    <>
      <Card.Title>Related Companies</Card.Title>
      <ListGroup variant="flush">
        {companyData.related_companies.map((company, index) => (
          <ListGroup.Item key={index} className="related-company-item">
            <Link to={`/company/${company.id}`} className="related-company-link">
              <CompanyAvatar size="32" image={company.avatar_url} />
              <span className="related-company-name">{company.display_name}</span>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}
