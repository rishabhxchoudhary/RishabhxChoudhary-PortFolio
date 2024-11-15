import Layout from '../../components/blog/Layout';
import PostCard from '../../components/blog/PostCard';
import { getSortedPostsData } from '../../lib/posts';

const Blog = ({ allPosts }) => (
  <Layout>
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {allPosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  </Layout>
)


export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts
    },
  };
}

export default Blog;
