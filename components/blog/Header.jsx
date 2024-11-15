// components/Header.js
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const Header = () => (
  <header className="bg-background-dark shadow-md">
    <nav className="container mx-auto flex justify-between items-center py-4">
      <Link href="/" className="text-primary text-lg font-bold">
        My Blog
      </Link>
      <div className="flex space-x-4">
        <Link href="/" passHref>
          <Button auto flat color="primary">
            Home
          </Button>
        </Link>
        <Link href="/blog" passHref>
          <Button auto flat color="secondary">
            Blog
          </Button>
        </Link>
        {/* Add more navigation buttons as needed */}
      </div>
    </nav>
  </header>
);

export default Header;
