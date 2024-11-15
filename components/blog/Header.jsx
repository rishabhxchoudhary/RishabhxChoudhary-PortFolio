// components/Header.js
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to the blog page with the search query
    router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="bg-background-dark shadow-md">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link
          href="/blog"
          className="text-2xl font-bold text-text-light flex items-center"
        >
          Rishabh&apos;s Blog
        </Link>

        <div className="flex items-center">
          <Link href="/">
            <button type="submit" className="ml-2 px-2 py-1 bg-accent text-white rounded">
              Home
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
