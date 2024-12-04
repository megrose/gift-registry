import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import withLoveLogo from '../../assets/with-love-logo.png';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.logoLink}>
                    <img src={withLoveLogo} alt="With Love" className={styles.logo} />
                </Link>
                <div className={styles.navButtons}>
                    <Link to="/get-started" className={styles.getStartedButton}>
                        Get started
                    </Link>
                    <Link to="/login" className={styles.signInButton}>
                        Sign in
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;