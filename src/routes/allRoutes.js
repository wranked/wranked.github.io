import App from '../App'
import ListCompanies from '../pages/ListCompanies'
import ProfilePage from '../pages/ProfilePage'
import EmbassiesPage from '../pages/EmbassiesPage'
import LoginPage from '../pages/LoginPage'
import SchengenPage from '../pages/SchengenPage'
import CompanyDetails from '../pages/CompanyDetails' 
import ReviewsPage from '../pages/ReviewsPage'

export const allRoutes = [
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
    element: <ListCompanies />,
  },
  {
    path: "/companies/:id",
    element: <CompanyDetails />,
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
    element: <LoginPage />,
  },
  {
    path: "/schengen",
    element: <SchengenPage />,
  },
]
