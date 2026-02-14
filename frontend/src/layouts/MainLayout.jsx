import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const MainLayout = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const location = useLocation();

    // Scroll Effect & ScrollSpy
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 20);

            // ScrollSpy Logic
            const sections = ['mission', 'impact', 'stories', 'community'];
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) { // 150px offset for navbar
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = location.pathname === "/";

    return (
        <div className="font-sans antialiased text-[#1D1D1F]">
            {/* Navbar - Fixed & Dynamic */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-[#D2D2D7]/30 shadow-sm' : 'bg-transparent'}`}>
                <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">

                    {/* Fixed Logo Area - Left Side */}
                    <Link to="/" className="flex items-center gap-2 group z-50 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-[#1D1D1F] text-white' : 'bg-white text-black'}`}>
                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </div>
                        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>
                            HopePlates
                        </span>
                    </Link>

                    {/* Centered Navigation Tabs - "Sliding Effect" */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center bg-black/5 backdrop-blur-[2px] rounded-full p-1.5 border border-white/10">
                        {/* Pill Background for Active State */}
                        {['Mission', 'Impact', 'Stories', 'Community'].map((item) => {
                            const isActive = activeSection === item.toLowerCase() && isHome;
                            return (
                                <a
                                    key={item}
                                    href={`/#${item.toLowerCase()}`}
                                    className={`relative px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                                            ? 'bg-white text-black shadow-md'
                                            : scrolled ? 'text-[#1D1D1F] hover:bg-black/5' : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item}
                                </a>
                            )
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {/* Login/Register or Profile if logged in could go here */}
                        <Link to="/login" className={`text-sm font-medium transition-colors hover:opacity-70 ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>Log in</Link>
                        <Link to="/register">
                            <button className={`px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 ${scrolled
                                    ? 'bg-[#0071E3] text-white hover:bg-[#0077ED]'
                                    : 'bg-white text-black hover:bg-[#F5F5F7]'
                                }`}>
                                Join Us
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>

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
