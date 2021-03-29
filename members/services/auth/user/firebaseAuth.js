import { useState, useEffect } from "react";
import firebase from "util/firebase";
import { useRealm } from "services/Realm";

import sanitizeUserData from "./helpers/sanitizeUserData";

const EMAIL_VERIFICATION = true;

const firebaseClient = () => {
  const { app, credentials } = useRealm();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(app.currentUser || false);
  const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);

  // Get the Auth0 variables from the hook.

  // Update the sanitized user object when the current user changes.

  useEffect(() => {
    if (user && user.id === currentUser.id) {
      setUser(sanitizeUserData(currentUser));

      return () => setUser(null);
    }
  }, [currentUser, isAuthenticated]);

  // Login and logout using email/password.

  const login = async (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      setUser(firebase.auth().currentUser);
    } catch (e) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      firebase.auth().signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (e) {
      console.log(error.message);
    }
  };

  const signup = async (email, password) => {
    try {
      const confirmation = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await handleAuth();
      return confirmation;
    } catch (e) {
      console.log(error.message);
    }
  };

  // Handle response from authentication functions
  const handleAuth = async (response) => {
    const current = firebase.auth().currentUser;
    // const { user, additionalUserInfo } = response;

    // Ensure Firebase is actually ready before we continue
    await waitForFirebase();

    // // Create the user in the database if they are new
    // if (additionalUserInfo.isNewUser) {
    //   await createUser(user.uid, { email: user.email });

    // Send email verification if enabled
    if (EMAIL_VERIFICATION) {
      current.sendEmailVerification();
    }
    // Update user in state
    setUser(current);
    return user;
  };

  return {
    user,
    currentUser,
    login,
    logout,
    signup,
  };
};

export default firebaseClient;
