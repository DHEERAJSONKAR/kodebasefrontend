import React from 'react';
import Navbar from '../components/Navbar';
import { FaGithub, FaCode, FaLaptopCode, FaBrain, FaRocket, FaDatabase, FaCloud, FaCog, FaBolt } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaCode className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "Code in Python, JavaScript, Java, C++, and many more languages"
    },
    {
      icon: <FaLaptopCode className="w-8 h-8" />,
      title: "Real-time Compilation",
      description: "Compile and run your code instantly with real-time feedback"
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "Smart Features",
      description: "Intelligent code completion and syntax highlighting"
    }
  ];

  const codeSnippet = `function CodeEditor() {
  const [features] = useState([
    "Multi-Language Support",
    "Real-time Compilation",
    "Cloud Storage"
  ]);

  useEffect(() => {
    console.log("Welcome to Multi-Code IDE!");
  }, []);

  return (
    <div className="editor">
      {/* Your code starts here */}
      Happy Coding! 🚀
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center relative mb-20">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl"></div>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              About Our IDE
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto">
            Your modern coding companion that makes development efficient and enjoyable.
          </p>
        </div>

        {/* Animated Code Editor Section */}
        <div className="mb-20 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Modern Code Editor
                </h2>
                <p className="text-gray-400">Experience coding with our powerful editor featuring:</p>
                <ul className="space-y-2">
                  {[
                    "Real-time syntax highlighting",
                    "Auto-completion",
                    "Simpe themes",
                    "Code snippets"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <div className="group/editor relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover/editor:opacity-75 transition duration-1000"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between bg-[#1a1a2e] rounded-t-lg p-4 border-b border-gray-800">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-sm text-gray-500">main.py</div>
                    </div>
                    <div className="bg-black rounded-b-lg p-4">
                      <pre className="text-sm">
                        <code className="text-blue-400">def <span className="text-green-400">hello_world</span>():</code>
                        <code className="text-gray-300">
                          {"\n    "}print(<span className="text-yellow-300">"Welcome to Multi-Code IDE!"</span>)
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500">
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New Floating Cards Section */}
        <div className="py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBolt className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Instant code execution and real-time feedback",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: <FaCloud className="w-8 h-8" />,
                title: "Cloud Powered",
                description: "Your code, accessible anywhere, anytime",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <FaCog className="w-8 h-8" />,
                title: "Smart Features",
                description: "AI-powered code suggestions and auto-completion",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((card, index) => (
              <div
                key={index}
                className="group relative transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.gradient} rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500`}></div>
                <div className="relative bg-[#1a1a2e]/90 p-8 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-500">
                  <div className="absolute right-4 top-4 text-gray-600/20 group-hover:text-gray-500/40 transition-colors duration-500">
                    {card.icon}
                  </div>
                  <div className="text-3xl bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent font-bold mb-4">
                    {card.title}
                  </div>
                  <p className="text-gray-400">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20 relative">
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50"></div>
          {[
            {
              year: "2025",
              title: "Multi-Language Support Added",
              description: "Expanded our IDE to support multiple programming languages"
            },
            
          ].map((item, index) => (
            <div key={index} className="relative pl-8 md:pl-0 mb-12 group">
              <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 md:px-12">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative bg-[#1a1a2e]/90 p-6 rounded-lg border border-gray-800/50">
                      <div className="text-blue-400 font-bold mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <FaRocket className="w-6 h-6" />,
              title: "Fast Execution",
              description: "Lightning-fast code compilation and execution"
            },
            {
              icon: <FaGithub className="w-6 h-6" />,
              title: "Git Integration",
              description: "Seamless GitHub integration for version control"
            },
            {
              icon: <FaDatabase className="w-6 h-6" />,
              title: "Cloud Storage",
              description: "Secure cloud storage for all your projects"
            }
          ].map((feature, index) => (
            <div key={index} className="group relative transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-[#1a1a2e]/90 p-6 rounded-xl border border-gray-800/50">
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New Interactive Code Demo */}
        <div className="mb-20 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 text-xs bg-blue-500/20 rounded-full text-blue-400">Python</span>
                  <span className="px-2 py-1 text-xs bg-green-500/20 rounded-full text-green-400">Online</span>
                </div>
              </div>
              <div className="font-mono text-sm">
                <div className="typing-effect">
                  <span className="text-purple-400">def </span>
                  <span className="text-blue-400">hello_world</span>
                  <span className="text-white">(</span>
                  <span className="text-white">):</span>
                  <br />
                  <span className="text-gray-400 ml-4">print</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">"Welcome to Multi-Code IDE!"</span>
                  <span className="text-white">)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="relative group bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative bg-[#1a1a2e] p-6 rounded-xl border border-gray-800/50">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Smart Completions
              </h3>
              <p className="text-gray-400 mb-4">
                AI-powered code suggestions that help you write better code faster.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "JavaScript", "Java", "C++"].map((lang, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-1 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative bg-[#1a1a2e] p-6 rounded-xl border border-gray-800/50">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Real-time Collaboration
              </h3>
              <p className="text-gray-400 mb-4">
                Code together in real-time with team members anywhere in the world.
              </p>
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-[#1a1a2e]"></div>
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">
                  +5
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Process Section */}
        <div className="mb-20 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
              Development Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Planning",
                  description: "Careful consideration of features and architecture"
                },
                {
                  step: "02",
                  title: "Development",
                  description: "Clean code with modern technologies"
                },
                {
                  step: "03",
                  title: "Testing",
                  description: "Rigorous testing for reliability"
                },
                {
                  step: "04",
                  title: "Deployment",
                  description: "Smooth and continuous deployment"
                }
              ].map((item, index) => (
                <div key={index} className="relative group/item">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover/item:opacity-100 transition duration-500"></div>
                  <div className="relative p-6 bg-black/50 rounded-lg border border-gray-800/50">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{item.step}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-20 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
              Technologies We Use
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "React", "Node.js", "MongoDB", "Express",
                "JavaScript", "TailwindCSS", "Css", " API"
              ].map((tech, index) => (
                <div key={index} className="group/tech relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur"></div>
                  <div className="relative p-4 bg-black/30 rounded-lg border border-gray-800/50 text-center hover:border-blue-500/50 transition-all duration-300">
                    <span className="text-gray-300 group-hover/tech:text-blue-400 transition-colors">
                      {tech}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Preview */}
        <div className="relative group mb-20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-black/80 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-500">editor.jsx</div>
            </div>
            <pre className="overflow-x-auto">
              <code className="text-sm md:text-base font-mono text-gray-300">{codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl p-8 rounded-xl border border-gray-800/50">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: "Front-end Developer",
                  skills: [ "Himanshu kumar"]
                },
                {
                  role: "Back-end Developer",
                  skills: ["Dheeraj Sonkar"]
                },
                {
                  role: "Full Stack Developer",
                  skills: ["Dheeraj Sonkar"]
                }
              ].map((member, index) => (
                <div key={index} className="group/member relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur opacity-25 group-hover/member:opacity-75 transition duration-500"></div>
                  <div className="relative p-6 bg-black/50 rounded-lg border border-gray-800/50">
                    <h3 className="text-xl font-semibold text-white mb-3">{member.role}</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 text-sm bg-purple-500/20 rounded-full text-purple-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10+", label: "Languages" },
            { number: "100+", label: "Projects" },
            { number: "27/7", label: "Support" },
            { number: "90%", label: "Secure" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {stat.number}
              </div>
              <div className="text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
