// src/components/layout/Navigation.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Projects', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full bg-[#FFF5F6]/95 backdrop-blur-sm z-50 border-b-2 border-[#FFC0CB]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col h-32">
          <div className="flex justify-center items-center flex-grow mt-4">
            <button 
              onClick={() => router.push('/admin/login')}
              className="flex flex-col items-center group border-none bg-transparent"
            >
              <span className="text-[#8B0023] text-3xl font-medium font-sans">
                lovechinagirl
              </span>
              <span className="font-cursive text-gray-600 text-xl">
                design
              </span>
            </button>
          </div>

          <div className="hidden md:flex justify-center space-x-12 pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative group px-4 py-2 text-lg font-medium transition-colors duration-200
                  ${router.pathname === item.href
                    ? 'text-[#8B0023]'
                    : 'text-gray-600 hover:text-[#8B0023]'
                  }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFC0CB] transform scale-x-0 
                               transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            ))}
          </div>

          <div className="md:hidden absolute right-4 top-8">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#8B0023] p-2"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#FFF5F6]/95 backdrop-blur-sm border-b-2 border-[#FFC0CB]">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  router.pathname === item.href
                    ? 'text-[#8B0023]'
                    : 'text-gray-600 hover:text-[#8B0023]'
                } block px-4 py-3 text-lg font-medium border-l-4 border-transparent
                  hover:border-[#FFC0CB] transition-all duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;