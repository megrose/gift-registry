import { Link } from 'react-router-dom';
import './LandingPage.css';
import giftIllustration from '../../assets/gift-illustration.png';
import Header from './Header';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <main className="main-content">
                <div className="landing-card">
                    <div className="landing-content">
                        <img 
                            src={giftIllustration} 
                            alt="Gift giving illustration" 
                            className="landing-illustration"
                        />
                        <div className="landing-text">
                            <h1>Find and manage gifts for people you love</h1>
                            <Link to="/register" className="btn primary-btn">
                            Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;