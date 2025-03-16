import React from 'react'
import LanguageSelector from './LanguageSelector'
import { useTranslation } from 'react-i18next'

export default function Footer() {

  const { t } = useTranslation()

  return (
    <div>
      <br />
      <hr />
      <br />
      <LanguageSelector />
      <br />
      <p>{t("copyright")}</p>
      <br />
    </div>
  )
}
