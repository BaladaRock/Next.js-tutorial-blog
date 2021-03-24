import formStyles from "styles/form.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import { Router, useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "members";
import Members from "members/provider";
import Providers from "provider";
import { User } from "realm-web";

const SignUpForm = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const { user, login, signup, confirm } = useAuth();

  //   const createQuery = gql`
  //     mutation insertOneUser($data: UserInsertInput!) {
  //       insertOneUser(data: $data) {
  //         _id
  //         name
  //         email
  //         user_id
  //       }
  //     }
  //   `;

  //   const [insertOneUser] = useMutation(createQuery);

  //   const createNewRealmUser = (name, email, password) => {
  //     const createQuery = gql`
  //       mutation insertOneUser($data: UserInsertInput!) {
  //         insertOneUser(data: $data) {
  //           _id
  //           name
  //           email
  //           user_id
  //         }
  //       }
  //     `;

  //     useMutation(createQuery);

  //   };
  const signUpAndRedirect = async (form) => {
    signup(form.email, form.password);
    router.push("/");
  };

  return (
    <div className={formStyles.form}>
      <form onSubmit={handleSubmit(signUpAndRedirect)}>
        <label>
          User name:
          <input type="text" name="name" ref={register()} />
        </label>
        <label>
          User email:
          <input type="text" name="email" ref={register()} />
        </label>
        <label>
          Choose password:
          <input type="text" name="password" ref={register()} />
        </label>
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default SignUpForm;
