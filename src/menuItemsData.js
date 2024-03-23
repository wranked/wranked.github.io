import { FaUser } from "react-icons/fa"
import UserAvatar from "./components/UserAvatar"


export function GenerateMenu(user) {

  const menu = {
    companies: {
      title: 'Companies',
      submenu: [
        {
          title: 'Ranking',
          url: '/companies/',
        },
      ]
    },
    services: {
      title: 'Services',
      url: '/services',
    },
    jobs: {
      title: 'Jobs',
      url: '/jobs',
    },
    utils: {
      title: 'Utils',
      submenu: [
        {
          title: 'Schengen',
          url: '/schengen',
        },
        {
          title: 'Embassies',
          url: '/embassies',
        },
      ]
    },
    user: {
      title: user ? <UserAvatar size="30" /> : <FaUser />
    }
  }

  if (user) {
    menu.user.submenu = [
      {
        title: <><FaUser /><b>{user.email}</b></>,
        url: '/profile',
      },
      {
        title: "Settings",
        url: '/profile',
      },
      {
        title: "Language",
        url: '/profile',
      },
      {
        title: 'Sign out',
        url: '/logout',
      },
    ]
  } else {
    menu.user.submenu = [
      {
        title: 'Sign in',
        url: '/login',
      },
      {
        title: 'Sign up',
        url: '/register',
      },
    ]
  }
  return menu
}
