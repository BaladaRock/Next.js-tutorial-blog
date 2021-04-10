import formStyles from "styles/form.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "members";

const SignUpForm = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const { user, login, signup, confirm } = useAuth();

  const signUpAndRedirect = (form) => {
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
