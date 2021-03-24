import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "members";
import redirectStyles from "styles/redirect.module.css";

const Confirm = () => {
  const router = useRouter();
  const { confirm, login } = useAuth();
  useEffect(() => {
    const token = router.query.token;
    const tokenId = router.query.tokenId;

    if (token && tokenId) {
      confirm(token, tokenId);
      login;
    }
  }, [router]);

  return (
    <div className={redirectStyles.message}>
      <h2>
        Thank you for confirming your email. Your profile was successfully
        activated.
      </h2>
      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </div>
  );
};

export default Confirm;
