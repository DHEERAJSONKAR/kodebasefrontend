import React, { useState, useEffect } from 'react';
import logo from "../images/logos/logo.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF, FaGithub } from 'react-icons/fa';

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check for errors in URL (from OAuth callbacks)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    
    if (error === 'google_auth_failed') {
      toast.error('Google authentication failed. Please try again.');
    } else if (error === 'facebook_auth_failed') {
      toast.error('Facebook authentication failed. Please try again.');
    } else if (error === 'google_auth_not_configured') {
      toast.error('Google authentication is not properly configured. Please try another method.');
    } else if (error === 'facebook_auth_not_configured') {
      toast.error('Facebook authentication is not properly configured. Please try another method.');
    }
  }, [location]);

  const submitForm = (e) => {
    e.preventDefault();
    
    // Add basic validation
    if (!fullName || !email || !pwd) {
      toast.error("All fields are required");
      return;
    }
    
    if (pwd.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    // Show loading state
    const loadingToast = toast.loading("Creating your account...");
    
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd
      })
    })
    .then(res => res.json())
    .then(data => {
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      
      if (data.success) {
        localStorage.setItem("fullName", fullName);
        toast.success("Account created successfully! Please log in.");
        navigate("/login");
      } else {
        toast.error(data.msg || "Error creating account");
      }
    })
    .catch(err => {
      // Dismiss the loading toast
      toast.dismiss(loadingToast);
      console.error("Signup error:", err);
      toast.error("Network error. Please try again later.");
    });
  };

  const handleGoogleSignUp = () => {
    try {
      console.log("Redirecting to Google auth...");
      window.location.href = `${api_base_url}/auth/google`;
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error('Google authentication is not available. Please try another method.');
    }
  };

  const handleFacebookSignUp = () => {
    try {
      console.log("Redirecting to Facebook auth...");
      window.location.href = `${api_base_url}/auth/facebook`;
    } catch (error) {
      console.error("Facebook auth error:", error);
      toast.error('Facebook authentication is not available. Please try another method.');
    }
  };

  const handleGithubSignUp = () => {
    try {
      console.log("Redirecting to GitHub auth...");
      window.location.href = `${api_base_url}/auth/github`;
    } catch (error) {
      console.error("GitHub auth error:", error);
      toast.error('GitHub authentication is not available. Please try another method.');
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-black relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.98))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-xy"></div>
      
      <div className="relative bg-black/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(139,_92,_246,_0.3)] rounded-lg p-8 w-full max-w-md border border-gray-800/50 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="System logo" 
            className="w-[280px] object-contain transform hover:scale-110 transition-all duration-300 hover:brightness-110 hover:drop-shadow-[0_0_30px_rgba(59,_130,_246,_0.5)]" 
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Welcome to login system</h2>
        <p className="text-center text-gray-400 mb-6">Sign up by entering your information</p>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400 hover:shadow-[0_5px_15px_rgba(139,_92,_246,_0.15)] transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 hover:shadow-[0_5px_15px_rgba(168,_85,_247,_0.2)] transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 hover:shadow-[0_5px_15px_rgba(168,_85,_247,_0.2)] transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-400">
              <input type="checkbox" className="mr-2 rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-black/50" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-purple-500 hover:text-purple-400 transition-colors">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 transform hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(168,_85,_247,_0.4)]"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">Already have an account? 
            <Link to="/login" className="text-purple-500 hover:text-purple-400 ml-1 transition-colors">
              Login
            </Link>
          </p>
        </div>
        
        <div className="relative flex items-center justify-center mt-6">
          <div className="absolute border-t border-gray-700 w-full"></div>
          <div className="relative px-4 bg-black text-gray-400">Or continue with</div>
        </div>
        
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleGoogleSignUp}
            className="p-3 bg-black/50 border border-gray-700 rounded-full hover:bg-gray-800 transition-all duration-300 group hover:shadow-[0_5px_15px_rgba(239,_68,_68,_0.5)] transform hover:scale-110"
            type="button"
          >
            <FaGoogle className="text-gray-400 group-hover:text-red-500 transform transition-all duration-200" size={20} />
          </button>
          <button
            onClick={handleFacebookSignUp}
            className="p-3 bg-black/50 border border-gray-700 rounded-full hover:bg-gray-800 transition-all duration-300 group hover:shadow-[0_5px_15px_rgba(59,_130,_246,_0.5)] transform hover:scale-110"
            type="button"
          >
            <FaFacebookF className="text-gray-400 group-hover:text-blue-500 transform transition-all duration-200" size={20} />
          </button>
          <button
            onClick={handleGithubSignUp}
            className="p-3 bg-black/50 border border-gray-700 rounded-full hover:bg-gray-800 transition-all duration-300 group hover:shadow-[0_5px_15px_rgba(255,_255,_255,_0.5)] transform hover:scale-110"
            type="button"
          >
            <FaGithub className="text-gray-400 group-hover:text-white transform transition-all duration-200" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;