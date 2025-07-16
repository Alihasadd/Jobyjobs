import { useState } from 'react';
import { Search, MapPin, Building, Clock, Star, ExternalLink, Moon, Sun, Filter, ChevronDown } from 'lucide-react';

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [salaryRange, setSalaryRange] = useState('');
  const [workType, setWorkType] = useState('');
  const [datePosted, setDatePosted] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Simple job data array
  const jobs = [
    {
      id: 1,
      title: "Senior People Operations Manager",
      company: "TechFlow Inc",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      salaryMin: 120000,
      salaryMax: 150000,
      posted: "2 days ago",
      postedDays: 2,
      workType: "Hybrid",
      description: "Lead people operations initiatives, employee lifecycle management, and HR technology implementation.",
      tags: ["People Operations", "HR Technology", "Employee Experience"],
      featured: true
    },
    {
      id: 2,
      title: "Talent Operations Specialist",
      company: "DataCorp",
      location: "Remote",
      salary: "$80k - $100k",
      salaryMin: 80000,
      salaryMax: 100000,
      posted: "1 day ago",
      postedDays: 1,
      workType: "Remote",
      description: "Optimize recruiting processes, manage ATS systems, and provide data-driven insights for talent acquisition.",
      tags: ["Talent Operations", "ATS", "Data Analysis"],
      featured: false
    },
    {
      id: 3,
      title: "People Technology Analyst",
      company: "InnovateHR",
      location: "New York, NY",
      salary: "$65k - $85k",
      salaryMin: 65000,
      salaryMax: 85000,
      posted: "3 days ago",
      postedDays: 3,
      workType: "On-site",
      description: "Support HRIS implementation, data analytics, and system integrations for people technology stack.",
      tags: ["People Technology", "HRIS", "System Integration"],
      featured: false
    },
    {
      id: 4,
      title: "Recruiting Operations Manager",
      company: "ScaleUp Solutions",
      location: "Austin, TX",
      salary: "$100k - $130k",
      salaryMin: 100000,
      salaryMax: 130000,
      posted: "1 week ago",
      postedDays: 7,
      workType: "Hybrid",
      description: "Drive recruiting efficiency, manage vendor relationships, and build scalable hiring processes.",
      tags: ["Recruiting Operations", "Process Optimization"],
      featured: true
    },
    {
      id: 5,
      title: "HR Operations Coordinator",
      company: "GrowthCo",
      location: "Chicago, IL",
      salary: "$50k - $65k",
      salaryMin: 50000,
      salaryMax: 65000,
      posted: "4 days ago",
      postedDays: 4,
      workType: "On-site",
      description: "Support HR operations, employee onboarding, and compliance activities across the organization.",
      tags: ["HR Operations", "Onboarding", "Compliance"],
      featured: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Salary filter
    const matchesSalary = !salaryRange || (() => {
      switch(salaryRange) {
        case 'under-50k': return job.salaryMax < 50000;
        case '50k-75k': return job.salaryMin >= 50000 && job.salaryMax <= 75000;
        case '75k-100k': return job.salaryMin >= 75000 && job.salaryMax <= 100000;
        case '100k-150k': return job.salaryMin >= 100000 && job.salaryMax <= 150000;
        case 'over-150k': return job.salaryMin > 150000;
        default: return true;
      }
    })();
    
    // Work type filter
    const matchesWorkType = !workType || job.workType === workType;
    
    // Date posted filter
    const matchesDate = !datePosted || (() => {
      switch(datePosted) {
        case 'today': return job.postedDays === 0;
        case 'last-3-days': return job.postedDays <= 3;
        case 'last-week': return job.postedDays <= 7;
        case 'last-month': return job.postedDays <= 30;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesSalary && matchesWorkType && matchesDate;
  });

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`shadow-sm border-b transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                PeopleOps Jobs
              </h1>
              <p className={`text-sm transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Find your next opportunity in People Operations
              </p>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className={`rounded-lg shadow-sm p-6 mb-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-3 h-4 w-4 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            {/* Filter Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4" />
                Filter Jobs
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Filter Dropdown */}
              {showFilters && (
                <div className={`absolute top-full left-0 mt-2 w-80 rounded-lg shadow-lg border z-50 transition-colors duration-300 ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div className="p-4 space-y-4">
                    {/* Salary Range Buttons */}
                    <div>
                      <h4 className={`text-sm font-medium mb-3 transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        💰 Salary Range
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: '', label: 'All', color: 'bg-gray-500' },
                          { value: 'under-50k', label: '<$50k', color: 'bg-red-500' },
                          { value: '50k-75k', label: '$50k-$75k', color: 'bg-orange-500' },
                          { value: '75k-100k', label: '$75k-$100k', color: 'bg-yellow-500' },
                          { value: '100k-150k', label: '$100k-$150k', color: 'bg-green-500' },
                          { value: 'over-150k', label: '>$150k', color: 'bg-emerald-500' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setSalaryRange(option.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 ${
                              salaryRange === option.value
                                ? `${option.color} text-white shadow-lg`
                                : darkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Work Type Buttons */}
                    <div>
                      <h4 className={`text-sm font-medium mb-3 transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        🏠 Work Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: '', label: 'All Types', color: 'bg-gray-500', emoji: '🌐' },
                          { value: 'Remote', label: 'Remote', color: 'bg-green-500', emoji: '🏠' },
                          { value: 'Hybrid', label: 'Hybrid', color: 'bg-blue-500', emoji: '🔄' },
                          { value: 'On-site', label: 'On-site', color: 'bg-purple-500', emoji: '🏢' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setWorkType(option.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-1 ${
                              workType === option.value
                                ? `${option.color} text-white shadow-lg`
                                : darkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="text-xs">{option.emoji}</span>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Posted Buttons */}
                    <div>
                      <h4 className={`text-sm font-medium mb-3 transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        📅 Posted Date
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: '', label: 'Any Time', color: 'bg-gray-500', emoji: '🕐' },
                          { value: 'today', label: 'Today', color: 'bg-pink-500', emoji: '🆕' },
                          { value: 'last-3-days', label: '3 Days', color: 'bg-indigo-500', emoji: '📆' },
                          { value: 'last-week', label: '1 Week', color: 'bg-cyan-500', emoji: '📅' },
                          { value: 'last-month', label: '1 Month', color: 'bg-teal-500', emoji: '📊' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setDatePosted(option.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-1 ${
                              datePosted === option.value
                                ? `${option.color} text-white shadow-lg`
                                : darkMode
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <span className="text-xs">{option.emoji}</span>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear All Filters */}
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={() => {
                          setSalaryRange('');
                          setWorkType('');
                          setDatePosted('');
                        }}
                        className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredJobs.length} jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200'
            } ${job.featured ? 'border-l-4 border-l-blue-500' : ''}`}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {job.title}
                      </h3>
                      {job.featured && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium dark:bg-blue-900 dark:text-blue-200">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-4 text-sm mb-3 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.workType === 'Remote' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : job.workType === 'Hybrid'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {job.workType}
                      </div>
                    </div>

                    <p className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, index) => (
                          <span key={index} className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-green-600 dark:text-green-400">{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-full border transition-colors duration-300 ${
                        savedJobs.has(job.id)
                          ? darkMode 
                            ? 'bg-yellow-900 border-yellow-600 text-yellow-400' 
                            : 'bg-yellow-50 border-yellow-300 text-yellow-600'
                          : darkMode
                            ? 'bg-gray-700 border-gray-600 text-gray-400 hover:text-yellow-400'
                            : 'bg-gray-50 border-gray-300 text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm">
                      Apply <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-12 rounded-lg p-6 text-center transition-colors duration-300 ${
          darkMode 
            ? 'bg-blue-900 text-blue-100' 
            : 'bg-blue-50 text-blue-900'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
            Ready for your next People Ops role?
          </h3>
          <p className={`transition-colors duration-300 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
            Join thousands of professionals finding their perfect opportunity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;