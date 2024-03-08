import AppContent from './components/AppContent';

import './App.css'


function App(props) {

  return (
    <AppContent>
      <h1>Home Page</h1>
      {props.children}
    </AppContent>
  );
}

export default App;
