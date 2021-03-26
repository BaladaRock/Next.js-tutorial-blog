import { createContext, useContext } from "react";
import firebaseClient from "./user/firebaseAuth";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={firebaseClient()}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`You must call useAuth() inside of a <AuthProvider />`);
  }

  return context;
};

const requireAuth = (Component) => (props) => {
  const { user } = useAuth();

  return user === null ? (
    "Loading..."
  ) : user ? (
    <Component {...props} />
  ) : (
    "You must login to view this page"
  );
};

export { AuthProvider, useAuth, requireAuth };
