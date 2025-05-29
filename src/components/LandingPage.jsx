import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaSearch, FaUniversity, FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content with increased contrast */}
      <div className="relative">
        {/* Hero Section with Animation */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center animate-fade-in backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src={logo}
                alt="ChatNusa Logo"
                className="w-16 h-16 rounded-full object-cover animate-fade-in"
              />
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white animate-slide-down">
                ChatNusa
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up">
              Asisten AI Universitas Nusantara PGRI Kediri
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 transform"
            >
              Mulai Chat <FaArrowRight className="animate-bounce" />
            </Link>
          </div>
        </div>

        {/* Features Section with Animation */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fade-in">
              Fitur Utama
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FaRobot />}
                title="AI Assistant"
                description="Jawaban cepat dan akurat untuk pertanyaan seputar UNP"
                delay="delay-100"
              />
              <FeatureCard
                icon={<FaSearch />}
                title="Pencarian Repositori"
                description="Temukan skripsi, tesis, dan karya ilmiah UNP"
                delay="delay-200"
              />
              <FeatureCard
                icon={<FaUniversity />}
                title="Informasi Kampus"
                description="Akses informasi tentang fakultas, jurusan, dan layanan UNP"
                delay="delay-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center transform transition-all duration-500 hover:scale-105 animate-fade-in ${delay}`}>
      <div className="text-4xl text-blue-600 dark:text-blue-400 mb-4 flex justify-center hover:rotate-12 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}