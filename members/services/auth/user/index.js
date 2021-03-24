import { useState, useEffect } from "react";
import { useRealm } from "services/Realm";

import sanitizeUserData from "./helpers/sanitizeUserData";

const client = () => {
  const { app, credentials } = useRealm();
  const [user, setUser] = useState({ name: "Andrei" });
  const [currentUser, setCurrentUser] = useState(app.currentUser || false);
  const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);

  // Get the Auth0 variables from the hook.

  // Update the sanitized user object when the current user changes.

  useEffect(() => {
    if (isAuthenticated) {
      setUser(sanitizeUserData(currentUser));

      return () => setUser(null);
    }
  }, [currentUser, isAuthenticated]);

  // Login and logout using email/password.

  const login = async (email, password) => {
    try {
      const userCredentials = await credentials(email, password);
      await app.logIn(userCredentials);

      setCurrentUser(app.currentUser);
      setIsAuthenticated(true);
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    try {
      setUser(null);

      // Sign out from Realm and Auth0.
      await app.currentUser?.logOut();
      // Update the user objects.
      setCurrentUser(app.currentUser);
      setIsAuthenticated(false);
      setUser(false);
    } catch (e) {
      throw e;
    }
  };

  const signup = async (email, password) => {
    try {
      await app.emailPasswordAuth.registerUser(email, password);
      // await app.emailPasswordAuth.resendConfirmation(email);
    } catch (e) {
      throw e;
    }
  };

  return {
    user,
    currentUser,
    login,
    logout,
    signup,
  };
};

export default client;
