import formStyles from "../styles/form.module.css";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "members";
import Members from "members/provider";
import Providers from "provider";
import { User } from "realm-web";

// Test the ApolloClient <=> database flow
const myQuery = gql`
  query {
    user {
      _id
      created_at
      email
      name
      password
    }
  }
`;

const LoginForm = () => {
  const router = useRouter();
  const { user, login } = useAuth();

  // const [query, setQuery] = useState(null);
  const { loading, error, data } = useQuery(myQuery);
  const { handleSubmit, register } = useForm();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    console.error(error);
    return <div>Error...</div>;
  }

  const authenticateUser = (form) => {
    login(form.email, form.password);
  };

  const redirectToHome = (form) => {
    console.log(form);
    router.push("/");
  };

  return (
    <div className={formStyles.form}>
      {/*<span>{JSON.stringify(query)}</span>*/}
      <form
        onSubmit={
          (handleSubmit(redirectToHome), handleSubmit(authenticateUser))
        }
      >
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
