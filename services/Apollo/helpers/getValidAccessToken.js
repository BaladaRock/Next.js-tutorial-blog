import * as Realm from "realm-web";

const getValidAccessToken = async (app) => {
  if (!app.currentUser) {
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    await app.currentUser.refreshCustomData();
  }

  return app.currentUser.accessToken;
};

export default getValidAccessToken;
