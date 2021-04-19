import Head from "next/head";
import ProfileImage from "./image";
import styles from "styles/layout.module.css";
import utilStyles from "styles/utils.module.css";
import moment from "moment";
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
  const [sortedPosts, setSortedPosts] = useState(null);

  const query = gql`
    query($query: PostQueryInput!) {
      posts(query: $query) {
        _id
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

  useEffect(() => {
    // do some checking here to ensure data exist
    if (data) {
      // mutate data if you need to
      setSortedPosts(data);
    }
  }, [data]);

  if (loading) return <div>...Loading</div>;

  return (
    user && (
      <ul className={utilStyles.list}>
        {sortedPosts &&
          sortedPosts.posts.map((current) => (
            <li className={utilStyles.listItem} key={current._id}>
              <Link href={`/posts/${current._id}`}>
                <a>{current.info.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <div>
                  {moment(current.info.created_at).format("LLLL d, yyyy")}
                </div>
              </small>
            </li>
          ))}
      </ul>
    )
  );
};

export default Posts;
