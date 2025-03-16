import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n.js'
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from './context/AuthProvider'

import { allRoutes } from './routes/allRoutes'


const router = createBrowserRouter([
  ...allRoutes,
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);