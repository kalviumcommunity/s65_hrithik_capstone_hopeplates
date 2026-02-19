import { useState } from "react";
import { cn } from "../utils/cn";

const DonationImage = ({ images, type, title, className, iconSize = "text-6xl" }) => {
    const [imgError, setImgError] = useState(false);
    const [fallbackError, setFallbackError] = useState(false);

    // High-quality Unsplash source images for fallbacks
    const getFallbackImage = () => {
        const t = (type || "").toLowerCase();

        switch (t) {
            case 'food':
                return "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80";
            case 'clothes':
                return "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80";
            case 'books':
                return "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80";
            case 'money':
                return "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80";
            default:
                return null;
        }
    };

    const fallbackImg = getFallbackImage();

    // Original API image logic
    const apiImageUrl = images && images.length > 0 && images[0]
        ? (() => {
            const path = images[0].replace(/\\/g, '/');
            return path.startsWith('http')
                ? path
                : `${import.meta.env.VITE_API_URL}/${path}`;
        })()
        : null;

    // 1. Try API Image
    if (apiImageUrl && !imgError) {
        return (
            <img
                src={apiImageUrl}
                alt={title || "Donation Image"}
                className={cn("w-full h-full object-cover", className)}
                onError={() => setImgError(true)}
            />
        );
    }

    // 2. Try Fallback Image (Lexica - more distinct AI art style)
    if (fallbackImg && !fallbackError) {
        return (
            <img
                src={fallbackImg}
                alt={`${type} Default`}
                className={cn("w-full h-full object-cover brightness-75", className)}
                onError={() => setFallbackError(true)}
            />
        );
    }

    // 3. Ultimate Fallback: Scoped Gradient Icon
    const getGradientFallback = () => {
        const t = (type || "").toLowerCase();
        if (t === 'food') return { bg: 'bg-gradient-to-br from-orange-500 to-red-600', icon: 'lunch_dining' };
        if (t === 'clothes') return { bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', icon: 'checkroom' };
        if (t === 'books') return { bg: 'bg-gradient-to-br from-amber-400 to-orange-700', icon: 'menu_book' };
        if (t === 'money') return { bg: 'bg-gradient-to-br from-emerald-500 to-teal-700', icon: 'payments' };
        return { bg: "bg-gradient-to-br from-gray-700 to-gray-900", icon: "volunteer_activism" };
    };

    const { bg, icon } = getGradientFallback();

    return (
        <div className={cn("w-full h-full flex items-center justify-center text-white", bg, className)}>
            <span className={cn("material-symbols-outlined drop-shadow-md", iconSize)}>
                {icon}
            </span>
        </div>
    );
};

export default DonationImage;
