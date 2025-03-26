import React, { useState } from 'react';
import { 
  PlayCircle, 
  CheckCircle2, 
  BarChart2, 
  Clock, 
  BookOpen, 
  Filter, 
  Search 
} from 'lucide-react';

const myCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    progress: 65,
    lastStudied: "2 days ago",
    category: "Web Development",
    totalLessons: 42,
    completedLessons: 27,
    certificate: false,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Data Science Masterclass",
    instructor: "Michael Chen",
    progress: 40,
    lastStudied: "1 week ago",
    category: "Data Science",
    totalLessons: 50,
    completedLessons: 20,
    certificate: false,
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 3,
    title: "UX Design Professional",
    instructor: "Emily Rodriguez",
    progress: 100,
    lastStudied: "Completed",
    category: "Design",
    totalLessons: 35,
    completedLessons: 35,
    certificate: true,
    color: "from-purple-500 to-violet-600"
  }
];

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: [],
    categories: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(myCourses.map(course => course.category))];
  const statusOptions = ['In Progress', 'Completed'];

  const filteredCourses = myCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filters.status.length === 0 || 
      (filters.status.includes('In Progress') && course.progress < 100) ||
      (filters.status.includes('Completed') && course.progress === 100);
    
    const matchesCategories = filters.categories.length === 0 || 
      filters.categories.includes(course.category);

    return matchesSearch && matchesStatus && matchesCategories;
  });

  const renderCourseCard = (course) => (
    <div 
      key={course.id} 
      className={`
        bg-gradient-to-br ${course.color} 
        text-white 
        rounded-2xl 
        overflow-hidden 
        shadow-2xl 
        transform 
        transition-all 
        hover:scale-105 
        hover:shadow-2xl
      `}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {course.category}
          </span>
          {course.progress === 100 ? (
            <CheckCircle2 className="text-white" size={24} />
          ) : (
            <span className="text-sm">{course.progress}% Complete</span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
        <p className="text-white/80 mb-4">Instructor: {course.instructor}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>Last Studied: {course.lastStudied}</span>
          </div>
        </div>
        
        <div className="w-full bg-white/30 rounded-full h-2.5 mb-4">
          <div 
            className="bg-white h-2.5 rounded-full" 
            style={{width: `${course.progress}%`}}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {course.completedLessons} / {course.totalLessons} Lessons
          </div>
          {course.progress === 100 ? (
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 flex items-center">
              View Certificate
            </button>
          ) : (
            <button className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 flex items-center">
              <PlayCircle className="mr-2" size={20} /> Continue Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-indigo-600">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Track your learning progress, continue your courses, and celebrate your achievements.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-12 flex space-x-4">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search your courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full 
                pl-10 
                pr-4 
                py-3 
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
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="
              bg-indigo-600 
              text-white 
              px-4 
              py-3 
              rounded-full 
              flex 
              items-center 
              space-x-2 
              hover:bg-indigo-700
            "
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-12 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Course Status</h3>
              {statusOptions.map(status => (
                <label key={status} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => {
                      setFilters(prev => ({
                        ...prev,
                        status: prev.status.includes(status)
                          ? prev.status.filter(s => s !== status)
                          : [...prev.status, status]
                      }));
                    }}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => {
                      setFilters(prev => ({
                        ...prev,
                        categories: prev.categories.includes(category)
                          ? prev.categories.filter(c => c !== category)
                          : [...prev.categories, category]
                      }));
                    }}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(renderCourseCard)
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-600">
                No courses found
              </h2>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Learning Stats */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
            <BarChart2 className="text-indigo-600" size={48} />
            <div>
              <h3 className="text-xl font-bold">Total Learning Hours</h3>
              <p className="text-3xl font-bold text-gray-900">124 <span className="text-sm text-green-600">+12%</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
            <BookOpen className="text-emerald-600" size={48} />
            <div>
              <h3 className="text-xl font-bold">Completed Courses</h3>
              <p className="text-3xl font-bold text-gray-900">3 <span className="text-sm text-gray-600">Total</span></p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
            <Clock className="text-purple-600" size={48} />
            <div>
              <h3 className="text-xl font-bold">Learning Streak</h3>
              <p className="text-3xl font-bold text-gray-900">21 <span className="text-sm text-gray-600">Days</span></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyCourses;