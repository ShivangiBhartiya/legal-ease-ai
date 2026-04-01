export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-serif font-bold text-gray-900">Legal case</span>
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} Legal case. Not legal advice.</p>
      </div>
    </footer>
  );
}