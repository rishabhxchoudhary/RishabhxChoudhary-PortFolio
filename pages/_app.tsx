import "@/styles/globals.css";
import "@/styles/blog.css";
import type { AppProps } from "next/app";
import 'katex/dist/katex.min.css';
import { MathJaxContext } from 'better-react-mathjax';

// import { Inter } from '@next/font/google';

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });

export default function App({ Component, pageProps }: AppProps) {
  const mathJaxConfig = {
    loader: { load: ['input/tex', 'output/svg'] },
    tex: {
      inlineMath: [
        ['$', '$'],
      ],
      displayMath: [
        ['$$', '$$'],
      ],
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
    svg: {
      fontCache: 'global',
    },
  };
  return <div >
    <MathJaxContext config={mathJaxConfig}>
      <Component {...pageProps} />
    </MathJaxContext>
  </div>
}
