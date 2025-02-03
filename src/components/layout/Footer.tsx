import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#FFF5F6] border-t border-[#FFC0CB]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-[#8B0023] font-semibold mb-4">About Us</h3>
          <p className="text-gray-600">Creating beautiful spaces with a blend of modern design and Chinese aesthetics.</p>
        </div>
        
        <div>
          <h3 className="text-[#8B0023] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/portfolio" className="text-gray-600 hover:text-[#8B0023]">Portfolio</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-[#8B0023]">Contact</Link></li>
          </ul>
        </div>
        

        
        <div>
          <h3 className="text-[#8B0023] font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="text-gray-600">Email: info@lovechinagirl.design</li>
            <li className="text-gray-600">Tel: (555) 123-4567</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-[#FFC0CB]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          © {new Date().getFullYear()} lovechinagirl Design. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;