import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-3 items-center">

        {/* Logo */}
        <Link
          to="/"
          className="font-bold font-serif text-lg text-gray-900 hover:text-gray-600 transition-colors justify-self-start flex items-center gap-2"
        >
          {/* Simple gavel/scale icon mark */}
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M3 6l9-3 9 3M3 6v12l9 3 9-3V6M12 3v18" />
          </svg>
          Legal case
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors relative py-1 ${
                pathname === link.to
                  ? "text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.label}
              {/* Active underline */}
              {pathname === link.to && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right slot — CTA on desktop */}
        <div className="hidden md:flex justify-end">
          <Link
            to="/"
            className="text-xs font-semibold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Try for free →
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden justify-self-end p-1 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current rounded transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2 w-5" : "w-5"}`} />
            <span className={`block h-0.5 bg-current rounded transition-all duration-200 ${menuOpen ? "opacity-0 w-3" : "w-3"}`} />
            <span className={`block h-0.5 bg-current rounded transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2 w-5" : "w-5"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                pathname === link.to ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link
              to="/"
              className="block text-center text-xs font-semibold bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try for free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}