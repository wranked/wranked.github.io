import AppContent from './components/AppContent';

import './App.css'


function App(props) {

  return (
    <AppContent>
      {props.children}
    </AppContent>
  );
}

export default App;
