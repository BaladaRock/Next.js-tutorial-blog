import Head from "next/head";
import Layout, { siteTitle } from "components/layout";
import Link from "next/link";
import Posts from "components/postsList";
import utilStyles from "../styles/utils.module.css";
import { gql, useQuery } from "@apollo/client";

// use posts object by importing the function which
// reads posts content from their files
import { useAuth } from "members";
// import { getSortedPostsData } from "../util/posts";

// export async function getStaticProps() {
//   const sortedPosts = getSortedPostsData();
//   return {
//     props: {
//       sortedPosts,
//     },
//   };
// }

export default function Home({ sortedPosts }) {
  const { user } = useAuth();
  console.log(user);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Andrei! Here is my first Next.js sample app.</p>
        <p>
          Click here to go to the tutorial's main page{" "}
          <a href="https://nextjs.org/learn">Next.js tutorial</a>.
        </p>
      </section>
      {
        // The following section renders all the posts data.
        // It also uses the NextJS "Link" component to connect each post with the home page.
      }
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <Posts></Posts>
      </section>
    </Layout>
  );
}
