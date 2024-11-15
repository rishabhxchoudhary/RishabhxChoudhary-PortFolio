import { getSortedPostsData } from '../lib/posts';

export default function Sitemap() {
  // This component does not render anything
  return null;
}


// export default function sitemap({allPosts}) {
//     const BASE_URL = "https://www.rishabhxchoudhary.com";

//     allPosts.map((p)=>{
      
//       console.log("<url><loc>",BASE_URL + `/blog/${p.slug}`,"</loc></url>")
//     })

//     return <>
//       Hello
//     </>
//   }
  // export default function sitemap() {
  //   return [
  //     {
  //       url: 'https://acme.com',
  //       lastModified: new Date(),
  //       changeFrequency: 'yearly',
  //       priority: 1,
  //     },
  //     {
  //       url: 'https://acme.com/about',
  //       lastModified: new Date(),
  //       changeFrequency: 'monthly',
  //       priority: 0.8,
  //     },
  //     {
  //       url: 'https://acme.com/blog',
  //       lastModified: new Date(),
  //       changeFrequency: 'weekly',
  //       priority: 0.5,
  //     },
  //   ]
  // }

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
  
    // Return empty props since we've already sent the response
    return {
      props: {},
    };
  }

//   export async function getStaticProps() {
//     const allPosts = getSortedPostsData();
//     return {
//       props: {
//         allPosts
//       },
//     };
// }