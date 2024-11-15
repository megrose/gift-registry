// Test comment - can be removed later

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import withLoveLogo from '../../assets/with-love-logo.png';

const Header = () => {
    return (
        <nav className="nav">
            <div className="nav-content">
                <div className="nav-logo-container">
                    <Link to="/" className="nav-logo-link">
                        <img 
                            src={withLoveLogo} 
                            alt="With Love Logo" 
                            className="nav-logo"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;