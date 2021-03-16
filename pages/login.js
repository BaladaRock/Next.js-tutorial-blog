import formStyles from "../styles/form.module.css";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

// Test the apolloclient <=> database flow
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
  const [query, setQuery] = useState(null);
  const { loading, error, data } = useQuery(myQuery);

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

  return (
    <div className={formStyles.form}>
      <form>
        <label>
          Enter user name:
          <input
            type="text"
            name="name"
            onLoad={changeFormHandler}
            value={query}
          />
        </label>
        Enter password:
        <input type="text" name="name" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginForm;
