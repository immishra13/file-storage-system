import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Cloud, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import './AuthPage.css';

function AuthPage({ type }) {
  const isLogin = type === 'login';
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }

    if (!isLogin && !formData.name) {
      return toast.error("Name is required for signup");
    }

    try {
      setLoading(true);
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success("Welcome back!");
      } else {
        await signup(formData.email, formData.password, formData.name);
        toast.success("Account created successfully!");
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <Link to="/" className="back-link flex items-center gap-2">
        <ArrowLeft size={16} /> Back to home
      </Link>
      
      <div className="auth-card card">
        <div className="auth-header text-center">
          <div className="logo flex items-center justify-center gap-2 mb-4">
            <Cloud size={32} color="var(--primary-color)" fill="var(--primary-color)" />
          </div>
          <h2>{isLogin ? 'Sign in to CloudDrive' : 'Create your account'}</h2>
          <p className="subtitle">
            {isLogin ? 'Enter your details to proceed.' : 'Join us and start organizing.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="floating-input-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                className="floating-input"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name" className="floating-label">Full Name</label>
            </div>
          )}

          <div className="floating-input-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              className="floating-input"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email" className="floating-label">Email address</label>
          </div>

          <div className="floating-input-group">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=" "
              className="floating-input"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="floating-label">Password</label>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4" 
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-footer text-center mt-8">
          {isLogin ? (
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
