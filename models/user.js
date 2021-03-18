import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRealm } from "@destacked/database";

// const client = () => {
//   const { app, credentials } = useRealm();
//   const [currentUser, setCurrentUser] = useState(app.currentUser || false);

//   /**
//    *
//    */

//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(user ? true : false);

//   /**
//    * Get the Auth0 variables from the hook.
//    */

//   const {
//     isLoading: auth0IsLoading,
//     isAuthenticated: auth0IsAuthenticated,
//     getAccessTokenSilently: auth0GetToken,
//     loginWithRedirect: auth0Login,
//     logout: auth0Logout,
//   } = useAuth0();

//   /**
//    * Update the sanitized user object when the current user changes.
//    */

//   useEffect(() => {
//     if (isAuthenticated) {
//       setUser(sanitizeUserData(currentUser));

//       return () => setUser(null);
//     }
//   }, [currentUser, isAuthenticated]);

//   /**
//    *
//    */

//   const authenticateUsingToken = async () => {
//     try {
//       const token = await auth0GetToken();

//       authenticate(token);
//     } catch (e) {
//       if (e.error === "login_required") {
//         auth0Login();
//       }

//       if (e.error === "consent_required") {
//         auth0Login();
//       }

//       throw e;
//     }
//   };

//   /**
//    * When the access token changes, get their JWT and authenticate with Realm.
//    */

//   useEffect(() => {
//     if (auth0IsAuthenticated) {
//       authenticateUsingToken();
//     } else if (!auth0IsLoading) {
//       setUser(false);
//     }
//   }, [auth0IsAuthenticated, auth0GetToken, auth0IsLoading]);

//   /**
//    *
//    * @returns
//    */

//   const authenticate = async (token) => {
//     try {
//       const creds = await credentials({
//         type: "jwt",
//         value: token,
//       });

//       await app.logIn(creds);

//       setCurrentUser(app.currentUser);
//       setIsAuthenticated(true);
//     } catch (e) {
//       throw e;
//     }
//   };

//   /**
//    *
//    */

//   const login = async () => {
//     auth0Login();
//   };

//   /**
//    *
//    * @returns
//    */

//   const logout = async (args) => {
//     try {
//       setUser(null);

//       // Sign out from Realm and Auth0.
//       await app.currentUser?.logOut();
//       auth0Logout(args);

//       // Update the user objects.
//       setCurrentUser(app.currentUser);
//       setIsAuthenticated(false);
//       setUser(false);
//     } catch (e) {
//       throw e;
//     }
//   };

//   /**
//    *
//    */

//   const createUserAPI = async () => {
//     try {
//       const key = await currentUser.apiKeys.create("apiKeyName");

//       return key;
//     } catch (e) {
//       throw e;
//     }
//   };

//   /**
//    *
//    */

//   const getUserAPIs = async () => {
//     try {
//       const keys = await currentUser.apiKeys.fetchAll();

//       return keys;
//     } catch (e) {
//       throw e;
//     }
//   };

//   /**
//    *
//    */

//   const getUserAPI = async (api) => {
//     try {
//       const key = await currentUser.apiKeys.fetch(api);

//       return key;
//     } catch (e) {
//       throw e;
//     }
//   };

//   /**
//    *
//    */

//   return {
//     user,
//     currentUser,
//     login,
//     logout,
//     createUserAPI,
//     getUserAPIs,
//     getUserAPI,
//   };
// };

// export default client;
