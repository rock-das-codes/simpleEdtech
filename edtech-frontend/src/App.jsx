import React, { useState } from 'react';
import { 
  Book, GraduationCap, Laptop, LogIn, ChevronRight, 
  Globe, Target, TrendingUp, Medal, Check 
} from 'lucide-react';
import { useNavigate } from 'react-router';
const EdTechLandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
 const navigate= useNavigate()
  const features = [
    {
      icon: <Globe className="text-emerald-500" size={64} />,
      title: "Global Learning",
      description: "Connect with top instructors from around the world.",
      background: "bg-emerald-50"
    },
    {
      icon: <Target className="text-purple-500" size={64} />,
      title: "Personalized Paths",
      description: "AI-driven learning tracks tailored to your goals.",
      background: "bg-purple-50"
    },
    {
      icon: <TrendingUp className="text-sky-500" size={64} />,
      title: "Career Acceleration",
      description: "Courses designed to boost your professional growth.",
      background: "bg-sky-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 overflow-x-hidden">
      {/* Animated Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4 transform transition-transform ">
            <GraduationCap className="text-black" size={40} />
            <span className="text-3xl font-black text-transparent bg-clip-text bg-black">
              MasterMind
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-black text-white px-6 py-3 rounded-full hover:shadow-xl transition-all transform " onClick={() => navigate("/signup")}>
              <LogIn className="mr-2" size={24} />
              Launch Learning
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Elements */}
      <main className="container mx-auto px-6 pt-24 relative">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-8 relative z-10">
          
            <h1 className="text-6xl font-black text-gray-900 leading-tight relative">
              Transform Your 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Learning Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Unlock your potential with cutting-edge courses, expert mentors, and adaptive learning technologies.
            </p>
            <div className="flex space-x-4">
              <button onClick={()=>navigate("/signup")} className="flex items-center bg-black text-white px-8 py-4 rounded-full hover:shadow-xl transition-all ">
                Start Your Journey <ChevronRight className="ml-2" />
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors flex items-center" onClick={() => navigate("/explore")}>

                Explore Courses
              </button>
            </div>
          </div>

          {/* 3D Illustration Area */}
          <div className="hidden md:flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full -z-10 animate-pulse"></div>
            <div className="relative">
              <img src="/Google_AI_Studio_2025-07-15T13_36_45.754Z-removebg-preview.png" alt="3D Illustration" className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">MasterMind?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience learning like never before with our innovative platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              onClick={() => setActiveFeature(index)}
              className={`
                ${feature.background} 
                p-6 rounded-xl shadow-lg cursor-pointer 
                transform transition-all duration-300
                }
              `}
            >
              {feature.icon}
              <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/80">© 2024 MasterMind Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EdTechLandingPage;