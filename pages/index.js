import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

const Home = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi! This is Andrei! Here is my first Next.js sample app.</p>
        <p>
          Click here to go to the tutorial's main page{" "}
          <a href="https://nextjs.org/learn">Next.js tutorial</a>.
        </p>
      </section>
    </Layout>
  );
};

export default Home;
