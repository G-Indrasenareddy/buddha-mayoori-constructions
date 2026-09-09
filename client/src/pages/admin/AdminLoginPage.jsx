import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import logoImg from '../../assets/buddha-mayoori-logo.jpg';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  if (isAuthenticated) {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email/username and password');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const result = await login(email.trim(), password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 border border-slate-200">
        <div className="text-center mb-6">
          <img
            src={logoImg}
            alt="Buddha Mayoori Constructions Logo"
            className="h-16 w-16 mx-auto object-contain rounded border border-slate-200 p-1 mb-3 bg-white"
          />
          <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
          <p className="text-xs text-slate-500 mt-1">Buddha Mayoori Constructions Management Console</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            name="email"
            type="text"
            label="Email or Username"
            placeholder="e.g. admin@buddhamayoori.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" fullWidth size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Authenticating...' : 'Sign In to Console'}
          </Button>
        </form>
      </div>
    </div>
  );
};
