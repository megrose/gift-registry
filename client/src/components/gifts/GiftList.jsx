import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Add this import
import AddGiftForm from './AddGiftForm';

function GiftList() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate(); // Add this

    useEffect(() => {
        // If no user is logged in, redirect to login
        if (!currentUser) {
            navigate('/login');
            return;
        }
        
        loadGifts();
    }, [currentUser, navigate]);

    async function loadGifts() {
        if (!currentUser) return; // Add this check

        try {
            const giftQuery = query(
                collection(db, 'gifts'),
                where('userId', '==', currentUser.uid)
            );
            const querySnapshot = await getDocs(giftQuery);
            const giftList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setGifts(giftList);
        } catch (error) {
            setError('Failed to load gifts');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // ... rest of the component stays the same ...
}

export default GiftList;