import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../util/posts";
import utilStyles from "../../styles/utils.module.css";
import { Router, useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import Link from "next/link";

// The plan for renderig a page with each post's content
//  1. Make a dynamic route, named [id], for the template page
//  2. Get the post title from the URL
//  3. Make a call to Mongo, using useQuery hook.
//  4. If the post exists, render its content.
//  5. Otherwise, redirect to 404.

const PostContent = () => {
  const router = useRouter();
  console.log(router);
  const id = router.query.id;

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
  // const { loading, error, data } = useQuery(queries.read, {
  //   variables: {
  //     _id: router.query.id,
  //   },
  // });

  // useEffect(() => {
  //   if (!loading && data.post) {
  //     router.push("/404");
  //   }
  // }, [loading]);

  return <div>Post content</div>;
};

export default PostContent;
// export async function getStaticPaths() {
//   const paths = getAllPostsIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// }

// export default function Post({ postData }) {
//   return (
//     <Layout>
//       <Head>
//         <title>{postData.title}</title>
//       </Head>
//       <article>
//         <h1 className={utilStyles.headingXl}>{postData.title}</h1>
//         <div className={utilStyles.lightText}>
//           <Date dateString={postData.date} />
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//       </article>
//     </Layout>
//   );
// }
