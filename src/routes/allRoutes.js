import App from '../App'
import ListCompanies from '../pages/ListCompanies'
import ProfilePage from '../pages/ProfilePage'
import EmbassiesPage from '../pages/EmbassiesPage'
import LoginPage from '../pages/LoginPage'
import SchengenPage from '../pages/SchengenPage'
import CompanyDetails from '../pages/CompanyDetails'
import ListReviews from '../components/ListReviews'
import Jobs from '../components/Jobs'
import RegisterPage from '../pages/RegisterPage'
import Logout from '../components/Logout'

export const allRoutes = [
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/reviews",
  //   element: <ListReviews />,
  // },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/companies",
    element: <ListCompanies />,
  },
  {
    path: "/company/:id/*",
    element: <CompanyDetails />,
    children: [
      {
        path: "reviews",
        element: <ListReviews />,
        index: true,  // TODO: Check if this property is working
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "about",
        element: <Jobs />,
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
]
