import { Link } from 'react-router-dom';
import { FiArrowUp, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#222] text-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <img src="/10_year_logo.png" alt="Eco Club Logo" className="w-12 h-12" />
              <span className="text-2xl font-bold">Eco Club NITS</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              The Eco Club at National Institute of Technology Silchar is dedicated to promoting 
              environmental awareness and sustainable practices through various initiatives, events, 
              and community engagement.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMapPin className="w-5 h-5 text-[#3FAE5C]" />
                <span>NIT Silchar, Assam, India</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="w-5 h-5 text-[#3FAE5C]" />
                <span>ecoclub@nits.ac.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Noixorgo', 'Events', 'Blog', 'Gallery', 'Team', 'Help Us'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : item === 'Help Us' ? '/help-us' : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#3FAE5C] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/eco_club_nits"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3FAE5C]/20 rounded-full flex items-center justify-center hover:bg-[#3FAE5C] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/nitsecoclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#3FAE5C]/20 rounded-full flex items-center justify-center hover:bg-[#3FAE5C] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
             
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 NITS Eco Club. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 bg-[#3FAE5C] rounded-full flex items-center justify-center hover:bg-[#359a4f] transition-colors"
            aria-label="Back to top"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}