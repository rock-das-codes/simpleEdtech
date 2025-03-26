import React from 'react';
import { 
  Trophy, 
  Book, 
  CheckCircle2, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

const ProgressPage = () => {
  // Sample progress data
  const courseProgress = [
    { 
      title: 'Advanced Python Programming', 
      progress: 65, 
      completed: 13, 
      total: 20 
    },
    { 
      title: 'Data Science Fundamentals', 
      progress: 45, 
      completed: 9, 
      total: 20 
    },
    { 
      title: 'Web Development Bootcamp', 
      progress: 80, 
      completed: 16, 
      total: 20 
    }
  ];

  const achievements = [
    { 
      icon: <Trophy className="text-yellow-500" />, 
      title: 'Python Master', 
      description: 'Completed all Python modules' 
    },
    { 
      icon: <Book className="text-green-500" />, 
      title: 'Learning Streak', 
      description: '30 consecutive days of learning' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Learning Progress
        </h1>

        {/* Course Progress Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-600" />
            Course Progress
          </h2>
          {courseProgress.map((course, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{course.title}</span>
                <span className="text-gray-600">
                  {course.completed}/{course.total} modules
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{width: `${course.progress}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle2 className="mr-2 text-green-600" />
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-4 rounded-lg flex items-center"
              >
                <div className="mr-4">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 text-purple-600" />
            Learning Stats
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-blue-800">Total Courses</h3>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-green-800">Completed Modules</h3>
              <p className="text-2xl font-bold text-green-600">38</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-purple-800">Learning Hours</h3>
              <p className="text-2xl font-bold text-purple-600">45</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;