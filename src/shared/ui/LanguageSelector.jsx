import React from 'react'
import { useTranslation } from 'react-i18next'
import Dropdown from 'react-bootstrap/Dropdown'
import Flag from 'shared/ui/Flag'


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
  const activeLanguages = languages.filter((lng) => lng.is_active)
  const currentLanguageCode = (i18n.resolvedLanguage || i18n.language || "en").slice(0, 2)
  const selectedLanguage = activeLanguages.find((lng) => lng.code === currentLanguageCode) || activeLanguages[0]
  const selectableLanguages = activeLanguages.filter((lng) => lng.code !== selectedLanguage.code)

  function changeLanguage(lng) {
    i18n.changeLanguage(lng)
  }

  return (
    <Dropdown drop="up">
      <Dropdown.Toggle
        variant="outline-secondary"
        id="language-selector-toggle"
        style={{ color: '#212529', borderColor: '#adb5bd' }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Flag country={(selectedLanguage.flag || "").toLowerCase()} />
          <span>{selectedLanguage.lang}</span>
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          '--bs-dropdown-link-color': '#212529',
          '--bs-dropdown-link-hover-color': '#212529',
          '--bs-dropdown-link-hover-bg': '#e9ecef',
          '--bs-dropdown-link-active-color': '#212529',
          '--bs-dropdown-link-active-bg': '#dee2e6',
        }}
      >
        {selectableLanguages.map((lng) => (
          <Dropdown.Item key={lng.code} onClick={() => changeLanguage(lng.code)} style={{ color: '#212529' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Flag country={(lng.flag || "").toLowerCase()} />
              <span>{lng.lang} ({t(lng.name)})</span>
            </span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
