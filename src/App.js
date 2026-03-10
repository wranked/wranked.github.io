import AppContent from 'shared/layout/AppContent'
import CountrySelector from 'shared/ui/CountrySelector'

// import './App.css'
import { useTranslation } from 'react-i18next'


export default function App(props) {

  const { t } = useTranslation()

  return (
    <AppContent>
      <h1>{t("welcome")}</h1>
      <p>Bienvenido a Nomad Workers, una aplicación dedicada a migrantes que buscan trabajar en todo el mundo.</p>
      <p>Este lugar te permite encontrar información acerca de empresas y ofertas de trabajo, como también acerca de la documentación necesaria.</p>
      <p>Por el momento estamos enfocados en migrantes de Latinoamérica hacia Europa.</p>
      <CountrySelector />
      {props.children}
    </AppContent>
  );
}
