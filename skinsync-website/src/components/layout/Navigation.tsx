// Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/product-recommender">Product Recommender</Link>
                </li>
                <li>
                    <Link to="/user-profile">User Profile</Link>
                </li>
                <li>
                    <Link to="/ingredient-analyzer">Ingredient Analyzer</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;