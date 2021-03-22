import createApolloClient from "./createApolloClient";

let apolloClient;

const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return _apolloClient;
  return apolloClient ?? _apolloClient;
};

export default initializeApollo;
