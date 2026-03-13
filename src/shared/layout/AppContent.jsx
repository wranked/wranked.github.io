import React from 'react'

import Header from 'shared/layout/Header'
import Footer from 'shared/layout/Footer'

import './AppContent.css'


export default function AppContent(props) {

  return (
    <div className="app-content">
      <Header />
      <main className="inner-content">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
