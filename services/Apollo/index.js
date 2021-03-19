import { useState, useEffect } from "react";
import { useRealm } from "../Realm";
import { ApolloProvider as ApolloProviderClient } from "@apollo/client";

import createApolloClient from "./helpers/createApolloClient";

const ApolloProvider = ({ apollo, children }) => {
  const { app } = useRealm();
  const [client, setClient] = useState(createApolloClient(app));

  useEffect(() => {
    const instance = client ?? createApolloClient(app);

    // Add support for query & data caching.
    if (apollo) {
      instance.cache.restore({
        ...instance.extract(),
        ...apollo,
      });
    }

    // For SSG and SSR always create a new Apollo Client.
    if (typeof window === "undefined") return instance;

    // Create the Apollo Client once in the client/
    setClient(instance);

    // Clear up the client.
    return () => setClient();
  }, [apollo]);

  return (
    <ApolloProviderClient client={client}>{children}</ApolloProviderClient>
  );
};

export { ApolloProvider };
