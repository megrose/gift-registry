import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Registry.css';

function Registry() {
    const { userId, registryId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [registry, setRegistry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registries, setRegistries] = useState([]);
    const [giftItems, setGiftItems] = useState([]);
    
    const registryData = location.state?.registryData || registry;

    useEffect(() => {
        const fetchRegistry = async () => {
            try {
                const registryData = await getRegistry(userId, registryId);
                
                if (registryData.userId !== currentUser?.uid) {
                    navigate('/unauthorized');
                    return;
                }

                setRegistry(registryData);
                const userRegistries = await getUserRegistries(currentUser.uid);
                setRegistries(userRegistries);
            } catch (error) {
                console.error('Error fetching registry:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!location.state?.registryData) {
            fetchRegistry();
        } else {
            setLoading(false);
        }
    }, [userId, registryId, currentUser, navigate, location.state]);

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

    if (loading) return <div>Loading...</div>;
    if (!registryData) return <div>Registry not found</div>;

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
                    <div className="action-buttons">
                        <button 
                            className="btn primary-btn"
                            onClick={handleShareList}
                        >
                            Share list
                        </button>
                        <button 
                            className="btn primary-btn"
                            onClick={handleAddItems}
                        >
                            Add items
                        </button>
                    </div>
                </div>

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

const getRegistry = async (userId, registryId) => {
    const response = await fetch(`/api/registries/${registryId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch registry');
    }
    return await response.json();
};

const getUserRegistries = async (userId) => {
    const response = await fetch(`/api/users/${userId}/registries`);
    if (!response.ok) {
        throw new Error('Failed to fetch user registries');
    }
    return await response.json();
};

export default Registry;