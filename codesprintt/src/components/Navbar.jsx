import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "register", label: "Register", path: "/register" },
    { id: "brochure", label: "Brochure", path: "#brochure" },
    { id: "contact", label: "Contact", path: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="relative flex justify-between items-center px-6 py-6 md:py-8">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
          CODESPRINT
        </Link>

        {/* Desktop NavLinks */}
        <ul className="hidden md:flex flex-1 justify-center space-x-12">
          {navLinks.map((link) => (
            <li key={link.id}>
              {link.path.startsWith("/") ? (
                <Link
                  to={link.path}
                  className={`cursor-pointer text-lg transition-colors ${
                    link.label === "Register"
                      ? "px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                      : "text-white hover:text-red-500"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.path}
                  className="cursor-pointer text-lg text-white hover:text-red-500 transition-colors"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white z-50"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-black/95 flex flex-col justify-center items-center space-y-8">
            {navLinks.map((link) =>
              link.path.startsWith("/") ? (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl ${
                    link.label === "Register"
                      ? "px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700"
                      : "text-white hover:text-red-500"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.id}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-white hover:text-red-500"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
