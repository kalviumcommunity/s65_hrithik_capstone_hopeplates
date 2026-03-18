import React from 'react';

const DonationImage = ({ src, alt, className }) => {
    // Basic image component to handle missing images / loading errors gracefully
    const [error, setError] = React.useState(false);

    if (error || !src) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}>
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
        );
    }

    // Function to ensure URL is correct if it's a relative backend path
    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        const API_BASE = window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://s65-hrithik-capstone-hopeplates.onrender.com";
        return `${API_BASE}/${url.replace(/\\/g, '/')}`;
    };

    return (
        <img
            src={getImageUrl(src)}
            alt={alt || "Donation"}
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default DonationImage;
