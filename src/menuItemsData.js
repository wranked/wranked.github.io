import { FaUser } from "react-icons/fa"

import AuthContext from './context/AuthContext'
import { useContext } from "react"

function GenerateMenu() {

  // const currentUser = AuthContext._currentValue.currentUser
  const currentUser = ""

  // const { currentUser, setCurrentUser } = useContext(AuthContext)

  console.log(currentUser)


  const menu = {
    companies: {
      title: 'Companies',
      submenu: [
        {
          title: 'Reviews',
          url: '/reviews',
        },
        {
          title: 'Rating',
          url: '/companies',
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
          title: 'Schengen requirements',
          url: '/requirements',
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


  if (currentUser) {
    menu.user.submenu = [
      {
        title: currentUser.email,
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

export const menuItemsData = Object.values(GenerateMenu())



// export const menuItemsData = [
//   {
//     title: 'Companies',
//     submenu: [
//       {
//         title: 'Reviews',
//         url: '/reviews',
//       },
//       {
//         title: 'Rating',
//         url: '/companies',
//       }
//     ]
//   },
//   {
//     title: 'Embassies',
//     url: '/embassies',
//   },
//   {
//     title: <FaUser />,
//     submenu: [
//       {
//         title: user.email,
//         url: '/profile',
//       },
//       {
//         title: 'Login',
//         url: '/login',
//       },
//       {
//         title: 'Register',
//         url: '/register',
//       },
//       {
//         title: 'Logout',
//         url: '/logout',
//       },
//     ]
//   },
// ]
