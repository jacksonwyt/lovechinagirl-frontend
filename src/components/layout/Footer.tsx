// Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-[#FFF5F6] border-t border-[#FFC0CB]">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <div className="mb-8">
          <h3 className="text-[#8B0023] font-semibold mb-4">About</h3>
          <p className="text-gray-600">Creating beautiful spaces.</p>
        </div>

        <div>
          <h3 className="text-[#8B0023] font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="text-gray-600">Email: lovechinagirl@me.com</li>
            <li className="text-gray-600">Tel: (805)-698-1919</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-[#FFC0CB]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          © {new Date().getFullYear()} lovechinagirl All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;