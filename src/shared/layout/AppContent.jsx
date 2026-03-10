import React from 'react'

import Header from 'shared/layout/Header'
import Footer from 'shared/layout/Footer'

// import './AppContent.css'


export default function AppContent(props) {

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ width: "800px", margin: "0 auto", flex: 1 }}>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}
