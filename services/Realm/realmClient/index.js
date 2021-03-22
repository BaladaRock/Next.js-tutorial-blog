import { useState, useEffect } from "react";
import * as Realm from "realm-web";

const realmClient = () => {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  const [app, setApp] = useState(new Realm.App(appId));

  // Update the app if the appId changes.
  useEffect(() => {
    setApp(new Realm.App(appId));
  }, [appId]);

  // Generate auth credentials for the Realm app.
  const credentials = async (email, password) => {
    return Realm.Credentials.emailPassword(email, password);
  };

  return {
    app,
    credentials,
  };
};

export default realmClient;
