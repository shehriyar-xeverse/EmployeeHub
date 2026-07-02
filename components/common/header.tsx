import Image from 'next/image';
import Link from 'next/link';
import { LogOutButton } from '../dashboard/logOut';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800/80 sticky top-0 z-40 backdrop-blur-xl bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
              <Image
                src="/lo.png"
                alt="Employee Hub Logo"
                width={40}
                height={40}
                className="relative z-10 transition-transform group-hover:scale-110 duration-300"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                Employee Hub
              </h1>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">Management System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <LogOutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;