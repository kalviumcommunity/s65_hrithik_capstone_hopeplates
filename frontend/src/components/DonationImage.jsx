import React from 'react';

const DonationImage = ({ src, alt, className, images, type, title }) => {
    // Basic image component to handle missing images / loading errors gracefully
    const [error, setError] = React.useState(false);

    let imageSrc = src;
    if (!imageSrc && images && images.length > 0) {
        imageSrc = images[0];
    }

    if (error || !imageSrc) {
        return (
            <div className={`flex items-center justify-center bg-neutral-800 text-neutral-500 ${className}`}>
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
            </div>
        );
    }

    // Function to ensure URL is correct if it's a relative backend path
    const getImageUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        const API_BASE = window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://s65-hrithik-capstone-hopeplates.onrender.com";
        let formattedUrl = url.replace(/\\/g, '/');
        if (!formattedUrl.startsWith('/')) {
            formattedUrl = '/' + formattedUrl;
        }
        return `${API_BASE}${formattedUrl}`;
    };

    return (
        <img
            src={getImageUrl(imageSrc)}
            alt={alt || title || "Donation"}
            className={className}
            onError={() => setError(true)}
        />
    );
};

export default DonationImage;
