import React from 'react'
import { useData } from '../pages/CompanyDetails'

export default function CompanyAbout() {

  const { companyData } = useData()

  return (
    <div>
      CompanyAbout: {companyData.description}
    </div>
  )
}
