import { AuthProvider } from "../services/auth";
import { requireAuth } from "../services/auth";

const Members = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export default Members;
