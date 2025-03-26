import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  Star, 
  Clock, 
  BarChart2, 
  BookOpen, 
  PlayCircle,
  X
} from 'lucide-react';

const coursesData = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Angela Yu",
    rating: 4.8,
    duration: "36 hours",
    level: "Beginner",
    price: 49.99,
    category: "Web Development",
    tags: ["JavaScript", "React", "Node.js"],
    image: "/api/placeholder/400/250",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    rating: 4.9,
    duration: "42 hours",
    level: "Intermediate",
    price: 59.99,
    category: "Data Science",
    tags: ["Python", "Machine Learning", "Data Analysis"],
    image: "/api/placeholder/400/250",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 3,
    title: "Complete Digital Marketing Course",
    instructor: "Rob Percival",
    rating: 4.7,
    duration: "30 hours",
    level: "All Levels",
    price: 39.99,
    category: "Marketing",
    tags: ["SEO", "Social Media", "Content Marketing"],
    image: "/api/placeholder/400/250",
    color: "from-purple-500 to-violet-600"
  },
  {
    id: 4,
    title: "UX Design Masterclass",
    instructor: "Interaction Design Foundation",
    rating: 4.9,
    duration: "48 hours",
    level: "Advanced",
    price: 69.99,
    category: "Design",
    tags: ["UI/UX", "Design Thinking", "Wireframing"],
    image: "/api/placeholder/400/250",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 5,
    title: "AWS Certified Solutions Architect",
    instructor: "Stephane Maarek",
    rating: 4.8,
    duration: "55 hours",
    level: "Professional",
    price: 79.99,
    category: "Cloud Computing",
    tags: ["AWS", "Cloud Architecture", "DevOps"],
    image: "/api/placeholder/400/250",
    color: "from-orange-500 to-amber-600"
  }
];

const ExploreCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    priceRange: [0, 100]
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(coursesData.map(course => course.category))];
  const levels = [...new Set(coursesData.map(course => course.level))];

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategories = filters.categories.length === 0 || 
      filters.categories.includes(course.category);
    const matchesLevels = filters.levels.length === 0 || 
      filters.levels.includes(course.level);
    const matchesPrice = course.price >= filters.priceRange[0] && 
      course.price <= filters.priceRange[1];

    return matchesSearch && matchesCategories && matchesLevels && matchesPrice;
  });

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

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
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-300" fill="currentColor" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
        <p className="text-white/80 mb-4">By {course.instructor}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="text-xl font-bold">${course.price}</div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-white/20 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-white text-gray-900 py-3 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <PlayCircle className="mr-2" /> Enroll Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="text-indigo-600">Courses</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover new skills, advance your career, and unlock your potential with our comprehensive course library.
          </p>
        </header>

        {/* Search and Filters */}
        <div className="mb-12 flex space-x-4">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search courses..." 
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
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-12 grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleFilter('categories', category)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Levels</h3>
              {levels.map(level => (
                <label key={level} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.levels.includes(level)}
                    onChange={() => toggleFilter('levels', level)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Price Range</h3>
              <div className="flex items-center space-x-4">
                <span>${filters.priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [0, Number(e.target.value)]
                  }))}
                  className="flex-grow"
                />
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid */}
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
      </div>
    </div>
  );
};

export default ExploreCourses;