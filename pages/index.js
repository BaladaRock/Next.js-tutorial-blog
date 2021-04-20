import Head from "next/head";
import Layout, { siteTitle } from "components/layout";
import Link from "next/link";
import Posts from "components/postsList";
import utilStyles from "styles/utils.module.css";
import formStyles from "styles/form.module.css";
import { gql, useQuery } from "@apollo/client";

import { useAuth } from "members";

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
        <div className={formStyles.content}>
          <form onSubmit={() => null}>
            <div>
              <p>Type something:</p>
            </div>
            <textarea
              className={` ${formStyles.textbox} ${formStyles.scroll} ${formStyles.scroller}`}
            ></textarea>

            <input type="submit" value="Create new post" />
          </form>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <Posts></Posts>
      </section>
    </Layout>
  );
}
