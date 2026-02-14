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
        <div className="font-sans antialiased text-white bg-transparent min-h-screen flex flex-col">
            {/* Navbar - Fixed & Dynamic Dark Mode */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark border-b-0' : 'bg-transparent'}`}>
                <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">

                    {/* Fixed Logo Area - Left Side */}
                    <Link to="/" className="flex items-center gap-2 group z-50 relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${scrolled ? 'bg-white text-black' : 'bg-white text-black'}`}>
                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-white">
                            HopePlates
                        </span>
                    </Link>

                    {/* Centered Navigation Tabs - "Sliding Effect" */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center bg-white/5 backdrop-blur-[2px] rounded-full p-1.5 border border-white/5">
                        {/* Pill Background for Active State */}
                        {[
                            { name: 'Mission', path: '/' },
                            { name: 'Impact', path: '/' },
                            { name: 'Stories', path: '/' },
                            { name: 'Community', path: '/' }
                        ].map((item) => {
                        ].map((item) => {
                            const isActive = activeSection === item.name.toLowerCase() && isHome;
                        return (
                        <a
                            key={item.name}
                            href={`/#${item.name.toLowerCase()}`}
                            className={`relative px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${isActive
                                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {item.name}
                        </a>
                        )
                        })}
                    </div>

                    {/* Mobile & Right Side Actions */}
                    <div className="flex items-center gap-4">
                        {localStorage.getItem('user') ? (
                            <>
                                <Link to="/dashboard" className="text-sm font-medium transition-colors text-neutral-300 hover:text-white">Dashboard</Link>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        localStorage.removeItem('token');
                                        window.location.reload();
                                    }}
                                    className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 bg-white/10 text-white hover:bg-white hover:text-black border border-white/10"
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium transition-colors text-neutral-300 hover:text-white">Log in</Link>
                                <Link to="/register">
                                    <button className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 bg-white text-black hover:bg-neutral-200">
                                        Join Us
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="pt-0 flex-grow">
                <Outlet />
            </main>

            {/* Floating Action Button for Donations */}
            <Link
                to="/donations"
                className="fixed bottom-8 right-8 z-50 group flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 hover:shadow-blue-600/50 transition-all duration-300"
                title="View Donations"
            >
                <span className="material-symbols-outlined text-white text-2xl group-hover:rotate-90 transition-transform duration-300">volunteer_activism</span>
                <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Browse Donations
                </span>
            </Link>

            {/* Minimal Footer - Dark Mode */}
            <footer className="bg-black/40 backdrop-blur-md text-neutral-400 text-xs py-10 mt-auto border-t border-white/5">
                <div className="max-w-[1080px] mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h5 className="font-semibold text-white mb-3">Shop and Learn</h5>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Food Donation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Clothing Drive</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Book Exchange</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-white mb-3">Community</h5>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Top Donors</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Volunteer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                        <p>Copyright © 2024 HopePlates Inc. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
