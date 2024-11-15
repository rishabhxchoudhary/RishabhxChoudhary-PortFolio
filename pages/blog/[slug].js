// pages/blog/[slug].js
import Link from 'next/link';
import Layout from '../../components/blog/Layout';
import { getAllPostSlugs, getPostData } from '../../lib/posts';
import Head from 'next/head';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { format } from 'date-fns';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; 
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import ReactMarkdown from 'react-markdown';

const Post = ({ postData }) => {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });

    // Your existing code block copy functionality
    const codeBlocks = document.querySelectorAll('pre > code');
    codeBlocks.forEach((codeBlock) => {
      if (codeBlock.parentElement.querySelector('.copy-button')) return;

      const copyButton = document.createElement('button');
      copyButton.innerText = 'Copy';
      copyButton.className =
        'absolute top-2 right-2 bg-background-dark text-text-default px-2 py-1 rounded text-sm hover:bg-background-dark';

      codeBlock.parentElement.style.position = 'relative';

      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          copyButton.innerText = 'Copied!';
          setTimeout(() => {
            copyButton.innerText = 'Copy';
          }, 2000);
        });
      });
      codeBlock.parentElement.appendChild(copyButton);
    });
  }, [postData.contentHtml]);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$']],
          displayMath: [['$$', '$$']],
          processEscapes: true,
          tags: 'ams'
        },
        svg: {
          fontCache: 'global'
        }
      };
    `;
    document.head.appendChild(script);

    const scriptSrc = document.createElement('script');
    scriptSrc.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    scriptSrc.async = true;
    document.body.appendChild(scriptSrc);

    return () => {
      document.body.removeChild(scriptSrc);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.excerpt} />
      </Head>
      <article className="mx-auto max-w-3xl blog">
        <h1 className="text-text-light">{postData.title}</h1>
        <p className="text-text-dark text-sm">{format(new Date(postData.date), 'MM/dd/yyyy')}</p>
        {postData.coverImage && (
          <Image
            src={postData.coverImage}
            alt={postData.title}
            width={800}
            height={400}
            className="rounded-md my-4"
          />
        )}
        <div
          className="prose prose-lg prose-primary"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
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
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

export default Post;
