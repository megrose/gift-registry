import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Registry.css';

const getRegistry = async (userId, registryId) => {
    try {
        const response = await fetch(`/api/registries/${registryId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Registry data received:', data);
        return data;
    } catch (error) {
        console.error('getRegistry error:', error);
        throw error;
    }
};

const getUserRegistries = async (userId) => {
    try {
        const response = await fetch(`/api/users/${userId}/registries`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('User registries received:', data);
        return data;
    } catch (error) {
        console.error('getUserRegistries error:', error);
        throw error;
    }
};

const testAPI = async () => {
    try {
        const response = await fetch('http://localhost:5001/api/registries/test');
        console.log('API Test Response:', response);
        const data = await response.json();
        console.log('API Test Data:', data);
    } catch (error) {
        console.error('API Test Error:', error);
    }
};

function Registry() {
    const { userId, registryId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [registry, setRegistry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registries, setRegistries] = useState([]);
    const [giftItems, setGiftItems] = useState([]);
    const [error, setError] = useState(null);

    const registryData = location.state?.registryData || registry;

    console.log('Current User:', currentUser);
    console.log('URL Params:', { userId, registryId });
    console.log('Registry Data:', registryData);
    console.log('Loading:', loading);
    console.log('Error:', error);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const effectiveUserId = userId || currentUser?.uid;
                console.log('Effective User ID:', effectiveUserId);

                if (!effectiveUserId) {
                    setError('Please log in to view registries');
                    setLoading(false);
                    return;
                }

                // First try to get user's registries
                try {
                    const userRegistries = await getUserRegistries(effectiveUserId);
                    console.log('Fetched registries:', userRegistries);
                    setRegistries(Array.isArray(userRegistries) ? userRegistries : []);

                    if (!registryId && userRegistries && userRegistries.length > 0) {
                        console.log('Navigating to first registry:', userRegistries[0].id);
                        navigate(`/registry/${effectiveUserId}/${userRegistries[0].id}`);
                        return;
                    }

                    if (registryId) {
                        const registryData = await getRegistry(effectiveUserId, registryId);
                        console.log('Fetched specific registry:', registryData);
                        setRegistry(registryData);
                    }
                } catch (apiError) {
                    console.error('API Error:', apiError);
                    setError(`API Error: ${apiError.message}`);
                }
            } catch (error) {
                console.error('General Error:', error);
                setError('Failed to load registry data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, registryId, currentUser, navigate]);

    if (loading) return <div className="registry-container">Loading registry data...</div>;
    if (error) return <div className="registry-container">Error: {error}</div>;
    if (!currentUser) return <div className="registry-container">Please log in to view registries</div>;
    if (!registryData && registries.length === 0) {
        return (
            <div className="registry-container">
                <h2>No Registries Found</h2>
                <p>You haven't created any registries yet.</p>
                <button
                    className="btn primary-btn"
                    onClick={() => navigate('/create-registry')}
                >
                    Create Your First Registry
                </button>
            </div>
        );
    }

    if (!registryData) {
        return <div className="registry-container">Loading registry details...</div>;
    }

    const handleAddItems = () => {
        // TODO: Implement add items functionality
        console.log('Add items clicked');
    };

    const handleShareList = () => {
        // TODO: Implement share functionality
        console.log('Share list clicked');
    };

    const handleEditDetails = () => {
        // TODO: Implement edit functionality
        console.log('Edit details clicked');
    };

    const handleRegistryChange = (e) => {
        const selectedRegistryId = e.target.value;
        if (selectedRegistryId) {
            navigate(`/registry/${currentUser.uid}/${selectedRegistryId}`);
        }
    };

    return (
        <div className="registry-container">
            {/* Left Sidebar */}
            <div className="registry-sidebar">
                <div className="registry-selector">
                    <h3>Change registry</h3>
                    <select
                        value={registryId}
                        onChange={handleRegistryChange}
                    >
                        {registries.map(reg => (
                            <option key={reg.id} value={reg.id}>
                                {reg.recipientName}'s registry
                            </option>
                        ))}
                    </select>
                </div>

                <div className="registry-details-card">
                    <h2>Registry Details</h2>
                    <div className="details-content">
                        <p><strong>Recipient:</strong> {registryData.recipientName}</p>
                        <p><strong>Relation:</strong> {registryData.relation}</p>
                        <p><strong>Birth Date:</strong> {registryData.dob}</p>
                        <p><strong>Privacy:</strong> {registryData.isPublic === 'yes' ? 'Public' : 'Private'}</p>
                    </div>
                    <button
                        className="btn secondary-btn"
                        onClick={handleEditDetails}
                    >
                        Edit Details
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="registry-main">
                <div className="registry-header">
                    <h1>{registryData.recipientName}'s Registry</h1>
                    <div className="registry-actions">
                        <button
                            className="btn primary-btn"
                            onClick={handleAddItems}
                        >
                            Add items
                        </button>
                        <button
                            className="btn primary-btn"
                            onClick={handleShareList}
                        >
                            Share list
                        </button>
                    </div>
                </div>

                <hr className="registry-divider" />

                <div className="gift-items-grid">
                    {giftItems.length > 0 ? (
                        giftItems.map(item => (
                            <div key={item.id} className="gift-item-card">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-brand">{item.brand}</div>
                                <div className="item-name">{item.name}</div>
                                <div className="item-price">${item.price.toFixed(2)}</div>
                                <div className="shipping-status">FREE SHIPPING</div>
                                <div className="purchase-controls">
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        className="quantity-input"
                                    />
                                    <button className="btn buy-btn">BUY NOW</button>
                                </div>
                                <div className="item-status">
                                    REQUESTED: {item.requested} · STILL NEEDS: {item.stillNeeds}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-items-message">
                            <p>No items added yet</p>
                            <button
                                className="btn primary-btn"
                                onClick={handleAddItems}
                            >
                                Add your first item
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Registry;