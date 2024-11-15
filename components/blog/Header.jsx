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
    </nav>
  </header>
);

export default Header;
