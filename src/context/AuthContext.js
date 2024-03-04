import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({currentUser: "SARASA", setCurrentUser: () => {}})



// function AuthProvider(props) {
//   const [currentUser, setCurrentUser] = useState("")

//   return (
//     <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
//       {props.children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider

// export const useAuth = () => {
//   return useContext(AuthContext);
// }