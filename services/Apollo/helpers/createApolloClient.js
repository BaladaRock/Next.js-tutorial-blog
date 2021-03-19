import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

import getValidAccessToken from "./getValidAccessToken";
//const app_Id = process.env.NEXT_PUBLIC_APP_ID;

const createApolloClient = (app) => {
  const uri = `https://realm.mongodb.com/api/client/v2.0/app/${app.id}/graphql`;

  // A custom fetch handler adds the logged in user's access token to GraphQL requests
  const onFetch = async (uri, options) => {
    // Authenticate annonymously or refresh the user data.
    await getValidAccessToken(app);

    // The handler adds a bearer token Authorization header to the otherwise unchanged request
    options.headers.Authorization = `Bearer ${app.currentUser.accessToken}`;

    return fetch(uri, options);
  };

  // Add server-side support.
  const ssrMode = typeof window === "undefined";

  // Create an Apollo authentication link.
  const link = new HttpLink({
    uri,
    fetch: onFetch,
  });

  // Configure the Apollo in-memory cache.
  const cache = new InMemoryCache({
    Query: {
      fields: {
        allPosts: concatPagination(),
      },
    },
  });

  // Create a new Apollo client.
  return new ApolloClient({ ssrMode, link, cache });
};

export default createApolloClient;
