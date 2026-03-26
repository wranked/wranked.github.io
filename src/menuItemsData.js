import { FaUser } from "react-icons/fa"
import UserAvatar from 'shared/ui/UserAvatar'
import { useTranslation } from "react-i18next"


export function GenerateMenu(user, companies=null) {
  // console.log("GenerateMenu")

  const { t } = useTranslation("menu")

  const menu = {
    companies: {
      title: t("companies"),
      url: '/companies/',
      // submenu: [{title: t("ranking"), url: '/companies/',},]
    },
    services: {
      title: t("services"),
      url: '/services',
    },
    jobs: {
      title: t("jobs"),
      url: '/jobs',
    },
    utils: {
      title: t("utils"),
      submenu: [
        {
          title: t("schengen"),
          url: '/schengen',
        },
        {
          title: t("embassies"),
          url: '/embassies',
        },
        {
          title: t("guides"),
          url: '/guides',
        },
      ]
    },
    user: {
      title: user ? <UserAvatar public={true} size="30" image={user.picture} /> : <FaUser />
    }
  }

  let companies_admin = []
  console.log("companies", companies)
  if (companies && companies.length > 0) {
    console.log("checking_companies")
    companies_admin.push({title: "divider"})
    companies_admin.push(...companies.map((company) => {
      return {
        title: "Company: " + company.display_name,
        url: `/company/${company.id}/admin`,
      }
    }))
  }

  if (user) {
    menu.user.submenu = [
      {
        // title: <><FaUser /><b>{user.email}</b></>,
        title: <b>{user.email}</b>,
        url: '/profile',
      },
      {
        title: t("contributions"),
        url: '/contributions',
      },
      {
        title: t("settings"),
        url: '/profile',
      },
      ...companies_admin,
      {
        title: "divider",
      },
      {
        title: t("sign_out"),
        url: '/logout',
      },
    ]
  } else {
    menu.user.submenu = [
      {
        title: t("sign_in"),
        url: '/login',
      },
      {
        title: t("sign_up"),
        url: '/register',
      },
    ]
  }
  return menu
}
