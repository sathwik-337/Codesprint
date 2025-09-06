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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-sm ${
        isScrolled ? "bg-black/80 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="relative flex justify-between items-center px-6 py-6 md:py-8 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-white tracking-wide"
        >
          <img src="/Assests/college.png" alt="logo" className="h-10" />
        </Link>

        {/* Desktop NavLinks */}
        <ul className="hidden md:flex flex-1 justify-center space-x-12">
          {navLinks.map(({ id, label, path }) => {
            const isActive =
              path === location.pathname || (path !== "/" && location.hash === path);

            return (
              <li key={id} className="relative group">
                {path.startsWith("/") ? (
                  <Link
                    to={path}
                    className={`cursor-pointer text-lg font-medium transition-colors ${
                      isActive
                        ? "text-red-500 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-500"
                        : "text-white hover:text-red-500"
                    }`}
                  >
                    {label}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    )}
                  </Link>
                ) : (
                  <a
                    href={path}
                    className="cursor-pointer text-lg text-white hover:text-red-500 transition-colors"
                  >
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white z-50" onClick={toggleMenu}>
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
