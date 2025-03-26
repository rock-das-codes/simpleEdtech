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
          <div className="flex items-center space-x-4 transform transition-transform hover:scale-105">
            <GraduationCap className="text-indigo-600" size={40} />
            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              MasterMind
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1">
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
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
            <h1 className="text-6xl font-black text-gray-900 leading-tight relative">
              Transform Your 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Learning Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl">
              Unlock your potential with cutting-edge courses, expert mentors, and adaptive learning technologies.
            </p>
            <div className="flex space-x-4">
              <button onClick={()=>navigate("/signup")} className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1">
                Start Your Journey <ChevronRight className="ml-2" />
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50 transition-colors flex items-center">
                Explore Courses
              </button>
            </div>
          </div>

          {/* 3D Illustration Area */}
          <div className="hidden md:flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full -z-10 animate-pulse"></div>
            <div className="relative">
              <Laptop size={500} className="text-indigo-600 drop-shadow-2xl transform hover:scale-105 transition-transform" />
              <div className="absolute top-0 -right-12 bg-white shadow-lg p-4 rounded-xl flex items-center space-x-3 animate-bounce">
                <Medal className="text-yellow-500" />
                <span className="font-bold text-gray-800">Top Rated Courses</span>
              </div>
              <div className="absolute bottom-0 -left-12 bg-white shadow-lg p-4 rounded-xl flex items-center space-x-3 animate-bounce delay-500">
                <Check className="text-green-500" />
                <span className="font-bold text-gray-800">Certified Programs</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Interactive Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">MasterMind?</span>
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
                ${activeFeature === index ? 'scale-105 ring-4 ring-indigo-300' : 'hover:scale-105'}
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
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/80">© 2024 MasterMind Learning. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EdTechLandingPage;