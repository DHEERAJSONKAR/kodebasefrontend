import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';
import logo from "../images/logos/logo.png";
import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner, FaCheck, FaLock } from 'react-icons/fa';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isBypassMode, setIsBypassMode] = useState(false);
  const navigate = useNavigate();

  // Check for token and dev bypass mode
  useEffect(() => {
    const resetToken = sessionStorage.getItem('resetToken');
    const resetEmail = localStorage.getItem('resetEmail');
    const bypassMode = sessionStorage.getItem('bypassTokenVerification');
    
    if (bypassMode === 'true') {
      console.log('Development mode: Bypassing token verification');
      setIsBypassMode(true);
      return;
    }
    
    if (!resetToken || !resetEmail) {
      toast.error('Password reset session expired or invalid');
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Validate passwords
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Get email either way
      const email = localStorage.getItem('resetEmail');
      
      if (!email) {
        setErrorMessage('Email not found. Please restart the password reset process.');
        setIsLoading(false);
        return;
      }
      
      // Different approach for development bypass mode vs normal flow
      let requestBody;
      if (isBypassMode) {
        // In bypass mode, send email directly since we don't have a token
        requestBody = { 
          email,
          newPassword: password,
          bypassToken: true // Tell backend this is a special case
        };
        console.log('Development mode: Using email instead of token');
      } else {
        // Normal mode - use the token
        const resetToken = sessionStorage.getItem('resetToken');
        if (!resetToken) {
          setErrorMessage('Reset token not found. Please restart the password reset process.');
          setIsLoading(false);
          return;
        }
        requestBody = { 
          resetToken,
          newPassword: password 
        };
      }
      
      const response = await fetch(`${api_base_url}/reset-password`, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log('Reset password response:', data);
      
      if (data.success) {
        setSuccess(true);
        toast.success('Password has been reset successfully!');
        
        // Clear reset data
        sessionStorage.removeItem('resetToken');
        sessionStorage.removeItem('bypassTokenVerification');
        localStorage.removeItem('resetEmail');
        
        // Redirect to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        if (data.msg && (
          data.msg.includes('invalid signature') || 
          data.msg.includes('jwt') || 
          data.msg.includes('token')
        )) {
          // Special handling for token errors
          setErrorMessage('Authentication error. Please restart the password reset process.');
          sessionStorage.removeItem('resetToken');
        } else {
          setErrorMessage(data.msg || 'Failed to reset password');
        }
        toast.error(errorMessage || data.msg || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setErrorMessage('Server error. Please try again later.');
      toast.error('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-4 bg-black rounded-lg shadow-md border border-gray-800">
        <div className="relative">
          <button
            onClick={() => navigate('/login')}
            className="absolute left-0 top-0 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
          >
            <FaArrowLeft size={20} />
          </button>

          <img 
            src={logo} 
            alt="Logo" 
            className="w-48 mx-auto transform hover:scale-110 transition-all duration-300 hover:brightness-110 hover:drop-shadow-[0_0_30px_rgba(59,_130,_246,_0.5)]" 
          />
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-500/20 rounded-full">
              <FaCheck className="text-green-500" size={30} />
            </div>
            <h2 className="text-2xl font-bold text-white">Password Reset Complete!</h2>
            <p className="text-gray-400">Your password has been updated successfully.</p>
            <p className="text-gray-400 text-sm">Redirecting to login page...</p>
            <Link 
              to="/login" 
              className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center">Reset Your Password</h2>
            <p className="text-gray-400 text-center text-sm">Create a new password for your account</p>
            
            {isBypassMode && (
              <div className="bg-blue-900/30 border border-blue-500 text-blue-200 px-4 py-2 rounded-lg text-sm">
                Development mode: Token verification bypassed
              </div>
            )}
            
            {errorMessage && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> 
                    Resetting Password...
                  </>
                ) : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
