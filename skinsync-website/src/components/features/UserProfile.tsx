import React, { useState } from 'react';

const UserProfile: React.FC = () => {
    const [skinType, setSkinType] = useState<string>('');
    const [preferences, setPreferences] = useState<string>('');

    const handleSkinTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSkinType(event.target.value);
    };

    const handlePreferencesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPreferences(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logic to save user profile data
        console.log('User Profile Submitted:', { skinType, preferences });
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="skinType">Skin Type:</label>
                    <select id="skinType" value={skinType} onChange={handleSkinTypeChange}>
                        <option value="">Select your skin type</option>
                        <option value="oily">Oily</option>
                        <option value="dry">Dry</option>
                        <option value="combination">Combination</option>
                        <option value="normal">Normal</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="preferences">Preferences:</label>
                    <textarea
                        id="preferences"
                        value={preferences}
                        onChange={handlePreferencesChange}
                        placeholder="Enter your skincare preferences..."
                    />
                </div>
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;