import { getSortedPostsData } from '../lib/posts';

export default function sitemap({allPosts}) {
    const BASE_URL = "https://www.rishabhxchoudhary.com";

    allPosts.map((p)=>{
      
      console.log("<url><loc>",BASE_URL + `/blog/${p.slug}`,"</loc></url>")
    })

    return <>
      Hello
    </>
  }

  export async function getStaticProps() {
    const allPosts = getSortedPostsData();
    return {
      props: {
        allPosts
      },
    };
}