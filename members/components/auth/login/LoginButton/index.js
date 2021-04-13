import { useRouter } from "next/router";

const LoginButton = ({ children }) => {
  const router = useRouter();

  const onLogin = () => {
    router.push("/login");
  };

  return children ? (
    <span onClick={onLogin}>{children}</span>
  ) : (
    <button onClick={onLogin}>Log in</button>
  );
};

export default LoginButton;
