import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaCode, FaCloud, FaBrain, FaRocket, FaUsers, FaShieldAlt, FaBook, FaHeadset, 
         FaDatabase, FaBug, FaTools, FaMobile, FaDesktop, FaGlobe, FaLaptopCode, 
         FaFileCode, FaCogs, FaChartLine, FaLock, FaServer } from 'react-icons/fa';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);

  const allServices = [
    {
      icon: <FaCode className="w-8 h-8" />,
      title: "Multi-Language Development",
      description: "Code in Python, JavaScript, Java, C++, and more with real-time syntax highlighting and error detection.",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Real-time syntax highlighting",
        "Error detection and debugging",
        "Multiple language support",
        "Code snippets and templates",
        "Customizable editor themes"
      ],
      codeExample: `// Example code
function welcomeMessage() {
  console.log("Welcome to Multi-Language IDE!");
}`,
    },
    {
      icon: <FaCloud className="w-8 h-8" />,
      title: "Cloud Storage",
      description: "Secure cloud storage for all your projects with automatic syncing and version control.",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Automatic syncing",
        "Version control",
        "Secure storage",
        "Easy access from anywhere",
        "Scalable storage solutions"
      ],
      codeExample: `// Example code
function saveToCloud() {
  console.log("Saving to cloud storage...");
}`,
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "AI Code Assistant",
      description: "Smart code suggestions and auto-completion powered by advanced AI algorithms.",
      gradient: "from-green-500 to-emerald-500",
      features: [
        "Smart code suggestions",
        "Auto-completion",
        "Error detection",
        "Code optimization",
        "Learning from user patterns"
      ],
      codeExample: `// Example code
function aiAssist() {
  console.log("AI assisting with code...");
}`,
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Instant Deployment",
      description: "Deploy your code instantly with our integrated deployment solutions.",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Instant deployment",
        "Integrated solutions",
        "Easy configuration",
        "Rollback options",
        "Monitoring and logging"
      ],
      codeExample: `// Example code
function deployCode() {
  console.log("Deploying code...");
}`,
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Code together with team members in real-time with live chat and shared workspaces.",
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "Real-time collaboration",
        "Live chat",
        "Shared workspaces",
        "Version control",
        "Team management"
      ],
      codeExample: `// Example code
function collaborate() {
  console.log("Collaborating in real-time...");
}`,
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Environment",
      description: "Enterprise-grade security with encrypted storage and secure code execution.",
      gradient: "from-teal-500 to-cyan-500",
      features: [
        "Encrypted storage",
        "Secure code execution",
        "Access control",
        "Regular security updates",
        "Compliance with standards"
      ],
      codeExample: `// Example code
function secureEnvironment() {
  console.log("Running in a secure environment...");
}`,
    },
    {
      icon: <FaBook className="w-8 h-8" />,
      title: "Learning Resources",
      description: "Access comprehensive documentation and tutorials for all supported languages.",
      gradient: "from-rose-500 to-pink-500",
      features: [
        "Comprehensive documentation",
        "Tutorials",
        "Code examples",
        "Community support",
        "Regular updates"
      ],
      codeExample: `// Example code
function learn() {
  console.log("Accessing learning resources...");
}`,
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support to help you with any issues.",
      gradient: "from-amber-500 to-orange-500",
      features: [
        "24/7 availability",
        "Technical support",
        "Issue resolution",
        "Live chat support",
        "Knowledge base"
      ],
      codeExample: `// Example code
function support() {
  console.log("Contacting support...");
}`
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,
      title: "Database Integration",
      description: "Connect and manage multiple databases seamlessly",
      gradient: "from-green-500 to-emerald-500",
      features: ["MySQL", "MongoDB", "PostgreSQL", "Redis"]
    },
    {
      icon: <FaBug className="w-8 h-8" />,
      title: "Advanced Debugging",
      description: "Powerful debugging tools for efficient problem solving",
      gradient: "from-red-500 to-pink-500",
      features: ["Breakpoints", "Variable inspection", "Step-by-step execution"]
    },
    {
      icon: <FaTools className="w-8 h-8" />,
      title: "Developer Tools",
      description: "Comprehensive suite of development tools",
      gradient: "from-purple-500 to-indigo-500",
      features: ["Terminal", "Git integration", "Package manager"]
    },
    {
      icon: <FaMobile className="w-8 h-8" />,
      title: "Mobile Development",
      description: "Build mobile apps with cross-platform support",
      gradient: "from-orange-500 to-yellow-500",
      features: ["React Native", "Flutter", "Mobile testing"]
    },
    {
      icon: <FaDesktop className="w-8 h-8" />,
      title: "Desktop Apps",
      description: "Create powerful desktop applications",
      gradient: "from-teal-500 to-cyan-500",
      features: ["Electron", "Cross-platform", "Native features"]
    },
    // Add 15 more services with similar structure...
  ];

  const handleGetStarted = () => {
    setShowAllServices(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-6">
              Our Services
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive development tools and services to enhance your coding experience.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllServices ? allServices : allServices.slice(0, 6)).map((service, index) => (
              <div 
                key={index} 
                className="group relative transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                <div className="relative bg-[#1a1a2e]/90 p-8 rounded-xl border border-gray-800/50 hover:border-blue-500/50">
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {!showAllServices && (
            <div className="text-center mt-12">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started - View All Services
              </button>
            </div>
          )}

          {/* Service Detail Modal */}
          {selectedService && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="relative bg-[#1a1a2e]/90 w-full max-w-3xl rounded-2xl p-8 border border-gray-800/50">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedService.gradient}`}>
                    {selectedService.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                </div>

                <p className="text-gray-300 mb-6">{selectedService.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Code Example</h4>
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur"></div>
                      <pre className="relative bg-black/50 p-4 rounded-lg overflow-x-auto">
                        <code className="text-gray-300 text-sm">{selectedService.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    className={`px-6 py-2 rounded-lg bg-gradient-to-r ${selectedService.gradient} text-white font-medium transform hover:scale-105 transition-all duration-300`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-20 text-center">
            {/* <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
              Get Start
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
