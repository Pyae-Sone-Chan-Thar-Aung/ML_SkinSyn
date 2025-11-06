import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>SkinSync</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/product-recommender">Product Recommender</Link></li>
                    <li><Link to="/user-profile">User Profile</Link></li>
                    <li><Link to="/ingredient-analyzer">Ingredient Analyzer</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;