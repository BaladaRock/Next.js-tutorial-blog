import Head from "next/head";
import ProfileImage from "./image";
import styles from "styles/layout.module.css";
import utilStyles from "styles/utils.module.css";
import Link from "next/link";
import LogOut from "members/components/auth/logout/LogoutButton";
import LogIn from "members/components/auth/login/LoginButton";
import { useAuth } from "members";
import { gql, useQuery } from "@apollo/client";

const Posts = () => {
  const { user } = useAuth();
  const query = gql`
    query($_id: ObjectId!) {
      posts(query: { user: { _id: $_id } }) {
        info {
          title
          created_at
        }
        content
      }
    }
  `;

  const sortedPosts = useQuery(query, {
    variables: { _id: "605cbcca08344a46c9fd84c4" },
  });
  const test = useQuery(query);
  console.log(`The sorted posts list is: ${sortedPosts}`);
  console.log(`Another test for the user object is ${test}`);

  return (
    <ul className={utilStyles.list}>
      <li className={utilStyles.listItem}>
        {/* <div>{sortedPosts.variables}</div> */}
      </li>
      {/* { {sortedPosts.map(({ id, date, title }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <a>{sortedPosts.variables.info.titlet}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={sortedPosts.variables.info.created_at} />
          </small>
        </li>
      ))} } */}
    </ul>
  );
};

export default Posts;
