import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [fullName, setFullName] = useState("User");
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [projects, setProjects] = useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#000' : '#fff',
      borderColor: localStorage.getItem('theme') === 'dark' ? '#555' : '#e5e7eb',
      color: localStorage.getItem('theme') === 'dark' ? '#fff' : '#111',
      padding: '5px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: localStorage.getItem('theme') === 'dark' ? '#000' : '#fff',
      color: localStorage.getItem('theme') === 'dark' ? '#fff' : '#111',
      width: "100%",
      zIndex: 99999, // Increased z-index to ensure it's above all other elements
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      marginTop: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused 
        ? localStorage.getItem('theme') === 'dark' ? '#333' : '#f3f4f6'
        : localStorage.getItem('theme') === 'dark' ? '#000' : '#fff',
      color: localStorage.getItem('theme') === 'dark' ? '#fff' : '#111',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: localStorage.getItem('theme') === 'dark' ? '#fff' : '#111',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: localStorage.getItem('theme') === 'dark' ? '#aaa' : '#6b7280',
    }),
  };

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || project.projLanguage === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const projectStats = {
    total: projects?.length || 0,
    python: projects?.filter(p => p.projLanguage === "python").length || 0,
    javascript: projects?.filter(p => p.projLanguage === "javascript").length || 0,
    cpp: projects?.filter(p => p.projLanguage === "cpp").length || 0,
    c: projects?.filter(p => p.projLanguage === "c").length || 0,
    java: projects?.filter(p => p.projLanguage === "java").length || 0,
    bash: projects?.filter(p => p.projLanguage === "bash").length || 0,
    dart: projects?.filter(p => p.projLanguage === "dart").length || 0,
    swift: projects?.filter(p => p.projLanguage === "swift").length || 0,
    php: projects?.filter(p => p.projLanguage === "php").length || 0,
    go: projects?.filter(p => p.projLanguage === "go").length || 0,
    ruby: projects?.filter(p => p.projLanguage === "ruby").length || 0
  };

  const languageLogos = {
    python: "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png",
    javascript: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    cpp: "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png",
    c: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
    java: "https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png",
    bash: "https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png",
    dart: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Dart_logo.png",
    swift: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg",
    php: "https://www.php.net/images/logos/new-php-logo.svg",
    go: "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg",
    ruby: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg"
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    // Filter only the required languages
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash",
      "dart",
      "swift",
      "php",
      "go",
      "ruby"
    ];

    const options = data
      .filter(runtime => filteredLanguages.includes(runtime.language))
      .map(runtime => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(api_base_url + "/getProjects", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
    getRunTimes();
    // Get fullName from localStorage
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setName("");
        navigate("/editor/" + data.projectId)
      }
      else {
        toast.error(data.msg);
      }
    })
  };

  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          getProjects();
        }
        else {
          toast.error(data.msg);
        }
      });
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
      else {
        toast.error(data.msg);
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
    })
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section with modern design */}
      <div className="relative overflow-hidden bg-[#000000]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-900/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <p className="text-blue-400 text-sm font-semibold tracking-wide uppercase mb-3">
              Welcome to your coding workspace
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-white">👋 Hello Coder,</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {fullName}
              </span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your personal space for coding projects. Create, manage, and run code in multiple languages all in one place.
            </p>
            <div className="mt-8 max-w-md mx-auto flex justify-center gap-4">
              <button 
                onClick={() => setIsCreateModelShow(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Create New Project
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative blob shapes */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-900/10 to-blue-800/10 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/2 w-96 h-96">
          <div className="absolute w-full h-full bg-gradient-to-tl from-indigo-900/10 to-blue-800/10 rounded-full filter blur-3xl opacity-30"></div>
        </div>
      </div>

      {/* Stats Section with modern cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-1.5 mr-2 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Your Project Statistics
          </h2>
          <p className="text-gray-400 ml-9">Overview of your coding activities across different languages</p>
        </div>

        {/* Main grid for stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Total Projects Card */}
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800/90 dark:to-blue-900/20 backdrop-blur-xl rounded-xl p-6 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_30px_rgba(59,130,246,0.15)] border border-blue-100/30 dark:border-blue-700/30 sticky top-4 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-400/10 to-indigo-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-indigo-500/10 rounded-full -ml-8 -mb-8"></div>
            
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shadow-md relative z-10">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center relative z-10">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mt-2 relative z-10">{projectStats.total}</p>
            
            {/* Add subtle border at top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
          </div>
          
          {/* Language stat cards - all languages will be shown regardless of project count */}
          {Object.entries(projectStats).map(([key, value]) => {
            if (key === 'total') return null;
            
            // Define color classes based on language
            const textColor = 
              key === 'python' ? 'text-green-600 dark:text-green-400' :
              key === 'javascript' ? 'text-yellow-600 dark:text-yellow-400' :
              key === 'cpp' ? 'text-purple-600 dark:text-purple-400' :
              key === 'c' ? 'text-blue-600 dark:text-blue-400' :
              key === 'java' ? 'text-red-600 dark:text-red-400' :
              key === 'bash' ? 'text-gray-600 dark:text-gray-400' :
              key === 'dart' ? 'text-teal-600 dark:text-teal-400' :
              key === 'swift' ? 'text-orange-600 dark:text-orange-400' :
              key === 'php' ? 'text-indigo-600 dark:text-indigo-400' :
              key === 'go' ? 'text-cyan-600 dark:text-cyan-400' :
              'text-rose-600 dark:text-rose-400';
              
            const gradientFrom = 
              key === 'python' ? 'from-green-50 dark:from-green-900/10' :
              key === 'javascript' ? 'from-yellow-50 dark:from-yellow-900/10' :
              key === 'cpp' ? 'from-purple-50 dark:from-purple-900/10' :
              key === 'c' ? 'from-blue-50 dark:from-blue-900/10' :
              key === 'java' ? 'from-red-50 dark:from-red-900/10' :
              key === 'bash' ? 'from-gray-50 dark:from-gray-900/10' :
              key === 'dart' ? 'from-teal-50 dark:from-teal-900/10' :
              key === 'swift' ? 'from-orange-50 dark:from-orange-900/10' :
              key === 'php' ? 'from-indigo-50 dark:from-indigo-900/10' :
              key === 'go' ? 'from-cyan-50 dark:from-cyan-900/10' :
              'from-rose-50 dark:from-rose-900/10';
              
            const borderColor = 
              key === 'python' ? 'border-green-100/30 dark:border-green-700/30' :
              key === 'javascript' ? 'border-yellow-100/30 dark:border-yellow-700/30' :
              key === 'cpp' ? 'border-purple-100/30 dark:border-purple-700/30' :
              key === 'c' ? 'border-blue-100/30 dark:border-blue-700/30' :
              key === 'java' ? 'border-red-100/30 dark:border-red-700/30' :
              key === 'bash' ? 'border-gray-100/30 dark:border-gray-700/30' :
              key === 'dart' ? 'border-teal-100/30 dark:border-teal-700/30' :
              key === 'swift' ? 'border-orange-100/30 dark:border-orange-700/30' :
              key === 'php' ? 'border-indigo-100/30 dark:border-indigo-700/30' :
              key === 'go' ? 'border-cyan-100/30 dark:border-cyan-700/30' :
              'border-rose-100/30 dark:border-rose-700/30';
              
            const topBorderColor = 
              key === 'python' ? 'from-green-400 to-emerald-500' :
              key === 'javascript' ? 'from-yellow-400 to-amber-500' :
              key === 'cpp' ? 'from-purple-400 to-violet-500' :
              key === 'c' ? 'from-blue-400 to-indigo-500' :
              key === 'java' ? 'from-red-400 to-rose-500' :
              key === 'bash' ? 'from-gray-400 to-slate-500' :
              key === 'dart' ? 'from-teal-400 to-cyan-500' :
              key === 'swift' ? 'from-orange-400 to-amber-500' :
              key === 'php' ? 'from-indigo-400 to-violet-500' :
              key === 'go' ? 'from-cyan-400 to-sky-500' :
              'from-rose-400 to-pink-500';
              
            const shadowHover = 
              key === 'python' ? 'rgba(16,185,129,0.15)' :
              key === 'javascript' ? 'rgba(245,158,11,0.15)' :
              key === 'cpp' ? 'rgba(139,92,246,0.15)' :
              key === 'c' ? 'rgba(59,130,246,0.15)' :
              key === 'java' ? 'rgba(239,68,68,0.15)' :
              key === 'bash' ? 'rgba(107,114,128,0.15)' :
              key === 'dart' ? 'rgba(20,184,166,0.15)' :
              key === 'swift' ? 'rgba(249,115,22,0.15)' :
              key === 'php' ? 'rgba(99,102,241,0.15)' :
              key === 'go' ? 'rgba(6,182,212,0.15)' :
              'rgba(244,63,94,0.15)';
            
            return (
              <div key={key} 
                onClick={() => setSelectedFilter(key)}
                className={`bg-gradient-to-br ${gradientFrom} to-white dark:to-gray-800/90 backdrop-blur-xl rounded-xl p-6 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_30px_${shadowHover}] ${borderColor} cursor-pointer group overflow-hidden relative`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-full -mr-8 -mt-8 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/20 to-transparent rounded-full -ml-6 -mb-6 opacity-60"></div>
                
                {/* Top border gradient */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${topBorderColor}`}></div>
                
                <div className="flex justify-center mb-4">
                  <div className={`w-14 h-14 bg-white dark:bg-gray-700 rounded-xl p-2 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-3 group-hover:scale-110 relative z-10`}>
                    <img
                      src={languageLogos[key]}
                      alt={key}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48?text=?";
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize text-center relative z-10">{key}</h3>
                <p className={`text-3xl font-bold text-center mt-2 ${textColor} relative z-10`}>{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center relative z-10">
                  {value === 1 ? 'Project' : 'Projects'}
                </p>
                {value > 0 && (
                  <div className="mt-4 pt-2 border-t border-gray-100/30 dark:border-gray-700/30 text-center relative z-10">
                    <span className={`text-xs ${textColor} group-hover:underline inline-flex items-center justify-center gap-1`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      View Projects
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="space-y-6"> {/* Increased spacing between elements */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Find Projects</h2>
            <div className="flex flex-col md:flex-row gap-6"> {/* Increased gap between elements */}
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Language Dropdown */}
              <div className="w-full md:w-72 relative z-50 mb-8 md:mb-0"> {/* Maintain bottom margin only on mobile */}
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Programming Language</label>
                <div className="relative">
                  <Select
                    value={languageOptions.find(opt => opt.value === selectedFilter)}
                    onChange={(option) => setSelectedFilter(option ? option.value : 'all')}
                    options={[{ label: 'All Languages', value: 'all' }, ...languageOptions]}
                    styles={{
                      ...customStyles,
                      menuPortal: (base) => ({ 
                        ...base, 
                        zIndex: 99999,
                        pointerEvents: 'auto'
                      }),
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: localStorage.getItem('theme') === 'dark' ? '#000' : '#fff',
                        borderColor: localStorage.getItem('theme') === 'dark' ? '#555' : '#e5e7eb',
                        color: localStorage.getItem('theme') === 'dark' ? '#fff' : '#111',
                        padding: '6px', // Increased padding to match input height
                        minHeight: '46px', // Match input height
                      }),
                      // ...existing style overrides...
                    }}
                    className="w-full"
                    placeholder="Select Language..."
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    menuPlacement="auto"
                    menuShouldBlockScroll={true}
                    menuShouldScrollIntoView={false}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex flex-col justify-end md:pt-6"> {/* Added container with padding-top for alignment */}
                <button
                  onClick={() => toast.info(`Searching for "${searchQuery}" in ${selectedFilter} projects`)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Your Projects</h2>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project._id} 
                  className="group bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="p-6">
                    <div 
                      className="flex items-center gap-4 cursor-pointer" 
                      onClick={() => navigate("/editor/" + project._id)}
                    >
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          className="w-full h-full object-contain"
                          src={languageLogos[project.projLanguage]}
                          alt={project.projLanguage}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                            {project.projLanguage}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(project.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditModelShow(true);
                          setEditProjId(project._id);
                          setName(project.name);
                        }}
                        className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project._id);
                        }}
                        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Get started by creating your first project</p>
                <button
                  onClick={() => setIsCreateModelShow(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Create Project
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isCreateModelShow && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto touch-auto z-50"
          onClick={() => {
            setIsCreateModelShow(false);
            setName("");
            setSelectedLanguage(null);
          }}
        >
          <div 
            className="relative w-full max-w-md mx-auto my-4 p-4 md:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={e => e.stopPropagation()}
            style={{minHeight: 'fit-content'}}
          >
            {/* Close button - Made more touch-friendly */}
            <button
              onClick={() => {
                setIsCreateModelShow(false);
                setName("");
                setSelectedLanguage(null);
              }}
              className="absolute top-4 right-4 p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 touch-auto"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Create Project</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Create a new coding project by filling out the details below</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Programming Language</label>
                <Select
                  placeholder="Select a Language"
                  options={languageOptions}
                  styles={customStyles}
                  onChange={handleLanguageChange}
                />
              </div>

              {selectedLanguage && (
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Selected: {selectedLanguage.label}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsCreateModelShow(false);
                  setName("");
                  setSelectedLanguage(null);
                }}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createProj}
                disabled={!name || !selectedLanguage}
                className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600 shadow-lg hover:shadow-blue-500/25"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModelShow && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md relative shadow-2xl border border-gray-200 dark:border-gray-700">
            {/* Close button */}
            <button
              onClick={() => {
                setIsEditModelShow(false);
                setName("");
                setEditProjId("");
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Update Project</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Edit your project details below</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Project Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new project name"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsEditModelShow(false);
                  setName("");
                  setEditProjId("");
                }}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateProj}
                disabled={!name}
                className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
              >
                Update Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
