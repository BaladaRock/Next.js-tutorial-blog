import { unset } from "lodash";

const sanitizeUserData = (data) => {
  let user = {
    ...data._profile.data,
    ...data.customData,
  };

  // Convert the "email_verified" value to boolean.
  //user.email_verified = Boolean(data._profile.data.email_verified);

  // Remove the "user" key used to match custom profiles.
  unset(user, "user");

  // Return the formatted user object.
  return user;
};

export default sanitizeUserData;
