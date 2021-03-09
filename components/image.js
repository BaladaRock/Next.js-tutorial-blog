import Image from "next/image";
import utilStyles from "../styles/utils.module.css";

const imageText = "Dunarea la Orsova";
const ProfileImage = () => {
  return (
    <Image
      priority
      src="/images/profile_picture.jpg"
      className={utilStyles.borderCircle}
      height={250}
      width={225}
      alt={imageText}
    />
  );
};

export default ProfileImage;
