import { useMemo } from "react";
import * as Realm from "realm-web";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const app_Id = process.env.NEXT_PUBLIC_APP_ID;
let apolloClient;

// Connect to your MongoDB Realm app
const app = new Realm.App(app_Id);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}

const createApolloClient = () => {
  const realmEndpointURI = `https://realm.mongodb.com/api/client/v2.0/app/${app_Id}/graphql`;
  console.log(realmEndpointURI);
  // A custom fetch handler adds the logged in user's access token to GraphQL requests
  const onFetch = async (uri, options) => {
    const accessToken = await getValidAccessToken();
    options.headers.Authorization = `Bearer ${accessToken}`;
    return fetch(uri, options);
  };

  // Add server-side support.
  const ssrMode = typeof window === "undefined";

  // Create an Apollo authentication link.
  const link = new HttpLink({
    uri: realmEndpointURI,
    fetch: onFetch,
  });

  const cache = new InMemoryCache();

  // Create a new Apollo client.
  return new ApolloClient({ ssrMode, link, cache });
};

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export default function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
