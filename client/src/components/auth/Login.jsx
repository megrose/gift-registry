import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, resetPassword } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            const from = location.state?.from?.pathname || '/welcome';
            navigate(from);
        } catch (error) {
            setError('Failed to log in');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            return setError('Please enter your email address');
        }
        
        try {
            await resetPassword(email);
            setError('Check your email for password reset instructions');
        } catch (error) {
            setError('Failed to reset password');
        }
    };

    return (
        <div className="container">
            <div className="auth-form">
                <h2 className="text-center mb-3">Log In</h2>
                {error && <div className="error-message mb-2">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn primary-btn full-width mb-2" 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                
                <div className="auth-footer text-center mt-2">
                    <p className="mb-2">Need an account? <Link to="/register">Sign Up</Link></p>
                    <button 
                        onClick={handlePasswordReset} 
                        className="btn secondary-btn"
                        disabled={loading}
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;