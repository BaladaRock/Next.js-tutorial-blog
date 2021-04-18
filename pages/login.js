import formStyles from "styles/form.module.css";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "members";
import Members from "members/provider";
import Providers from "provider";
import { User } from "realm-web";
import { Token } from "graphql";
import { useRealm } from "services";

const LoginForm = () => {
  const router = useRouter();
  const { credentials } = useRealm();
  const { user, login } = useAuth();

  const { handleSubmit, register } = useForm();

  const authenticateAndRedirect = (form) => {
    login(form.email, form.password);
    router.push("/");
  };

  // Format date
  // const date = new Date("2020-01-02");
  // const moment = require("moment");
  // console.log(moment(date).format());
  return (
    <div className={formStyles.form}>
      <form onSubmit={handleSubmit(authenticateAndRedirect)}>
        <label>
          Enter email:
          <input type="text" name="email" ref={register()} />
        </label>
        <label>
          Enter password:
          <input type="text" name="password" ref={register()} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
