import { FaUser } from "react-icons/fa"


export function GenerateMenu(user) {

  const menu = {
    companies: {
      title: 'Ranking',
      submenu: [
        {
          title: 'Company List',
          url: '/companies/',
        },
      ]
    },
    embassies: {
      title: 'Embassies',
      url: '/embassies',
    },
    utils: {
      title: 'Utils',
      submenu: [
        {
          title: 'Schengen',
          url: '/schengen',
        },
        {
          title: 'Rating',
          url: '/companies',
        },
      ]
    },
    user: {
      title: <FaUser />
    }
  }

  if (user) {
    menu.user.submenu = [
      {
        title: user.email,
        url: '/profile',
      },
      {
        title: 'Logout',
        url: '/logout',
      },
    ]
  } else {
    menu.user.submenu = [
      {
        title: 'Login',
        url: '/login',
      },
      {
        title: 'Register',
        url: '/register',
      },
    ]
  }
  return menu
}
