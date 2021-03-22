import { createContext, useContext } from "react";
import client from "./realmClient";

// Create the Realm context.
const RealmContext = createContext();

// Create the Realm provider.
const RealmProvider = ({ appId, children }) => {
  console.log(appId);
  return (
    <RealmContext.Provider value={client({ appId })}>
      {children}
    </RealmContext.Provider>
  );
};

// Create the Realm hook.
const useRealm = () => {
  const context = useContext(RealmContext);

  if (!context) {
    throw new Error(`You must call useRealm() inside of a <RealmProvider />`);
  }

  return context;
};

export { RealmProvider, useRealm };
