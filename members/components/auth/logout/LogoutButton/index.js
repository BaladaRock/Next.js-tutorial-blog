import { useAuth } from '@destacked/members';

const LogoutButton = ({ children }) => {
    const { logout } = useAuth();

    const onLogout = () => {
        logout({ returnTo: window.location.origin });
    };

    return children ? (
        <span onClick={onLogout}>{children}</span>
    ) : (
        <button onClick={onLogout}>Log out</button>
    );
};

export default LogoutButton;
