import { useState } from 'react';

function AddGiftForm({ onSubmit, onCancel }) {
    const [giftData, setGiftData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        purchaseUrl: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(giftData);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setGiftData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="add-gift-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Gift Name</label>
                    <input
                        type="text"
                        name="name"
                        value={giftData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={giftData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={giftData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={giftData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Purchase URL</label>
                    <input
                        type="url"
                        name="purchaseUrl"
                        value={giftData.purchaseUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">
                        Add Gift
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddGiftForm;