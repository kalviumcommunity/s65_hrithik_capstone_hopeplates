import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MainLayout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="font-sans antialiased text-[#1D1D1F]">
            {/* Navbar - Apple Style: Sticky, Blur, Minimal */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-[#D2D2D7]/30' : 'bg-black/20 backdrop-blur-sm'}`}>
                <div className="max-w-[1080px] mx-auto px-6 h-[52px] flex items-center justify-between text-sm font-medium">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className={`material-symbols-outlined text-[20px] ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>favorite</span>
                        <span className={`tracking-tight font-semibold ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>HopePlates</span>
                    </Link>

                    <div className={`hidden md:flex items-center gap-8 ${scrolled ? 'text-[#1D1D1F]/80' : 'text-white/80'}`}>
                        {['Mission', 'Impact', 'Stories', 'Community'].map((item) => (
                            <a key={item} href="#" className="hover:text-current hover:opacity-70 transition-opacity">{item}</a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className={`hover:opacity-70 transition-opacity ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>Log in</Link>
                        <Link to="/register" className={`btn-apple px-4 py-1.5 text-xs ${scrolled ? 'bg-[#1D1D1F] text-white hover:bg-black' : 'bg-white text-black hover:bg-white/90'}`}>
                            Join us
                        </Link>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            {/* Minimal Footer */}
            <footer className="bg-[#F5F5F7] text-[#86868B] text-xs py-10 mt-20 border-t border-[#D2D2D7]">
                <div className="max-w-[1080px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h5 className="font-semibold text-[#1D1D1F] mb-3">Shop and Learn</h5>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Food Donation</a></li>
                                <li><a href="#" className="hover:underline">Clothing Drive</a></li>
                                <li><a href="#" className="hover:underline">Book Exchange</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-[#1D1D1F] mb-3">Community</h5>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Events</a></li>
                                <li><a href="#" className="hover:underline">Top Donors</a></li>
                                <li><a href="#" className="hover:underline">Volunteer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-[#D2D2D7] flex justify-between items-center">
                        <p>Copyright © 2024 HopePlates Inc. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                            <a href="#" className="hover:underline">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
