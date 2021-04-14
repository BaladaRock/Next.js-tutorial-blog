import { useAuth } from "members";

const LogoutButton = ({ children }) => {
  const { logout, user } = useAuth();

  const onLogout = () => {
    logout();
    console.log(`After logging in: ${user}`);
  };

  return children ? (
    <span onClick={onLogout}>{children}</span>
  ) : (
    <button onClick={onLogout}>Log out</button>
  );
};

export default LogoutButton;
