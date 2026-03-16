import React from 'react'
import { useCompanyData } from 'features/companies/index'
import Card from 'react-bootstrap/Card'
import Locations from './Locations'
import './CompanyAbout.css'


export default function CompanyAbout() {
  const { companyData } = useCompanyData()
  const API_KEY = "AIzaSyDmm12sorDfX8xsYOei0qUDY-Ld86jIZGE"

  return (
    <div>
      <Card className="company-about-card">
        <Card.Body className="company-about-card-body">
          <Card.Title>Overview</Card.Title>
          <Card.Text style={{ whiteSpace: "pre-line" }}>{companyData.description}</Card.Text>
          {
            companyData.url ?
              <>
                <Card.Title>Website</Card.Title>
                <Card.Text><a href={companyData.url} target="_blank" rel="noopener noreferrer">{companyData.url}</a></Card.Text>
              </>
              :
              null
          }

          <Card.Title>Industry</Card.Title>
          <Card.Text>{companyData.category}</Card.Text>
          <Locations companyData={companyData} apiKey={API_KEY} />
        </Card.Body>
      </Card>
    </div>
  )
}
