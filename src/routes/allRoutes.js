import App from '../App'
import ListCompanies from '../pages/ListCompanies'
import ProfilePage from '../pages/ProfilePage'
import EmbassiesPage from '../pages/EmbassiesPage'
import LoginPage from '../pages/LoginPage'
import SchengenPage from '../pages/SchengenPage'
import CompanyDetails from '../pages/CompanyDetails'
import ListReviews from '../components/ListReviews'
import ListJobs from '../components/ListJobs'
import RegisterPage from '../pages/RegisterPage'
import Logout from '../components/Logout'
import JobsPage from '../pages/JobsPage'
import ServicesPage from '../pages/ServicesPage'

export const allRoutes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/jobs",
    element: <JobsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/companies",
    element: <ListCompanies />,
  },
  {
    path: "/company/:company_id/*",
    element: <CompanyDetails />,
    children: [
      {
        path: "reviews",
        element: <ListReviews />,
        index: true,  // TODO: Check if this property is working
      },
      {
        path: "jobs",
        element: <ListJobs />,
      },
      {
        path: "about",
        element: null,
      },
    ]
  },
  {
    path: "/embassies/",
    element: <EmbassiesPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/schengen",
    element: <SchengenPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
]
