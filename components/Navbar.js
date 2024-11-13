// components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl font-bold">Rishabh</p>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <li>
            <Link href="#about">
              <p className="hover:text-blue-500">About</p>
            </Link>
          </li>
          <li>
            <Link href="#experience">
              <p className="hover:text-blue-500">Experience</p>
            </Link>
          </li>
          <li>
            <Link href="#projects">
              <p className="hover:text-blue-500">Projects</p>
            </Link>
          </li>
          <li>
            <Link href="#skills">
              <p className="hover:text-blue-500">Skills</p>
            </Link>
          </li>
          <li>
            <Link href="#achievements">
              <p className="hover:text-blue-500">Achievements</p>
            </Link>
          </li>
          <li>
            <Link href="#responsibilities">
              <p className="hover:text-blue-500">Responsibilities</p>
            </Link>
          </li>
          <li>
            <Link href="#contact">
              <p className="hover:text-blue-500">Contact</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
