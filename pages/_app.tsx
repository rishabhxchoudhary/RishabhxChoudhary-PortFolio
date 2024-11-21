import "@/styles/globals.css";
import "@/styles/blog.css";
import type { AppProps } from "next/app";
import { MathJaxContext } from 'better-react-mathjax';

// import { Inter } from '@next/font/google';

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });

export default function App({ Component, pageProps }: AppProps) {
  const mathJaxConfig = {
    loader: { load: ['input/tex', 'output/chtml'] }, // Changed from 'output/svg' to 'output/chtml'
    tex: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
      tags: 'ams',
      packages: {
        "[+]": [
          "amsmath",
          "amssymb",
          "mathtools",
          "physics",
          "boldsymbol",
          "cancel",
          "commath",
          "esint",
          "mathdots",
          "mhchem",
        ],
      },
    },
    chtml: { // Updated from 'svg' to 'chtml'
      fontCache: 'global',
    },
  };
  return <div >
    <MathJaxContext config={mathJaxConfig}>
      <Component {...pageProps} />
    </MathJaxContext>
  </div>
}
