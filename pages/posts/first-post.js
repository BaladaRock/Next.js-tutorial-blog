import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

const Post = () => {
  return (
    <Layout>
      <Head>
        <title>First post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Go back to home</a>
        </Link>
      </h2>
    </Layout>
  );
};

export default Post;
