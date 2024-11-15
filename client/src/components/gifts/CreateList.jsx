import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './CreateList.css';
import giftIcon from '../../assets/gift-icon.png';

const CreateList = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [dateValue, setDateValue] = useState('');
    const [formData, setFormData] = useState({
        recipientName: '',
        relation: '',
        dob: '',
        isPublic: ''
    });

    const handleDateInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        
        if (value.length >= 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
        } else if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        
        setDateValue(value);
        setFormData(prev => ({
            ...prev,
            dob: value
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            console.error('No user logged in');
            // TODO: Redirect to login or show error
            return;
        }

        try {
            // Create registry in database
            const registryRef = await createRegistry({
                ...formData,
                userId: currentUser.uid,
                createdAt: new Date(),
            });

            // Navigate to the new registry with unique URL
            navigate(`/user/${currentUser.uid}/registry/${registryRef.id}`, {
                state: { 
                    registryData: {
                        ...formData,
                        id: registryRef.id,
                        userId: currentUser.uid,
                        createdAt: new Date().toISOString()
                    }
                }
            });
        } catch (error) {
            console.error('Error creating registry:', error);
            // TODO: Add proper error handling/display
        }
    };

    return (
        <div className="create-list-page">
            <main className="create-list-content">
                <div className="create-list-card">
                    <img 
                        src={giftIcon} 
                        alt="Gift Icon" 
                        className="gift-icon"
                    />
                    
                    <h1>Let's create your gift list!</h1>
                    
                    <form className="gift-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="recipientName">Name</label>
                            <input 
                                type="text" 
                                id="recipientName" 
                                name="recipientName"
                                className="form-input"
                                placeholder="Recipient's name"
                                value={formData.recipientName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="relation">Relation</label>
                            <select 
                                id="relation" 
                                name="relation" 
                                className="form-select" 
                                value={formData.relation}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select relation...</option>
                                <option value="self">Self</option>
                                <option value="child">Child</option>
                                <option value="partner">Partner</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">Birth date</label>
                            <input 
                                type="text" 
                                id="dob" 
                                name="dob"
                                placeholder="mm/dd/yyyy"
                                className="form-input"
                                maxLength="10"
                                value={dateValue}
                                onChange={handleDateInput}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="isPublic">List privacy</label>
                            <select 
                                id="isPublic" 
                                name="isPublic" 
                                className="form-select"
                                value={formData.isPublic}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select privacy setting...</option>
                                <option value="yes">Public</option>
                                <option value="no">Private</option>
                            </select>
                        </div>

                        <button type="submit" className="button button-full-width">
                            Get Started
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

const createRegistry = async (registryData) => {
    const response = await fetch('/api/registries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registryData)
    });

    if (!response.ok) {
        throw new Error('Failed to create registry');
    }

    return await response.json();
};

export default CreateList;