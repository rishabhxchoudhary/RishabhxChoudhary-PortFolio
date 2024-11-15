import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="flex justify-center items-center w-40 h-40 md:w-60 md:h-60 relative">
      <Image
        src="/profile.jpg"
        alt="Rishabh Kumar Choudhary"
        className="rounded-full object-cover shadow-3xl"
        priority
        width={150}
        height={150}
      />
    </div>
  );
};

export default ProfileImage;
