import React from 'react'
import { useTranslation } from 'react-i18next'
import Flag from './Flag'


const languages = [
  {
    code: "de",
    flag: "de",
    lang: "Deutsch",
    name: "german",
    is_active: false
  },
  {
    code: "en",
    flag: "gb",
    lang: "English",
    name: "english",
    is_active: true
  },
  {
    code: "es",
    flag: "es",
    lang: "Español",
    name: "spanish",
    is_active: true
  },
  {
    code: "hr",
    flag: "hr",
    lang: "Hrvatski",
    name: "croatian",
    is_active: true
  },
  {
    code: "it",
    flag: "it",
    lang: "Italiano",
    name: "italian",
    is_active: false
  },
  {
    code: "pt",
    flag: "pt",
    lang: "Português",
    name: "portuguese",
    is_active: false
  },
]


export default function LanguageSelector() {
  const { t, i18n } = useTranslation("language_selector")

  function changeLanguage(lng) {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      {languages.map((lng) => {
        return lng.is_active ? <button key={lng.code} onClick={() => changeLanguage(lng.code)}>{lng.lang}<br />({t(lng.name)})<br /><Flag country={(lng.flag || "").toLowerCase()}/></button> : null
      })}
    </div>
  )
}
