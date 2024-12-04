import { Link } from 'react-router-dom';
import './WelcomePage.css';
import withLoveLogo from '../../assets/with-love-logo.png';
import giftIcon from '../../assets/gift-icon.png';

const WelcomePage = () => {
    return (
        <div className="welcome-page">
            {/* Main content */}
            <main className="main-content">
                <div className="welcome-card">
                    <img 
                        src={giftIcon} 
                        alt="Gift Icon" 
                        className="gift-icon"
                    />
                    
                    <h1>Welcome!<br />What would you like to do first?</h1>
                    
                    <div className="button-group">
                        <Link 
                            to="/createlist" 
                            className="btn primary-btn full-width"
                        >
                            Create a gift list
                        </Link>

                        <Link 
                            to="/shop" 
                            className="btn primary-btn full-width"
                        >
                            Shop for others
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WelcomePage;