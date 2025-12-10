import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer sections data
  const footerSections = [
    {
      title: 'Explore RCI',
      links: [
        { label: 'About RCI', path: '/about' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'Membership Benefits', path: '/benefits' },
        { label: 'RCI Points', path: '/points' },
        { label: 'RCI Weeks', path: '/weeks' },
      ],
    },
    {
      title: 'Vacation Planning',
      links: [
        { label: 'Resort Directory', path: '/directory' },
        { label: 'Destinations', path: '/destinations' },
        { label: 'Last Minute Deals', path: '/deals' },
        { label: 'Travel Inspiration', path: '/inspiration' },
        { label: 'Vacation Packages', path: '/packages' },
      ],
    },
    {
      title: 'Member Services',
      links: [
        { label: 'My Account', path: '/account' },
        { label: 'Book Vacation', path: '/book' },
        { label: 'Deposit Points', path: '/deposit' },
        { label: 'Reservation Help', path: '/reservation-help' },
        { label: 'Member Support', path: '/support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Careers', path: '/careers' },
        { label: 'Press Room', path: '/press' },
        { label: 'Investor Relations', path: '/investors' },
        { label: 'Affiliate Program', path: '/affiliates' },
        { label: 'Partners', path: '/partners' },
      ],
    },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Accessibility', path: '/accessibility' },
    { label: 'Do Not Sell My Info', path: '/donotsell' },
    { label: 'Site Map', path: '/sitemap' },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      label: 'Facebook',
      url: 'https://facebook.com/rci',
    },
    {
      icon: <FaInstagram />,
      label: 'Instagram',
      url: 'https://instagram.com/rci',
    },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com/rci' },
    {
      icon: <FaPinterest />,
      label: 'Pinterest',
      url: 'https://pinterest.com/rci',
    },
    { icon: <FaYoutube />, label: 'YouTube', url: 'https://youtube.com/rci' },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/company/rci',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-700 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and Contact Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl">
                  <span className="text-xl font-bold">RCI</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">RCI Vacation Exchange</h2>
                  <p className="text-blue-200 text-sm">
                    World's Largest Vacation Exchange
                  </p>
                </div>
              </div>
              <p className="text-blue-100 mb-6">
                Experience extraordinary vacations worldwide with RCI's
                extensive network of premium resorts and unparalleled member
                benefits.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-semibold">24/7 Member Support</p>
                  <a
                    href="tel:1-800-RCI-VACA"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    1-800-RCI-VACA (1-800-724-8222)
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <a
                    href="mailto:support@rci.com"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    support@rci.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-semibold">Global Headquarters</p>
                  <p className="text-blue-200">
                    9998 N. Michigan Rd., Carmel, IN 46032 USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-blue-800/30">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-blue-200 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-blue-800/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Get the RCI Mobile App</h3>
              <p className="text-blue-200">
                Book vacations on the go with our award-winning app
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3 bg-black hover:bg-gray-900 rounded-xl transition-colors group"
              >
                <FaApple className="w-6 h-6" />
                <div>
                  <p className="text-xs text-gray-400">Download on the</p>
                  <p className="font-bold group-hover:text-white transition-colors">
                    App Store
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-5 py-3 bg-[#0F9D58] hover:bg-[#0b7d46] rounded-xl transition-colors group"
              >
                <FaGooglePlay className="w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-200">Get it on</p>
                  <p className="font-bold group-hover:text-white transition-colors">
                    Google Play
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Trust Badges */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Social Media */}
          <div>
            <h4 className="text-sm font-semibold text-blue-300 mb-3">
              FOLLOW US
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-blue-900/30 hover:bg-blue-800 rounded-lg border border-blue-800/50 hover:border-blue-600 transition-all duration-200 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <div className="text-xl text-blue-300 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <FaShieldAlt className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <FaLock className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">SSL Protected</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <FaCheckCircle className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium">Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-900/50 bg-gray-950/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 lg:gap-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-sm text-blue-300 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-blue-300">
              <p>
                © {currentYear} RCI, LLC. All rights reserved. RCI and related
                marks are registered trademarks and/or service marks in the
                United States and internationally.
              </p>
              <p className="mt-1 text-xs text-blue-400/70">
                All resort names and trademarks are the property of their
                respective owners.
              </p>
            </div>
          </div>

          {/* Compliance */}
          <div className="mt-4 pt-4 border-t border-blue-900/30 text-xs text-blue-400/60">
            <p>
              RCI, LLC is a subsidiary of Travel + Leisure Co. (NYSE: TNL). This
              site is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
                className="hover:text-blue-300 transition-colors"
              >
                {' '}
                Privacy Policy
              </a>{' '}
              and
              <a
                href="https://policies.google.com/terms"
                className="hover:text-blue-300 transition-colors"
              >
                {' '}
                Terms of Service
              </a>{' '}
              apply.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 z-50"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
