import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="w-40 h-40 md:w-60 md:h-60 relative">
      <Image
        src="/profile.jpg"
        alt="Rishabh Kumar Choudhary"
        className="rounded-full object-cover shadow-3xl"
        priority
        width={70}
        height={70}
      />
    </div>
  );
};

export default ProfileImage;
