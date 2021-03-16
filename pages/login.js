import formStyles from "../styles/form.module.css";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";

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

console.log(myQuery);

const LoginForm = () => {
  const router = useRouter();
  const [query, setQuery] = useState(null);
  const { loading, error, data } = useQuery(myQuery);
  const { handleSubmit, register } = useForm();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    console.error(error);
    return <div>Error...</div>;
  }

  const changeFormHandler = (event) => {
    setQuery(event.target.value);
  };

  const redirectToHome = (event) => {
    console.log(event);
    router.push("/");
  };

  return (
    <div className={formStyles.form}>
      <form onSubmit={handleSubmit(redirectToHome)}>
        <label>
          Enter user name:
          <input type="text" name="name" ref={register()} />
        </label>
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
