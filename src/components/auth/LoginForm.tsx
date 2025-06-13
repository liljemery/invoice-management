import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Input
          label="Username"
          id="username"
          name="username"
          type="text"
          leftIcon={<User size={18} />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
        />
      </div>

      <div>
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          leftIcon={<Lock size={18} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
      </div>

      {error && (
        <div className="bg-error-50 text-error-800 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Demo credentials:</p>
        <p className="font-medium">Admin: admin / password</p>
        <p className="font-medium">Sales: sales / password</p>
      </div>
    </form>
  );
};

export default LoginForm;