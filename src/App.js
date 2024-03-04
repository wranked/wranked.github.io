import { useState } from 'react';
import './App.css'
import AppContent from './components/AppContent';
// import { AuthContext } from './context/AuthContext'


function App() {

  // const [currentUser, setCurrentUser] = useState(false)

  return (
    <div>
      <AppContent />
    </div>
    // <AuthContext.Provider value={{currentUser, setCurrentUser}}>
    //   <AppContent />
    // </AuthContext.Provider>
  );
}

export default App;
