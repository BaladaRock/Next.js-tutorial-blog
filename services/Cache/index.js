import { createContext, useContext } from "react";
import realmClient from "../Realm/realmClient";

// Create the cache context.
const CacheContext = createContext();

// Create the cache provider.
const CacheProvider = ({ children }) => {
  return (
    <CacheContext.Provider value={realmClient()}>
      {children}
    </CacheContext.Provider>
  );
};

// Create the cache hook.
const useCache = () => {
  const app = useContext(CacheContext);

  if (!app) {
    throw new Error(`You must call useCache() inside of a <CacheProvider />`);
  }

  return app;
};

export { CacheProvider, useCache };
