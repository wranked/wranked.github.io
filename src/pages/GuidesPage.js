import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import AppContent from '../components/AppContent'
import { useTranslation } from 'react-i18next'
import { useApiClient } from '../context/ApiClient'
import remarkBreaks from 'remark-breaks'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'


const md = `
# Emergency phone numbers	
(Add +385 prefix if you don't have a croatian SIM card)	

| Number | Croatian | English | Spanish |
| :- | :- | :- | :- |
| 112 | Hitne službe | Emergency | Número único de emergencias |
| 192 | Policija | Police | Policía |
| 193 | Vatrogasci | Fire department | Cuerpo de bomberos |
| 194 | Hitna medicinska služba | Emergency medical help | Ambulancia |
| 195 | Služba traganja i spašavanja na moru | Maritime search & rescue | Búsqueda y salvamento en el mar |
| 1987 | Pomoć na cesti | Help on the road | Asistencia en carretera \`hello \`|

`

export default function GuidesPage() {

  const { t, i18n } = useTranslation(["guides"])

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const client = useApiClient()

  const name = "name="
  const lang = "language_code=" + i18n.language

  useEffect(function () {
    setLoading(true)
    client.get(`/articles/?${lang}`)
      .then(function (res) {
        setData(res.data)
        setLoading(false)
      })
      .catch(function (err) {
        setError(err)
      })
  }, [i18n.language])



  return (
    <AppContent>
      {loading ?
        <LoadingSpinner />
        :
        <>
          <h1>{t("header")}</h1>
          <ul>
            {
              data.map((guide, index) => (
                <li>
                  <a href={"#" + guide.name + "-" + guide.language_code}>{guide.title}</a>
                </li>
              )
              )
            }
          </ul>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {
            data.map((guide, index) => (
              <>

                <a id={guide.name + "-" + guide.language_code}><h2>{guide.title}</h2></a>
                <Markdown remarkPlugins={[remarkBreaks, [remarkGfm, { singleTilde: false }]]} children={guide.content} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </>
            )
            )
          }
        </>
      }
    </AppContent>

  )
}
