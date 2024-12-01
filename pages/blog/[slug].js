// pages/blog/[slug].js
import React, { useEffect, useState } from "react"; // Ensure React is imported
import Link from 'next/link';
import Layout from '../../components/blog/Layout';
import { getAllPostSlugs, getPostData, getSortedPostsData } from '../../lib/posts';
import Head from 'next/head';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { format } from 'date-fns';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import SocialShare from '../../components/blog/SocialShare'; // Import SocialShare component
import SimilarPostsCard from "../../components/blog/SimilarPostCard";
import axios from "axios";

const Post = ({ postData, similarPosts }) => {
   const [views, setViews] = useState(0);

  useEffect(()=>{
    async function getViews() {
      const res = await axios.post("/api/register",{
        slug: postData.slug
      });
      setViews(res.data.views);
    };

    getViews();
  },[postData.slug])

  useEffect(() => {
    // Highlight.js for code blocks
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });

    // Code block copy functionality
    const codeBlocks = document.querySelectorAll('pre > code');
    codeBlocks.forEach((codeBlock) => {
      if (codeBlock.parentElement.querySelector(".copy-button")) return;

      const copyButton = document.createElement("button");
      copyButton.innerText = "Copy";
      copyButton.className =
        "absolute top-2 right-2 bg-background-dark text-text-default px-2 py-1 rounded text-sm hover:bg-primary-light";

      codeBlock.parentElement.style.position = "relative";

      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          copyButton.innerText = "Copied!";
          setTimeout(() => {
            copyButton.innerText = "Copy";
          }, 2000);
        });
      });
      codeBlock.parentElement.appendChild(copyButton);
    });
  }, [postData.contentHtml,similarPosts]);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.excerpt} />

        {/* Essential Meta Tags */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.excerpt} />
        <meta property="og:image" content={postData.coverImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.excerpt} />
        <meta name="twitter:image" content={postData.coverImage} />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <article className="mx-auto max-w-3xl blog">
        <h1 className="text-text-light text-4xl font-bold my-4">
          {postData.title}
        </h1>
        <p className="text-text-dark text-sm mb-4">
          Written on {format(new Date(postData.date), "MMMM dd, yyyy")}
        </p>
        <p className="text-text-dark text-sm mb-4">Views : {views == 0 ? "Loading..." : views}</p>
        {postData.coverImage && (
          <div className="relative w-full h-96 mb-6">
            <Image
              src={postData.coverImage}
              alt={postData.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div
          className="prose prose-lg prose-primary dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        {/* Social Sharing Buttons */}
        <div className="text-text my-12"><h2 className="text-2xl font-semibold mb-6">Share this blog</h2> </div>
        <SocialShare url={currentUrl} title={postData.title} />

        {similarPosts && similarPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similarPosts.map((post) => (
                <SimilarPostsCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog Button */}
        <div className="mt-8 flex justify-end">
          <Link href="/blog" passHref>
            <Button auto flat color="secondary">
              Back to Blog
            </Button>
          </Link>
        </div>
      </article>

    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData();
  const postData = await getPostData(params.slug);

  function calculateSimilarityScore(post1, post2) {
    let score = 0;
    if (post1.category === post2.category) {
      score += 10;
    }
    const sharedTags = post1.tags.filter((tag) => post2.tags.includes(tag));
    score += sharedTags.length * 3; // Each tag match adds 3 points
    return score;
  }

  function findSimilarPosts(postData, allPostsData, maxResults = 10) {
    const scores = allPostsData.map((post) => ({
      post: post,
      score: calculateSimilarityScore(postData, post),
    }));
    scores.sort((a, b) => b.score - a.score);
    return scores
      .filter((item) => item.post.slug !== postData.slug)
      .slice(0, maxResults)
      .map((item) => item.post);
  }

  const similarPosts = findSimilarPosts(postData, allPostsData);
  return {
    props: {
      postData,
      similarPosts,
    },
  };
}

export default Post;
