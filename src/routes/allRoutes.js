import App from '../App'
import ListCompanies from '../pages/ListCompanies'
import ProfilePage from '../pages/ProfilePage'
import ProfileEditPage from '../pages/ProfileEditPage'
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
import CompanyAbout from '../components/CompanyAbout'
import GuidesPage from '../pages/GuidesPage'
import JobPage from '../pages/JobPage'
import ContributionsPage from '../pages/ContributionsPage'
import CompanyDashboard from '../pages/CompanyDashboard'
// import CompanyEdit from '../pages/CompanyEdit'

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
    path: "/job/:job_id",
    element: <JobPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile/edit",
    element: <ProfileEditPage />,
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
        element: <CompanyAbout />,
      },
    ]
  },
  {
    path: "/company/:company_id/admin",
    element: <CompanyDashboard />,
  },
  // {
  //   path: "/company/:company_id/admin/edit",
  //   element: <CompanyEdit />,
  // },
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
  {
    path: "/guides",
    element: <GuidesPage />,
  },
  {
    path: "/contributions",
    element: <ContributionsPage />,
  },
]
