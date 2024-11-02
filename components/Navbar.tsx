"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand/Logo */}
        <Link href="/" className={styles.navBrand}>
          Pantheon Client
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 