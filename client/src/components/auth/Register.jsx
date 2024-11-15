import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import withLoveLogo from '../../assets/with-love-logo.png';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await signup(formData.email, formData.password);
            navigate('/welcome');
        } catch (err) {
            setError('Failed to create an account: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="auth-form">
                <h1 className="text-center mb-3">Create Your Account</h1>
                
                {error && <div className="error-message mb-2">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group mb-2">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="eMail" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-group mb-2">
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn primary-btn full-width mb-2"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <div className="text-center mt-2">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;