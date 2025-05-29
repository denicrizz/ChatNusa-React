import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaSearch, FaUniversity, FaArrowRight, FaComments } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function LandingPage() {
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
            <Link
              to="/chat"
              className="inline-flex items-center gap-3 bg-white text-blue-600 dark:bg-gray-800 dark:text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            >
              <FaComments className="text-xl" />
              Mulai Chat
            </Link>
          </div>
        </div>

        {/* Mobile-friendly Features Section */}
        <div className="bg-white/95 dark:bg-gray-800/95 py-12 rounded-t-[2.5rem] shadow-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Fitur Utama
            </h2>
            <div className="grid gap-6">
              <MobileFeatureCard
                icon={<FaRobot />}
                title="AI Assistant"
                description="Jawaban cepat dan akurat untuk pertanyaan seputar kampus"
              />
              <MobileFeatureCard
                icon={<FaSearch />}
                title="Pencarian Repositori"
                description="Temukan skripsi, tesis, dan karya ilmiah dengan mudah"
              />
              <MobileFeatureCard
                icon={<FaUniversity />}
                title="Informasi Kampus"
                description="Akses informasi tentang fakultas, jurusan, dan layanan kampus"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-white/80 text-sm backdrop-blur-sm">
        Dibuat dengan <span className="text-red-500 animate-pulse">❤️</span> oleh{" "}
        <span className="font-semibold">Deni Kristanto</span>
      </footer>
    </div>
  );
}

function MobileFeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md flex items-center gap-4 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="text-3xl text-blue-600 dark:text-blue-400 p-3 bg-blue-50 dark:bg-gray-600 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}