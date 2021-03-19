import { AuthProvider } from "../services/auth";

const Members = ({ args, children }) => <AuthProvider>{children}</AuthProvider>;

export default Members;
