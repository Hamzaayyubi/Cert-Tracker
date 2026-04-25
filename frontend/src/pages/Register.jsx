import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/dashboard'); }, [user, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) { setError('Please fill in all fields'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setIsSubmitting(true);
    const { name, email, password } = formData;
    const result = await register({ name, email, password });
    setIsSubmitting(false);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
  };

  const inputClass = "block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-dark-border rounded-xl bg-white dark:bg-dark-surface text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm";

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-dark-card p-10 rounded-2xl shadow-soft border border-gray-200 dark:border-dark-border">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
            <UserPlus className="text-secondary" size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-text-primary">Create account</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-text-secondary">
            Or{' '}<Link to="/login" className="font-medium text-primary hover:text-primary-hover">sign in to existing account</Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/15 border border-red-200 dark:border-red-800/30 text-red-700 dark:text-red-400 text-sm rounded-xl p-4">{error}</div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted"><User size={16} /></div>
              <input name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted"><Mail size={16} /></div>
              <input name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted"><Lock size={16} /></div>
              <input name="password" type="password" required value={formData.password} onChange={handleChange} className={inputClass} placeholder="••••••••" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-text-secondary mb-1.5">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted"><Lock size={16} /></div>
              <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className={inputClass} placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}
            className={`w-full flex justify-center py-2.5 px-4 rounded-xl text-sm font-medium text-white shadow-sm transition-colors ${isSubmitting ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
