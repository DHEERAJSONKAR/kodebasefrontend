import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';
import logo from "../images/logos/logo.png";
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: email input, 2: verification code
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Sending request to:', `${api_base_url}/forgot-password`);
      const response = await fetch(`${api_base_url}/forgot-password`, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Server response:', data);
      
      if (data.success) {
        toast.success('Verification code sent to your email');
        setStep(2);
      } else {
        // For development purposes, move to next step even if email sending fails
        if (process.env.NODE_ENV === 'development' && data.msg.includes('authentication failed')) {
          toast.info('DEV MODE: Proceeding despite email error');
          setStep(2);
          return;
        }
        
        // Handle specific error cases
        let errorMsg = data.msg || 'Failed to send verification code';
        if (errorMsg.includes('authentication failed')) {
          errorMsg = 'Email service authentication failed. Contacting admin...';
          // For testing purposes, you might want to still allow proceeding
          setTimeout(() => {
            setStep(2);
          }, 2000);
        } else if (errorMsg.includes('not found')) {
          errorMsg = 'No account found with this email address';
        }
        
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMsg = 'Server connection error. Please try again later.';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // For development testing with hardcoded code
      if (process.env.NODE_ENV === 'development' && verificationCode === '1234') {
        // Store email only, bypass token verification for development
        localStorage.setItem('resetEmail', email);
        sessionStorage.setItem('bypassTokenVerification', 'true'); // Use session storage for security
        toast.success('Code verified successfully (Development mode)');
        navigate('/reset-password');
        return;
      }

      const response = await fetch(`${api_base_url}/verify-reset-code`, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();
      console.log('Verification response:', data); 
      
      if (data.success) {
        if (!data.resetToken) {
          setErrorMessage('Server did not return a valid reset token');
          toast.error('Invalid server response. Please try again.');
          return;
        }
        
        // Store token in sessionStorage for better security
        localStorage.setItem('resetEmail', email);
        sessionStorage.setItem('resetToken', data.resetToken);
        toast.success('Code verified successfully');
        navigate('/reset-password');
      } else {
        setErrorMessage(data.msg || 'Invalid verification code');
        toast.error(data.msg || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Code verification error:', error);
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

        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-white text-center">Forgot Password?</h2>
            <p className="text-gray-400 text-center text-sm">Enter your email to receive a verification code</p>
            
            {errorMessage && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
                {errorMessage}
                {errorMessage.includes('authentication failed') && (
                  <div className="mt-2 text-xs">
                    This is usually a server configuration issue. You may proceed anyway for testing.
                  </div>
                )}
              </div>
            )}
            
            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> 
                    Sending...
                  </>
                ) : 'Send Verification Code'}
              </button>
              
              {/* For development testing only */}
              {process.env.NODE_ENV === 'development' && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full mt-2 text-gray-500 bg-gray-800/50 py-2 text-sm rounded"
                >
                  [DEV] Skip to Verification
                </button>
              )}
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center">Verification</h2>
            <p className="text-gray-400 text-center text-sm">
              Enter the 4-digit code sent to <span className="text-blue-400">{email}</span>
            </p>
            
            {errorMessage && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-800/50 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm">
                Development mode: Use code <code className="bg-gray-700 px-1 rounded">1234</code> for testing
              </div>
            )}
            
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    value={verificationCode[i] || ''}
                    onChange={(e) => {
                      const newCode = verificationCode.split('');
                      newCode[i] = e.target.value;
                      setVerificationCode(newCode.join(''));
                      if (e.target.value && e.target.nextElementSibling) {
                        e.target.nextElementSibling.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Handle backspace to move to previous input
                      if (e.key === 'Backspace' && !e.target.value && e.target.previousElementSibling) {
                        e.preventDefault();
                        e.target.previousElementSibling.focus();
                      }
                    }}
                  />
                ))}
              </div>
              <button
                type="submit"
                disabled={isLoading || (verificationCode.length !== 4 && process.env.NODE_ENV !== 'development')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> 
                    Verifying...
                  </>
                ) : 'Verify Code'}
              </button>
              <div className="flex justify-center space-x-4 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setVerificationCode('');
                    setErrorMessage('');
                  }}
                  className="text-purple-500 hover:text-purple-400"
                >
                  Resend Code
                </button>
                <span className="text-gray-600">|</span>
                <button
                  type="button"
                  onClick={() => {
                    setVerificationCode('');
                  }}
                  className="text-purple-500 hover:text-purple-400"
                >
                  Clear
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
