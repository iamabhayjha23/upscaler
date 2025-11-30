import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-yellow-50 to-white/80 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5">
            <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center relative">
              <div className="w-4 h-4 bg-white rounded-full absolute"></div>
              <div className="w-1.5 h-1.5 bg-black rounded-full absolute z-10"></div>
            </div>
            <span className="text-lg font-bold text-black">uplers</span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button className="text-gray-700 hover:text-black text-sm font-medium flex items-center gap-1">
              Page <span className="text-xs">▼</span>
            </button>
            <button className="text-gray-700 hover:text-black text-sm font-medium flex items-center gap-1">
              For Companies <span className="text-xs">▼</span>
            </button>
            <button className="text-gray-700 hover:text-black text-sm font-medium flex items-center gap-1">
              For Talent <span className="text-xs">▼</span>
            </button>
            <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">
              AI Recruitment
            </a>
            <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">
              Blogs
            </a>
            <a href="#" className="text-gray-700 hover:text-black text-sm font-medium">
              Pricing
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button className="hidden sm:block px-3.5 py-1.5 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition text-xs md:text-sm">
              Hire a Talent
            </button>
            <button className="px-3.5 py-1.5 bg-black text-white font-semibold rounded hover:bg-gray-800 transition text-xs md:text-sm">
              Find a Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
