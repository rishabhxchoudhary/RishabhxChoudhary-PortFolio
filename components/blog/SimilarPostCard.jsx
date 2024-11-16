// components/blog/PostCard.js
import React from "react";
import { Card, CardBody, Button, CardFooter, Chip } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";

// const SimilarPostsCard = ({ post }) => {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
//   };

//   return (
//     <Card className="bg-background-dark text-text shadow-lg w-full mb-6 rounded-lg overflow-hidden">
//       {/* Post Image */}
//       {post.coverImage && (
//         <div className="relative h-64 w-full">
//           <Image
//             src={post.coverImage}
//             alt={`Cover image for ${post.title}`}
//             layout="fill"
//             objectFit="cover"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {/* Post Content */}
//       <CardBody className="p-6">
//         <div className="mb-4">
//           <h2 className="text-xs">
//             {post.title}
//           </h2>
//           <p className="text-sm text-text-dark">
//             {formatDate(post.date)}
//           </p>
//         </div>

//         {/* Categories and Tags */}
//         {/* <div className="mb-4 flex flex-wrap gap-2">
//           <Chip
//             color="primary"
//             bordered
//             className="m-1"
//           >
//             {post.category}
//           </Chip>
//           {post.tags.map((tag, index) => (
//             <Chip
//               key={index}
//               color="secondary"
//               bordered
//               className="m-1"
//             >
//               {tag}
//             </Chip>
//           ))}
//         </div> */}

//         {/* Post Description */}
//         {/* <p className="text-text-default tracking-wide leading-relaxed">
//           {post.about}
//         </p> */}
//       </CardBody>

//       {/* Read More Button */}
//       <CardFooter className="p-6">
//         <Link href={`/blog/${post.slug}`} passHref>
//           <Button
//             auto
//             flat
//             color="primary"
//             iconRight={<ChevronRightIcon />}
//             className="w-full text-center"
//           >
//             Read More
//           </Button>
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// };
const SimilarPostsCard = ({ post }) => {
  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <div
      className="snap-center flex-shrink-0 w-full px-4"
      style={{ flex: "0 0 100%" }}
    >
      <Card className="bg-background-dark text-text shadow-lg w-full mb-4 rounded-lg overflow-hidden">
        {/* Post Image */}
        {post.coverImage && (
          <div className="relative h-64 w-full">
            <Image
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <CardBody className="p-1">
          <div className="mb-0 flex flex-col justify-center items-center text-center">
            {" "}
            {/* Added text-center */}
            <h2 className="related font-bold">{post.title}</h2>
            <p className="text-sm text-text-dark">{formatDate(post.date)}</p>
          </div>
        </CardBody>

        {/* Categories and Tags */}
        <div className="mb-1 flex flex-wrap justify-center items-center gap-2">
          {" "}
          {/* Reduced margin */}
          <Chip color="primary" bordered className="m-1">
            {post.category}
          </Chip>
          {post.tags.map((tag, index) => (
            <Chip key={index} color="secondary" bordered className="m-1">
              {tag}
            </Chip>
          ))}
        </div>

        {/* Read More Button */}
        <CardFooter className="p-4 flex-wrap justify-center items-center">
          {" "}
          {/* Reduced padding */}
          <Link href={`/blog/${post.slug}`} passHref>
            <Button
              auto
              flat
              color="primary"
              iconRight={<ChevronRightIcon />}
              className="w-full text-center"
            >
              Read More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
export default SimilarPostsCard;
