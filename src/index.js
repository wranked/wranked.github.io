import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReviewsPage from './pages/ReviewsPage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CompaniesPage from './pages/CompaniesPage';
import ProfilePage from './pages/ProfilePage';
import EmbassiesPage from './pages/EmbassiesPage';
import LoginPage from './pages/LoginPage';
import RequirementsPage from './pages/RequirementsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/reviews",
    element: <ReviewsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/companies",
    element: <CompaniesPage />,
  },
  {
    path: "/embassies",
    element: <EmbassiesPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LoginPage />,
  },
  {
    path: "/requirements",
    element: <RequirementsPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
