import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
}

// Button Component
export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-[#FF7043] text-white hover:bg-[#F4511E] shadow-lg shadow-orange-500/30",
        secondary: "bg-[#5C6BC0] text-white hover:bg-[#3949AB] shadow-lg shadow-indigo-500/30",
        outline: "border-2 border-[#FF7043] text-[#FF7043] hover:bg-orange-50",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        light: "bg-white/20 backdrop-blur-md text-white hover:bg-white/30 border border-white/40",
        white: "bg-white text-[#FF7043] hover:bg-gray-50 shadow-md",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3.5 text-base",
    };

    return (
        <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {children}
        </button>
    );
};

// Card Component
export const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",
                hover && "transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

// Badge Component
export const Badge = ({ children, color = 'green', className }) => {
    const colors = {
        green: "bg-green-100 text-green-700 border-green-200",
        orange: "bg-orange-100 text-orange-700 border-orange-200",
        blue: "bg-blue-100 text-blue-700 border-blue-200",
        red: "bg-red-100 text-red-700 border-red-200",
    }
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", colors[color] || colors.green, className)}>
            {children}
        </span>
    )
}
