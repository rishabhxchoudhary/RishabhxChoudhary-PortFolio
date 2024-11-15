// components/Header.js
import Link from "next/link";

const Header = () => (
  <header className="bg-background-dark shadow-md">
    <nav className="container mx-auto flex justify-between items-center py-4">
      <Link
        href="/blog"
        className="text-2xl font-bold text-text-light flex items-center"
      >
        Rishabh&apos;s Blog
      </Link>

      <Link href="/">
          <button
            className="text-text-light flex gap-2 focus:outline-none focus:ring-2 focus:ring-accent rounded"
            aria-label="Toggle Dark Mode">
            Home
          </button>
        </Link>
    </nav>
  </header>
);

export default Header;
