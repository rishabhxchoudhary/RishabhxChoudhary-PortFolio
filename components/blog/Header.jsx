// components/Header.js
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background-dark shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-2xl font-bold text-text-light flex items-center"
        >
          Rishabh&apos;s Blog
        </Link>

        <div className="flex items-center">
          <Link href="/">
            <button type="button" className="ml-4 px-4 py-2 bg-secondary text-white rounded transition duration-150">
              Home
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
