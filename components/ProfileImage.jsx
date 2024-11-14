import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="w-40 h-40 md:w-60 md:h-60 relative">
      <Image
        src="/profile.jpg"
        alt="Rishabh Kumar Choudhary"
        className="rounded-full object-cover shadow-3xl"
        layout="fill"
        priority
      />
    </div>
  );
};

export default ProfileImage;
