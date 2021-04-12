import { useState, useEffect } from "react";
import firebase from "util/firebase";
import { useRealm } from "services/Realm";
import { useRouter } from "next/router";

import sanitizeUserData from "./helpers/sanitizeUserData";

const EMAIL_VERIFICATION = true;

const firebaseClient = () => {
  const { app, credentials } = useRealm();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(app.currentUser || false);
  const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);

  // Update the sanitized user object when the current user changes.

  useEffect(() => {
    if (user && user.id === currentUser.id) {
      setUser(sanitizeUserData(currentUser));

      return () => setUser(null);
    }
  }, [currentUser, isAuthenticated]);

  // Check if user is still logged in after tokens have refreshed
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        authenticateUsingToken();
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, [currentToken]);

  // Check if the current user is not null and set state if not
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && !currentUser.getIdToken()) {
      setCurrentToken(currentUser.getIdToken());
    }
  }, []);

  // Login and logout using email/password.

  const login = async (email, password) => {
    try {
      const confirmation = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      await handleAuth();

      return confirmation;
    } catch (e) {
      console.log(e.message);
      alert(e);
    }
  };

  const logout = async () => {
    try {
      // Sign out from Realm and Firebase.
      firebase.auth().signOut();
      await app.currentUser?.logOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (e) {
      console.log(e.message);
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
      console.log(e.message);
    }
  };

  // Handle response from authentication functions
  const handleAuth = async () => {
    //const { user, additionalUserInfo } = response;

    // Ensure Firebase is actually ready before we continue
    await waitForFirebase();

    const currentUser = firebase.auth().currentUser;

    // Send email confirmation for new users
    if (!isAuthenticated && EMAIL_VERIFICATION) {
      currentUser.sendEmailVerification();
    }

    // Authenticate user

    const user = await authenticateUsingToken();
    return user;
  };

  const authenticateUsingToken = async () => {
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      console.log(token);
      authenticate(token);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  const authenticate = async (token) => {
    try {
      const creds = await credentials({
        type: "jwt",
        value: token,
      });

      await app.logIn(creds);

      setCurrentUser(app.currentUser);
      setIsAuthenticated(true);
    } catch (e) {
      throw e;
    }
  };

  // Waits on Firebase user to be initialized before resolving promise
  // This is used to ensure auth is ready before any writing to the db can happen
  const waitForFirebase = () => {
    return new Promise((resolve) => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user); // Resolve promise when we have a user
          unsubscribe(); // Prevent from firing again
        }
      });
    });
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
