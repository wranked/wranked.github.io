// import React, { Component } from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ReviewSummary from '../components/ReviewSummary'
import Review from '../components/Review'
import Header from '../components/Header'
import AppContent from '../components/AppContent'

export default function CompaniesPage() {

  const [companies, setCompanies] = useState([])

  const fetchCompanies = () => {
    // const expats = `https://expats-croatia.vercel.app/companies/`
    const expats = `http://127.0.0.1:8000/companies/`

    fetch(expats).then(response => response.json()).then((json) => setCompanies(json))
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  return (
    <AppContent>
      <div><h1>Explore companies</h1></div>
      {
        companies.map((company, i) =>
          <div key={i}>
            <h3>{company.name}</h3>
            <h4>Summary</h4>
            <ReviewSummary ratings={company.rating_summary}></ReviewSummary>
            <h4>Reviews</h4>
            {company.reviews.map((review, j) =>
              <div key={j}>
                <Review reviews={review}></Review>
              </div>
            )}
          </div>
        )
      }
    </AppContent>
  )
}
