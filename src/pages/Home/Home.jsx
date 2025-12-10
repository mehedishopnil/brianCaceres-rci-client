import {
  IoSearch,
  IoChevronForward,
  IoStar,
  IoGlobe,
  IoCalendar,
  IoCard,
} from 'react-icons/io5';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useState, useEffect } from 'react';
import rciImg2 from '../../assets/images/rci-magazine-people-places.jpg';

// Modern Button Components with hover effects
const PrimaryButton = ({ children, className = '', icon: Icon, ...props }) => (
  <button
    className={`group relative px-8 py-4 font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] overflow-hidden ${className}`}
    {...props}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"></span>
    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    <span className="relative flex items-center justify-center gap-2">
      {children}
      {Icon && (
        <Icon className="text-lg transition-transform group-hover:translate-x-1" />
      )}
    </span>
  </button>
);

const SecondaryButton = ({
  children,
  className = '',
  icon: Icon,
  ...props
}) => (
  <button
    className={`group px-8 py-4 font-semibold rounded-xl border-2 border-blue-600 text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] ${className}`}
    {...props}
  >
    <span className="flex items-center justify-center gap-2">
      {children}
      {Icon && (
        <Icon className="text-lg transition-transform group-hover:translate-x-1" />
      )}
    </span>
  </button>
);

// Stats Card Component
const StatCard = ({ value, label, icon: Icon }) => (
  <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 rounded-xl">
        <Icon className="text-2xl text-blue-600" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ title, description, icon: Icon, gradient }) => (
  <div className="group p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className={`p-3 rounded-xl w-fit mb-6 ${gradient}`}>
      <Icon className="text-2xl text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const destinations = [
    {
      name: 'Hawaii',
      image:
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h-400&fit=crop',
    },
    {
      name: 'Caribbean',
      image:
        'https://images.unsplash.com/photo-1519567241046-54fbc30b7c88?w=600&h=400&fit=crop',
    },
    {
      name: 'Europe',
      image:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop',
    },
    {
      name: 'Asia',
      image:
        'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&h=400&fit=crop',
    },
  ];

  const features = [
    {
      title: 'Global Network',
      description: 'Access to 4,300+ resorts across 110+ countries worldwide',
      icon: IoGlobe,
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-400',
    },
    {
      title: 'Flexible Booking',
      description:
        'Book weeks or points-based vacations with maximum flexibility',
      icon: IoCalendar,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-400',
    },
    {
      title: 'Premium Quality',
      description: 'All resorts verified for quality and member satisfaction',
      icon: IoStar,
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-400',
    },
    {
      title: 'Value Protection',
      description:
        'Your vacation investment is protected with industry-leading guarantees',
      icon: IoCard,
      gradient: 'bg-gradient-to-br from-emerald-500 to-green-400',
    },
  ];

  return (
    <main className="min-h-screen antialiased bg-gradient-to-b from-gray-50 to-white">
      {/* 1. Enhanced Hero Section with Parallax Effect */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />
        </div>

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-float"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white">
                WORLD'S LARGEST VACATION EXCHANGE
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Passport to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                Extraordinary Vacations
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Unlock access to thousands of premium resorts worldwide with your
              RCI membership. Experience unforgettable moments, one destination
              at a time.
            </p>

            {/* Enhanced Search Form */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 lg:p-3"
            >
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1 flex items-center px-4">
                  <IoSearch className="text-2xl text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, resorts, or experiences..."
                    className="flex-1 py-4 text-lg text-gray-700 outline-none bg-transparent placeholder-gray-400"
                    aria-label="Search for vacation"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Explore Now
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
              <StatCard
                value="4,300+"
                label="Resorts Worldwide"
                icon={IoGlobe}
              />
              <StatCard value="110+" label="Countries" icon={IoGlobe} />
              <StatCard value="7M+" label="Members" icon={IoStar} />
              <StatCard
                value="45+"
                label="Years of Excellence"
                icon={IoCalendar}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* 2. Account Status Section - Modern Alert Design */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-32 translate-x-32"></div>

            <div className="relative p-8 lg:p-12 lg:grid lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-red-50 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-red-700">
                    ACTION REQUIRED
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Your RCI Points Balance is
                  <span className="text-red-600 ml-2">0</span>
                </h2>

                <p className="text-lg text-gray-600 mb-6">
                  To book your dream vacation, you need sufficient Points in
                  your RCI account. Browse our exclusive collection of resorts
                  and experiences, then deposit the required Points from your
                  Club Wyndham account to secure your booking.
                </p>

                <div className="flex flex-wrap gap-4">
                  <SecondaryButton icon={IoChevronForward}>
                    Browse Available Vacations
                  </SecondaryButton>
                </div>
              </div>

              {/* Deposit Card */}
              <div className="mt-8 lg:mt-0 lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 transform lg:hover:scale-[1.02] transition-transform duration-300">
                  <div className="p-3 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-xl w-fit mb-6">
                    <IoStar className="text-2xl text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Travel?
                  </h3>

                  <p className="text-gray-600 mb-6">
                    Deposit your Club Wyndham Points with RCI and unlock a world
                    of possibilities.
                  </p>

                  <PrimaryButton className="w-full" icon={IoChevronForward}>
                    Deposit My Points
                  </PrimaryButton>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-700">
                      💡 <span className="font-semibold">Pro Tip:</span> Deposit
                      early for better availability and exclusive member rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose RCI?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with industry-leading benefits designed
              for discerning travelers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RCI Magazine Section - Modern Card Design */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-2xl transition-shadow duration-500">
            <div className="lg:grid lg:grid-cols-2">
              {/* Image Container */}
              <div className="relative h-80 lg:h-full min-h-[400px] overflow-hidden">
                <img
                  src={rciImg2}
                  alt="RCI Magazine Cover showcasing people and places"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                    LATEST ISSUE
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="text-sm font-semibold tracking-widest uppercase text-blue-600">
                    Travel Inspiration
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  RCI Magazine<sup>®</sup>
                </h3>

                <p className="text-lg text-gray-600 mb-8">
                  Your premier digital guide to extraordinary vacations.
                  Discover hidden gems, member-exclusive offers, and expert
                  travel tips in our beautifully curated magazine.
                </p>

                <div className="space-y-4">
                  <SecondaryButton
                    icon={IoChevronForward}
                    className="w-full lg:w-auto"
                  >
                    Explore Latest Issue
                  </SecondaryButton>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <IoStar className="text-amber-500" />
                      <IoStar className="text-amber-500" />
                      <IoStar className="text-amber-500" />
                      <IoStar className="text-amber-500" />
                      <IoStar className="text-amber-500" />
                    </span>
                    <span>4.9/5 from 15K+ members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Destinations */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Trending Destinations
              </h2>
              <p className="text-xl text-gray-600">
                Discover where our members are traveling this season
              </p>
            </div>
            <a
              href="/destinations"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 mt-4 lg:mt-0"
            >
              View All Destinations
              <MdKeyboardDoubleArrowRight className="text-xl" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  style={{
                    backgroundImage: `url(${destination.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 transform group-hover:translate-y-0 transition-transform duration-300">
                    {destination.name}
                  </h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">120+ Resorts</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-center p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join millions of satisfied members who trust RCI for their
                vacation exchange needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton
                  icon={IoChevronForward}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Start Booking
                </PrimaryButton>
                <SecondaryButton className="border-white text-white hover:bg-white/10">
                  Contact Member Services
                </SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};



export default Home;
