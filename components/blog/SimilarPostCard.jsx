// components/blog/PostCard.js
import React from "react";
import { Card, CardBody, Button, CardFooter, Chip } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const SimilarPostsCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <Card className="bg-background-dark text-text shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Post Image */}
      {post.coverImage && (
        <div className="relative h-48 w-full">
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
      <CardBody className="p-4">
        <div className="mb-3">
          <span className="text-lg font-semibold text-text">{post.title}</span>
          <p className="text-sm text-text-dark">
            {formatDate(post.date)}
          </p>

        </div>

        {/* Optional: Categories and Tags */}
        
        <div className="mb-4 flex flex-wrap gap-2">
          <Chip
            color="secondary"
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
        
        <p className="text-text-default tracking-wide leading-relaxed">
        {post.about.length > 100 ? `${post.about.slice(0, 100)}...` : post.about}
      </p>
       
      </CardBody>

      {/* Read More Button */}
      <CardFooter className="p-4">
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

export default SimilarPostsCard;
