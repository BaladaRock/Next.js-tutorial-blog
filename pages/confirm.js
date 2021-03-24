import Link from "next/link";
import redirectStyles from "styles/redirect.module.css";

const Confirm = () => {
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
