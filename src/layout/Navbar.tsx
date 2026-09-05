import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

const navItems = [
    "Home",
    "TV Shows",
    "Movies",
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-gradient-to-b from-black/95 via-black/90 to-black/80">
      <div className="flex h-full items-center px-[4%]">
            {/* Logo goes here */}
            <div className="mr-10 shrink-0">
                <span className="cursor-default font-sans text-[26px] font-black tracking-[-1.5px] text-[#e50914]">
                    LOGO
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
            <button
                aria-label="Search"
                className="cursor-pointer transition-opacity hover:opacity-70"
            >
                <Search size={23} strokeWidth={2} />
          </button>

          {/*
            PROBABLT WONT BE NEEDING THESE
                
            NOTIFICATIONS
            <button
                aria-label="Notifications"
                className="transition-opacity hover:opacity-70"
            >
                <Bell size={21} strokeWidth={2} />
            </button>

            PROFILE ICON
            <button className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-[3px] bg-[#20c997]">
                <span className="text-[17px]">☺</span>
                </div>

                <ChevronDown
                size={14}
                className="text-white transition-transform group-hover:rotate-180"
                />
            </button> */}
            </div>
        </div>
    </header>
  );
}
