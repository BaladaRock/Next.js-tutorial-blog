import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import moment from "moment";
import { Router, useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAuth } from "members";

const PostContent = () => {
  const { user } = useAuth();
  const router = useRouter();
  const id = router.query._id;
  console.log(router);
  console.log("This is the post id: ", id);

  const query = gql`
    query($query: PostQueryInput!) {
      posts(query: $query) {
        content
        info {
          title
          created_at
        }
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

        _id: id,
      },
    },
  });

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    if (!loading && !data) {
      router.push("/404");
    } else {
      setPostData(data ? data.posts[0] : null);
    }
  }, [data, loading]);

  console.log("This is the data:", data);
  console.log(
    "This should be the fucking title:",
    data ? data.posts[0].info.title : "Nothing"
  );

  return postData ? (
    <Layout>
      <Head>
        <title>{postData.info.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.info.title}</h1>
        <div className={utilStyles.lightText}>
          <div>{moment(postData.info.created_at).format("LLLL d, yyyy")}</div>
        </div>
        <div> {postData.content}</div>
      </article>
    </Layout>
  ) : (
    <div>Loading</div>
  );
};

export default PostContent;
