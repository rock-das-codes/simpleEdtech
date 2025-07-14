import React, { useState } from 'react';
import {useNavigate} from "react-router"
import ExploreCourses from "./Explore"
import MyCourses from './Mycourses';
import ProgressPage from './Progress';
import { 
  Book, 
  GraduationCap, 
  Home, 
  Compass, 
  TrendingUp, 
  Clock, 
  Award, 
  User, 
  LogOut, 
  Search,
  BarChart2,
  PlayCircle,
  CheckCircle2,
   BookOpen, 
} from 'lucide-react';

const mockCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    progress: 65,
    category: "Web Development",
    level: "Advanced",
    image: "/api/placeholder/400/250",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Data Science Masterclass",
    instructor: "Michael Chen",
    progress: 40,
    category: "Data Science",
    level: "Intermediate",
    image: "/api/placeholder/400/250",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    instructor: "Dr. Emily Rodriguez",
    progress: 85,
    category: "Artificial Intelligence",
    level: "Expert",
    image: "/api/placeholder/400/250",
    color: "from-purple-500 to-violet-600"
  },
   {
    id: 4,
    title: "AI & Machine Learning",
    instructor: "Dr. Emily Rodriguez",
    progress: 85,
    category: "Artificial Intelligence",
    level: "Expert",
    image: "/api/placeholder/400/250",
    color: "from-purple-500 to-violet-600"
  },
   {
    id: 3,
    title: "AI & Machine Learning",
    instructor: "Dr. Emily Rodriguez",
    progress: 85,
    category: "Artificial Intelligence",
    level: "Expert",
    image: "/api/placeholder/400/250",
    color: "from-purple-500 to-violet-600"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { 
      icon: <Home />, 
      label: 'Dashboard', 
      tab: 'dashboard' ,
      address:"/"
    },
    { 
      icon: <Compass />, 
      label: 'Explore Courses', 
      tab: 'explore' ,
      address:"/explore"
    },
    // { 
    //   icon: <Book />, 
    //   label: 'My Courses', 
    //   tab: 'courses' ,
    //   address:"/"
    // },
    { 
      icon: <TrendingUp />, 
      label: 'Progress', 
      tab: 'progress' ,
      address:"/"
    }
  ];

  const renderCourseCard = (course) => (
    <div 
      key={course.id} 
      className={`
      rounded-2xl 
      overflow-hidden 
      shadow-2xl 
      transform 
      transition-all 
      scale-85
      h-[400px] flex flex-col
      hover:shadow-2xl
    `}
    >
      <img className='max-w-full h-32 object-cover' src="https://picsum.photos/200" width={500} height={300} alt="Course" />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm px-3 py-1 rounded-full">
            {course.level}
          </span>
          <span className="text-sm">{course.category}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
        <p className="mb-2">Instructor: {course.instructor}</p>
        
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-full rounded-full h-2.5 bg-gray-200">
            <div 
              className="bg-green-400 h-2.5 rounded-full" 
              style={{width: `${course.progress}%`}}
            ></div>
          </div>
          <span>{course.progress}%</span>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <button className="px-4 py-2 rounded-full flex items-center bg-green-500 text-gray-900 hover:bg-green-300">
            <PlayCircle className="mr-2" size={20} /> Continue
          </button>
          <CheckCircle2 
            className={course.progress === 100 ? 'text-red' : 'text-red/50'} 
            size={24} 
          />
        </div>
      </div>
    </div>
  );
  const navigate= useNavigate()
  const [slice, setSlice] = useState(4)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-24 bg-white shadow-xl p-4 flex flex-col justify-between">
        <div>
          <div className="mb-8 flex justify-center">
            <GraduationCap className="text-indigo-600" size={40} />
          </div>
          
          <div className="space-y-4">
            {navigationItems.map((item) => (
              <button 
                key={item.tab}
                onClick={() => {setActiveTab(item.tab)}}
                className={`
                  w-full 
                  p-3 
                  rounded-xl 
                  flex 
                  flex-col 
                  items-center 
                  ${activeTab === item.tab 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'text-gray-500 hover:bg-gray-100'
                  }
                `}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full p-3 rounded-xl flex flex-col items-center text-gray-500 hover:bg-gray-100">
            <User />
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button className="w-full p-3 rounded-xl flex flex-col items-center text-red-500 hover:bg-red-50">
            <LogOut />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab=="dashboard"?<div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome Back, 
              <span className="text-indigo-600"> Alex</span>
            </h1>
            <p className="text-gray-600">Continue your learning journey today</p>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full 
                pl-10 
                pr-4 
                py-2 
                rounded-full 
                border 
                border-gray-300 
                focus:border-indigo-500 
                focus:ring 
                focus:ring-indigo-200
              "
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </header>

        {/* Enrolled Courses */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              My Enrolled Courses
            </h2>
            <button onClick={() => {if(slice==mockCourses.length){setSlice(4)}else{setSlice(mockCourses.length)}}} className="text-indigo-600 hover:underline">
              {slice==5? "View Less Courses":"View All Courses"}
            </button>
          </div>
          
          <div className="grid md:grid-cols-4 ">
            {searchQuery?(mockCourses.filter(course=>course.title.toLowerCase().includes(searchQuery.toLowerCase())).length!=0? mockCourses.filter(course=>course.title.toLowerCase().includes(searchQuery.toLowerCase())).map(renderCourseCard):<div className="col-span-full text-center py-12">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-600">
                No courses found
              </h2>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>): mockCourses.slice(0,slice).map(renderCourseCard)}

          </div>
        </section>

        {/* Learning Progress */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Learning Progress
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Total Learning Hours</h3>
                <BarChart2 className="text-indigo-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                124 <span className="text-base text-green-600">+12% this month</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Completed Courses</h3>
                <Award className="text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                3 <span className="text-base text-gray-600">out of 5</span>
              </div>
            </div>
          </div>
        </section>
      </div>:null}
      {activeTab=="explore"?<ExploreCourses/>:null}
      {activeTab=="courses"?<MyCourses/>:null}
      {activeTab=="progress"?<ProgressPage/>:null}
    </div>
  );
};

export default Dashboard;