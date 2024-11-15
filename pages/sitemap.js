import { getSortedPostsData } from '../lib/posts';

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
    const BASE_URL = "https://www.rishabhxchoudhary.com";
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const allPosts = getSortedPostsData();

    allPosts.map((p)=>{
      sitemap += `
      <url>
         <loc>${BASE_URL + `/blog/${p.slug}`}</loc>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      `
    })
    sitemap += `</urlset>`
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  }