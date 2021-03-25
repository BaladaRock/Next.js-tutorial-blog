import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "members";
import redirectStyles from "styles/redirect.module.css";

const Confirm = () => {
  const router = useRouter();
  const { confirm } = useAuth();
  const onConfirm = async (token, tokenId) => {
    try {
      await confirm(token, tokenId);

      router.push("/login");
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    const token = router.query.token;
    const tokenId = router.query.tokenId;
    if (token && tokenId) {
      onConfirm(token, tokenId);
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
