import Head from "next/head";
import ProfileImage from "./image";
import styles from "styles/layout.module.css";
import utilStyles from "styles/utils.module.css";
import Link from "next/link";
import LogOut from "members/components/auth/logout/LogoutButton";
import LogIn from "members/components/auth/login/LoginButton";
import { useAuth } from "members";
import { gql, useQuery } from "@apollo/client";
import { useRealm } from "services/Realm";
import { useEffect, useMemo, useState } from "react";

const Posts = () => {
  const { user } = useAuth();
  const { app } = useRealm();

  const query = gql`
    query($query: PostQueryInput!) {
      posts(query: $query) {
        info {
          title
          created_at
        }
        content
      }
    }
  `;

  const { loading, data, error } = useQuery(query, {
    variables: {
      skip: !user,
      query: {
        user: {
          id: user && user._id,
        },
      },
    },
  });

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // do some checking here to ensure data exist
    if (data) {
      // mutate data if you need to
      setPosts(data);
    }
  }, [data]);

  if (loading) return <div>...Loading</div>;
  if (error) {
    console.log(error);
    return <div>Some error occurred</div>;
  }

  console.log(`Current user id is: ${app.currentUser.id}`);
  console.log(`The current user is:  ${JSON.stringify(app.currentUser)}`);
  console.log(`The sorted posts list is: `, posts);

  return (
    <ul className={utilStyles.list}>
      <div>{JSON.stringify(posts)}</div>
      {/* {posts.map(({ id, date, title }) => (
        <li className={utilStyles.listItem} key={id}>
          <Link href={`/posts/${id}`}>
            <a>{posts.variables.info.titlet}</a>
          </Link>
          <br />
          <small className={utilStyles.lightText}>
            <Date dateString={posts.variables.info.created_at} />
          </small>
        </li>
      ))} */}
    </ul>
  );
};

export default Posts;
