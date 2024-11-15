// components/PostCard.js
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post }) => {
  return (
    <Card className="bg-background-dark text-text shadow-3xl max-w-sm">
      <CardHeader className="justify-between">
        <div className="flex flex-col">
          <h4 className="text-text-light font-semibold leading-none text-lg">
            {post.title}
          </h4>
          <p className="text-text-dark text-sm">
            {new Date(post.date).toLocaleDateString("en-US")}
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
            className="w-full h-auto object-cover"
          />
        </CardBody>
      )}
      <CardBody>
        <p className="text-text-default">{post.excerpt}</p>
      </CardBody>
      <CardFooter className="justify-end">
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
