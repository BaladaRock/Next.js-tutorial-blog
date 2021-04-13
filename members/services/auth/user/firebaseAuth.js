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

  // Update the sanitized user object when the current user changes.

  useEffect(() => {
    if (currentUser /*user && user.id === currentUser.id*/) {
      setUser(sanitizeUserData(currentUser));

      return () => setUser(null);
    } else {
      setUser(false);
    }
  }, [currentUser]);

  // Check if user is still logged in after tokens have been refreshed
  useEffect(() => {
    if (currentToken) {
      authenticate();
    }
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
      const session = authenticateFirebase(email, password);
      //await handleAuth(session);

      authenticateUsingToken();
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
      setUser(null);
    } catch (e) {
      alert(e);
    }
  };

  const signup = async (email, password) => {
    try {
      const session = await authenticateFirebase(email, password);

      // Send email confirmation for new users
      if (EMAIL_VERIFICATION) {
        currentUser.sendEmailVerification();
      }

      const payload = await handleAuth(session, {
        firebase,
        create: memberProfileCreate,
        update: updateOneMemberProfile,
      });

      return payload;
    } catch (e) {
      //console.log(e.message);
    }
  };

  const authenticateFirebase = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const handleAuth = async (response, { firebase, create, update }) => {
    const {
      user,
      additionalUserInfo: { isNewUser, profile },
    } = response;

    // Ensure Firebase is actually ready before we continue
    await waitForFirebase(firebase);

    return { user, isNewUser };
  };

  const authenticateUsingToken = async () => {
    try {
      const token = await firebase.auth().currentUser.getIdToken();
      setCurrentToken(token);
      authenticate();
    } catch (e) {
      //console.log(e);
      alert(e);
    }
  };

  const authenticate = async () => {
    try {
      const creds = await credentials({
        type: "jwt",
        value: currentToken,
      });

      await app.logIn(creds);
      setCurrentUser(app.currentUser);
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
