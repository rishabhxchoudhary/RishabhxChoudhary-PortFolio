// components/PostCard.js
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post }) => {
  // Custom function to format date in DD-MM-YYYY format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <Card className="bg-background-dark text-text shadow-xl max-w-sm rounded-lg">
      <CardHeader className="justify-between">
        <div className="flex flex-col">
          <h4 className="text-text-light font-semibold leading-none text-lg">
            {post.title}
          </h4>
          <p className="text-text-dark text-sm">
            {formatDate(post.date)}
          </p>
        </div>
        {/* Optional: Add any header icons or actions here */}
      </CardHeader>
      {post.coverImage && (
        <CardBody className="p-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-auto object-cover rounded-t-lg"
          />
        </CardBody>
      )}
      <CardBody>
        <div className="mb-2">
          <Chip
            color="primary"
            bordered
            className="m-1"
          >
            {post.category}
          </Chip>
          {post.tags.map((tag, index) => (
            <Chip
              key={index}
              color="secondary"
              bordered
              className="m-1"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardBody>
        <p className="text-text-default">{post.about}</p>
      </CardBody>
      <CardFooter className="flex justify-between items-center flex-wrap">
        <Link href={`/blog/${post.slug}`} passHref>
          <Button auto flat color="primary">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
