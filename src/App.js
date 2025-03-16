import AppContent from './components/AppContent';

import './App.css'
import { useTranslation } from 'react-i18next';


function App(props) {

  const { t } = useTranslation()

  return (
    <AppContent>
      <h1>{t("welcome")}</h1>
      {props.children}
    </AppContent>
  );
}

export default App;
