import App from '../App'
import { ListCompanies, CompanyDetails, CompanyAbout, CompanyDashboard } from '../features/companies'
import ProfilePage from '../pages/ProfilePage'
import ProfileEditPage from '../pages/ProfileEditPage'
import EmbassiesPage from '../pages/EmbassiesPage'
import { LoginPage, RegisterPage, Logout } from '../features/auth'
import SchengenPage from '../pages/SchengenPage'
import { ListReviews, ContributionsPage } from '../features/reviews'
import { ListCompanyJobs, JobsPage, JobPage } from '../features/jobs'
import ServicesPage from '../pages/ServicesPage'
import GuidesPage from '../pages/GuidesPage'
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
        element: <ListCompanyJobs />,
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
