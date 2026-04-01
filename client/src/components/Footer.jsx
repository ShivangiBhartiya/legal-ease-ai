import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M3 6l9-3 9 3M3 6v12l9 3 9-3V6M12 3v18" />
          </svg>
          <span className="font-serif font-bold text-gray-900 text-sm">Legal case</span>
        </div>

        {/* Legal links */}
        <div className="flex items-center gap-5 text-xs text-gray-400">
          <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
        </div>

        {/* Copyright + disclaimer */}
        <p className="text-xs text-gray-300 text-center sm:text-right">
          © {new Date().getFullYear()} Legal case.&nbsp;
          <span className="text-gray-300">Not legal advice.</span>
        </p>
      </div>
    </footer>
  );
}