import formStyles from "styles/form.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "members";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const { handleSubmit, register } = useForm();

  const authenticateAndRedirect = (form) => {
    console.log(form.email, form.password);
    login(form.email, form.password);
    router.push("/");
  };

  return (
    <div className={formStyles.form}>
      <form onSubmit={handleSubmit(authenticateAndRedirect)}>
        <label>
          Enter email:
          <input type="text" name="email" ref={register()} />
        </label>
        <label>
          Enter password:
          <input type="text" name="password" ref={register()} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
