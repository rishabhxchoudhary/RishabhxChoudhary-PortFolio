// components/blog/PostCard.js
import React from "react";
import { Card, CardBody, Button, CardFooter, Chip } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Card className="bg-background-dark text-text shadow-lg w-full mb-6 rounded-lg overflow-hidden">
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
      <CardBody className="p-6">
        <div className="mb-4">
          <Link href={`/blog/${post.slug}`} passHref>
            <h2 className="text-2xl font-semibold text-text-light mb-2">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-text-dark">{formatDate(post.date)}</p>
        </div>

        {/* Categories and Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Chip color="primary" bordered className="m-1">
            {post.category}
          </Chip>
          {post.tags.map((tag, index) => (
            <Chip key={index} color="secondary" bordered className="m-1">
              {tag}
            </Chip>
          ))}
        </div>

        {/* Post Description */}
        <p className="text-text-default tracking-wide leading-relaxed">
          {post.about}
        </p>
      </CardBody>

      {/* Read More Button */}
      <CardFooter className="p-6">
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
  );
};

export default PostCard;
