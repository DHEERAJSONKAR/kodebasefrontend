import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { FaGithub, FaLinkedin, FaInstagram, FaPhone, FaMapMarkerAlt, FaCode, FaArrowLeft } from 'react-icons/fa';
import dkphoto from '../assets/dkphoto.ico'; // Add this import - you'll need to add your image
import { useNavigate } from 'react-router-dom';

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const navigate = useNavigate();

  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      label: 'GitHub',
      value: 'github.com/DheerajSonkar',
      link: 'https://github.com/DHEERAJSONKAR',
      color: 'hover:text-gray-200'
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/DheerajSonkar',
      link: 'https://www.linkedin.com/in/dheeraj-sonkar-304b982b7/',
      color: 'hover:text-blue-400'
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      label: 'Instagram',
      value: '@DheerajSonkar454',
      link: 'https://www.instagram.com/dheerajsonkar454/',
      color: 'hover:text-pink-400'
    },
    {
      icon: <FaCode className="w-6 h-6" />,
      label: 'LeetCode',
      value: 'leetcode.com/DheerajSonkar',
      link: 'https://leetcode.com/u/Dheeraj_Sonkar/',
      color: 'hover:text-yellow-400'
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      label: 'Phone',
      value: '+91 7392012757',
      link: 'tel:+917392012757',
      color: 'hover:text-green-400'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        'service_9i4i9vg', // Replace with your service ID
        'template_7d8yzq5', // Replace with your template ID
        form.current,
        'pYY61skb2VjjjNtdt' // Replace with your public key
      );

      if (result.text === 'OK') {
        toast.success('Message sent successfully!');
        form.current.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* Mobile Back Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-sm z-50 flex items-center px-4 md:hidden border-b border-gray-800/50">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="min-h-screen bg-black pt-20 md:pt-16">
        <div className="relative px-3 sm:px-6 lg:px-8">
          {/* Optimized Mobile Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-40 sm:w-48 md:w-96 h-40 sm:h-48 md:h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-40 sm:w-48 md:w-96 h-40 sm:h-48 md:h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto py-8 md:py-24">
            {/* Profile Section with better touch targets */}
            <div className="flex flex-col items-center mb-6 md:mb-16 animate-fadeIn">
              <div className="relative group cursor-pointer touch-manipulation">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-tilt group-hover:animate-spin-slow"></div>
                <div className="relative h-24 w-24 md:h-32 lg:h-40 md:w-32 lg:w-40 rounded-full overflow-hidden border-2 border-white/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={dkphoto}
                    alt="Profile"
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Profile';
                    }}
                  />
                </div>
                {/* Floating badges - Adjusted for mobile */}
                <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 bg-blue-500 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  Developer
                </div>
                <div className="absolute -bottom-1 md:-bottom-2 -left-1 md:-left-2 bg-purple-500 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full transform -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  fullStack
                </div>
              </div>
              
              {/* Name and title section - Made responsive */}
              <h2 className="mt-4 md:mt-6 text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:scale-110 transition-transform duration-300">
                Dheeraj Sonkar
              </h2>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <p className="text-gray-400 text-xs md:text-sm lg:text-base font-medium">Full Stack Developer</p>
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-1 md:mt-2">
                  <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                    React.js
                  </span>
                  <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                    Node.js
                  </span>
                  <span className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20">
                    JavaScript
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Section Title - Enhanced for mobile */}
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Get in Touch
              </h1>
              <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-400">Your thoughts matter—drop me a message!</p>
            </div>

            {/* Grid Layout - Improved responsiveness */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
              {/* Contact Form - Enhanced mobile view */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-[#1a1a2e]/90 p-4 md:p-8 rounded-xl border border-gray-800/50">
                  <form ref={form} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Form fields with improved mobile styling */}
                    <div>
                      <label className="text-gray-300 text-xs md:text-sm font-medium mb-1 md:mb-2 block">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-black/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-xs md:text-sm font-medium mb-1 md:mb-2 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-black/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-xs md:text-sm font-medium mb-1 md:mb-2 block">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows="4"
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-black/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 md:py-3 text-sm md:text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Social Links - Mobile optimized */}
              <div className="space-y-4 md:space-y-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group block touch-manipulation"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <div className="relative bg-[#1a1a2e]/90 p-5 sm:p-4 md:p-6 rounded-xl border border-gray-800/50 flex items-center gap-4 transform active:scale-95 hover:-translate-y-1 transition-all duration-300">
                      <div className={`text-gray-400 ${social.color} transition-colors`}>
                        {React.cloneElement(social.icon, {
                          className: "w-6 h-6 sm:w-5 sm:h-5 md:w-6 md:h-6"
                        })}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-300 text-base sm:text-sm md:text-base">{social.label}</div>
                        <div className="text-gray-400 text-sm sm:text-xs md:text-sm truncate">{social.value}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
