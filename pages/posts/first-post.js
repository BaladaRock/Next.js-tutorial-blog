import Link from "next/link";

const FirstPost = () => {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Go back to home</a>
        </Link>
      </h2>
    </>
  );
};

export default FirstPost;
