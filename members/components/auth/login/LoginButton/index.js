import { useAuth } from "members";

const LoginButton = ({ children }) => {
  const { login } = useAuth();

  const onLogin = () => {
    login();
  };

  return children ? (
    <span onClick={onLogin}>{children}</span>
  ) : (
    <button onClick={onLogin}>Log in</button>
  );
};

export default LoginButton;
