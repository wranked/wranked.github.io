import React from 'react'

import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

import { AuthContext } from '../context/AuthContext'


export default function AppContent(props) {

  const [currentUser, setCurrentUser] = useState("")
  const value = { currentUser, setCurrentUser }

  return (
    <AuthContext.Provider value={value}>
      <Header />
      {props.children}
      <Footer />
    </AuthContext.Provider>
  )
}
