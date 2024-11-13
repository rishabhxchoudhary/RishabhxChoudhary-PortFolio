// components/ProfileImage.jsx
import Image from "next/image";
import profilePic from "../public/profile.jpg"; // Replace with your image path

const ProfileImage = () => {
  return (
    <div className="w-40 h-40 md:w-60 md:h-60 relative">
      <Image
        src={profilePic}
        alt="Rishabh Kumar Choudhary"
        className="rounded-full object-cover shadow-3xl"
        layout="fill"
        priority
      />
    </div>
  );
};

export default ProfileImage;
