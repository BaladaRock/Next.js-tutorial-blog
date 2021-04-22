import Head from "next/head";
import Layout, { siteTitle } from "components/layout";
import Link from "next/link";
import Posts from "components/postsList";
import utilStyles from "styles/utils.module.css";
import formStyles from "styles/form.module.css";
import moment from "moment";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAuth } from "members";
import { useRealm } from "services/Realm";
import { useForm } from "react-hook-form";

const Home = ({ sortedPosts }) => {
  const { user } = useAuth();
  const { app, credentials } = useRealm();
  console.log("The user: ", user);
  console.log("Date test", moment().format("LLLL d, yyyy"));
  const { handleSubmit, control, register } = useForm();

  const CREATE_POST = gql`
    mutation insertOnePost($data: PostInsertInput!) {
      insertOnePost(data: $data) {
        _id
        info {
          created_at
          title
        }
        content
        user {
          _id
        }
      }
    }
  `;
  const [addNewPost, { loading }] = useMutation(CREATE_POST);

  const newPostHandler = (form) => {
    const formTitle = form.title;
    const formContent = form.content;

    addNewPost({
      variables: {
        data: {
          info: {
            title: formTitle,
            created_at: moment().toDate(),
          },
          content: formContent,
        },
      },
    });
  };

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
          <form onSubmit={handleSubmit(newPostHandler)}>
            <input
              className={formStyles.title}
              type="text"
              name="title"
              ref={register()}
              placeholder="Enter post title"
            />
            <div>
              <p>Type something:</p>
            </div>
            <textarea
              className={` ${formStyles.textbox} ${formStyles.scroll} ${formStyles.scroller}`}
              name="content"
              ref={register()}
              control={control}
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
};

export default Home;
