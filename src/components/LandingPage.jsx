import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRobot, FaSearch, FaUniversity, FaArrowRight, FaComments, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const nextIndex = (activeIndex + 1) % 3;
        const scrollWidth = carouselRef.current.scrollWidth / 3;
        
        carouselRef.current.scrollTo({
          left: scrollWidth * nextIndex,
          behavior: 'smooth'
        });
        
        setActiveIndex(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.scrollWidth / 3;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  // Add transition handler
  const handleChatTransition = () => {
    // First animate the background
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '0';
    
    // Then navigate after animation
    setTimeout(() => {
      navigate('/chat');
      // Reset opacity after navigation
      document.body.style.opacity = '1';
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Mobile-friendly background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Mobile-optimized glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Mobile-first Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="text-center backdrop-blur-sm rounded-2xl p-4">
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <img
                src={logo}
                alt="ChatNusa Logo"
                className="w-24 h-24 rounded-3xl shadow-lg object-cover animate-fade-in"
              />
              <h1 className="text-3xl sm:text-5xl font-bold text-white animate-slide-down">
                ChatNusa
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/90 mb-12 animate-slide-up px-4">
              Asisten AI Universitas Nusantara PGRI Kediri
            </p>
            <button
              onClick={handleChatTransition}
              className="inline-flex items-center gap-3 bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group"
            >
              <FaComments className="text-xl transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all group-hover:after:w-full">
                Mulai Chat
              </span>
            </button>
          </div>
        </div>

        {/* Mobile-friendly Features Section */}
        <div className="bg-white/95 dark:bg-gray-800/95 py-8 sm:py-12 rounded-t-[2.5rem] shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900 dark:text-white">
              Fitur Utama
            </h2>
            <div className="relative max-w-5xl mx-auto">
              <div 
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex flex-nowrap gap-4 overflow-x-auto pb-4 snap-x scrollbar-none scroll-smooth sm:justify-center"
              >
                <div className="snap-center shrink-0 w-[85vw] sm:w-[280px] hover:scale-105 transition-transform duration-300">
                  <MobileFeatureCard
                    icon={<FaRobot />}
                    title="AI Assistant"
                    description="Jawaban cepat dan akurat untuk pertanyaan seputar kampus"
                  />
                </div>
                <div className="snap-center shrink-0 w-[85vw] sm:w-[280px] hover:scale-105 transition-transform duration-300">
                  <MobileFeatureCard
                    icon={<FaSearch />}
                    title="Pencarian Repositori"
                    description="Temukan skripsi, tesis, dan karya ilmiah dengan mudah"
                  />
                </div>
                <div className="snap-center shrink-0 w-[85vw] sm:w-[280px] hover:scale-105 transition-transform duration-300">
                  <MobileFeatureCard
                    icon={<FaUniversity />}
                    title="Informasi Kampus"
                    description="Akses informasi tentang fakultas, jurusan, dan layanan kampus"
                  />
                </div>
              </div>
              
              {/* Show dots only on mobile */}
              <div className="flex justify-center gap-2 mt-4 sm:hidden">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === activeIndex ? 'bg-blue-500' : 'bg-blue-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Social Links */}
      <footer className="text-center py-6 text-white/80 text-sm backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a
              href="https://github.com/denicrizz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/deni-kristanto-4a8838219/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/denicrizz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
          <div>
            Dibuat dengan <span className="text-red-500 animate-pulse">❤️</span> oleh{" "}
            <span className="font-semibold">Deni Kristanto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MobileFeatureCard({ icon, title, description }) {
  return (
    <div className="h-full bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-xl shadow-md flex flex-col items-start gap-3 sm:gap-4">
      <div className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 p-3 bg-blue-50 dark:bg-gray-600 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}