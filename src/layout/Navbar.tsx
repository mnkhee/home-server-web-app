import { useState } from "react";
import {
  Search,
  X,
} from "lucide-react";

const navItems = [
  "Home",
  "TV Shows",
  "Movies",
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-gradient-to-b from-black/95 via-black/90 to-black/80">
      <div className="flex h-full items-center px-[4%]">

        {/* Logo */}
        <div className="mr-10 shrink-0">
          <span className="cursor-default font-sans text-[26px] font-black tracking-[-1.5px] text-[#e50914]">
            notflix
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`whitespace-nowrap text-[13px] transition-colors ${
                index === 0
                  ? "font-semibold text-white"
                  : "font-normal text-[#b3b3b3] hover:text-[#e5e5e5]"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-5 text-white">

          {/* Search */}
          <div className="flex items-center">

            {/* Animated Search Box */}
            <div
              className={`mr-2 flex items-center overflow-hidden border border-white/50 bg-black/80 transition-all duration-300 ease-in-out ${
                isSearchOpen
                  ? "w-48 opacity-100"
                  : "w-0 border-transparent opacity-0"
              }`}
            >
              <input
                autoFocus={isSearchOpen}
                type="text"
                placeholder="Search..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-400"
              />

              {/* Close */}
              <button
                aria-label="Close search"
                onClick={() => setIsSearchOpen(false)}
                className={`mr-2 shrink-0 cursor-pointer text-white transition-opacity duration-200 hover:opacity-70 ${
                  isSearchOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Search Button */}
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              <Search size={23} strokeWidth={2} />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
