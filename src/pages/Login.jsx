import React, { useEffect, useState } from 'react';
import logo from "../images/logos/logo.png";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Make sure this is added

  // Update the GitHub login handler if needed
  const handleGitHubLogin = () => {
    try {
      console.log("Redirecting to GitHub auth from Login...");
      window.location.href = `${api_base_url}/auth/github`;
    } catch (error) {
      console.error("GitHub auth error:", error);
      toast.error('GitHub authentication failed. Please try again.');
    }
  };

  // Add Google login handler
  const handleGoogleLogin = () => {
    try {
      console.log("Redirecting to Google auth from Login...");
      window.location.href = `${api_base_url}/auth/google`;
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error('Google authentication failed. Please try again.');
    }
  };

  // Add Facebook login handler
  const handleFacebookLogin = () => {
    try {
      console.log("Redirecting to Facebook auth from Login...");
      window.location.href = `${api_base_url}/auth/facebook`;
    } catch (error) {
      console.error("Facebook auth error:", error);
      toast.error('Facebook authentication failed. Please try again.');
    }
  };

  // Check for token in URL params (for OAuth callbacks)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const fullName = params.get('fullName');
    const error = params.get('error');
    
    if (error) {
      if (error === 'google_auth_failed') {
        toast.error('Google authentication failed. Please try again.');
      } else if (error === 'facebook_auth_failed') {
        toast.error('Facebook authentication failed. Please try again.');
      } else if (error === 'github_auth_failed') {
        toast.error('GitHub authentication failed. Please try again.');
      } else if (error === 'google_auth_not_configured') {
        toast.error('Google authentication is not properly configured. Please try another method.');
      } else if (error === 'facebook_auth_not_configured') {
        toast.error('Facebook authentication is not properly configured. Please try another method.');
      }
      return;
    }
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      if (fullName) {
        localStorage.setItem('fullName', decodeURIComponent(fullName));
      }
      
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true
      });
      
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
    }
  }, [navigate, location.search]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${api_base_url}/login`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          pwd: pwd,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Set all data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("fullName", data.fullName);

        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true
        });

        // Single timeout for both navigation and reload
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);

      } else {
        toast.error(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-4 bg-black rounded-lg shadow-md border border-gray-800">
        <div className="text-center">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-48 mx-auto transform hover:scale-110 transition-all duration-300 hover:brightness-110 hover:drop-shadow-[0_0_30px_rgba(59,_130,_246,_0.5)]" 
          />
          <h2 className="mt-4 text-2xl font-bold text-white">Login</h2>
          <p className="text-sm text-gray-400">
            Don't have an account yet?{' '}
            <Link to="/signUp" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter 6 characters or more"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] transform text-gray-400 hover:text-gray-300 z-10"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 border-gray-700 rounded focus:ring-blue-400 bg-gray-800"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">or login with</p>
          <div className="flex justify-center mt-2 space-x-4">
            <button 
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              onClick={handleGoogleLogin}
              type="button"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
                alt="Google"
                className="w-5 h-5"
              />
            </button>
            <button 
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              onClick={handleFacebookLogin}
              type="button"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
            <button 
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              onClick={handleGitHubLogin}
              type="button"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;