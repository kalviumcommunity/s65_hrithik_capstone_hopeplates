import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Home = () => {
    // Parallax or scroll reveal effect could be implemented here

    return (
        <div className="bg-white">
            {/* Hero Section - Full Screen Image Background (Apple Style) */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-black">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
                        alt="Hand reaching out"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 max-w-4xl pt-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <h1 className="text-6xl md:text-8xl font-semibold text-white tracking-tight mb-6 drop-shadow-lg">
                        Giving. <br />
                        <span className="text-white/80">Reimagined.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#F5F5F7] max-w-2xl mx-auto font-medium mb-10 leading-relaxed drop-shadow-md">
                        The simplest way to make a difference. Donate food, clothes, books, or funds in seconds.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/donations" className="bg-[#0071E3] text-white hover:bg-[#0077ED] px-8 py-3 rounded-full text-lg font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30">
                            Start Donating
                        </Link>
                        <Link to="/about" className="text-[#2997FF] hover:text-[#70B0FF] text-lg font-medium flex items-center gap-1 group">
                            Learn more <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features Section */}
            <section className="py-32 bg-[#F5F5F7]">
                <div className="max-w-[1080px] mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="section-title text-[#1D1D1F] mb-6">Four ways to give. <span className="text-[#86868B]">One platform.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
                        {/* Large Card - Food */}
                        <div className="bg-white rounded-[32px] p-10 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between col-span-1 md:row-span-2">
                            <div className="relative z-10">
                                <span className="text-[#E85D04] font-semibold tracking-wide text-xs uppercase mb-2 block">Available Now</span>
                                <h3 className="text-4xl font-semibold mb-4 text-[#1D1D1F]">Food Donation</h3>
                                <p className="text-[#86868B] text-lg leading-relaxed max-w-xs">Connecting surplus food from restaurants to local shelters instantly.</p>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-[60%] z-0">
                                <img
                                    src="https://images.unsplash.com/photo-1594007759138-855170ec8dc0?q=80&w=1888&auto=format&fit=crop"
                                    alt="Donation of fresh vegetables"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-b-[32px]"
                                />
                            </div>
                            <div className="relative z-10 mt-auto pt-64">
                                <button className="bg-[#1D1D1F] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-colors">Donate Food</button>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 gap-6 h-full">
                            {/* Small Card - Clothes */}
                            <div className="bg-white rounded-[32px] p-8 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-2 text-[#1D1D1F]">Clothing</h3>
                                        <p className="text-[#86868B]">Share warmth & dignity.</p>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl text-[#0071E3]">checkroom</span>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1520004434532-3d94697493bc?q=80&w=2025&auto=format&fit=crop"
                                    className="absolute right-[-20%] bottom-[-20%] w-[60%] h-auto opacity-80 rotate-[-12deg] group-hover:rotate-[-6deg] transition-transform duration-500"
                                    alt="Clothes"
                                />
                            </div>

                            {/* Small Card - Money */}
                            <div className="bg-[#1D1D1F] rounded-[32px] p-8 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 text-white flex flex-col justify-center text-center">
                                <div className="relative z-10">
                                    <h3 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#2997FF] to-[#0A84FF]">100%</h3>
                                    <p className="text-[#F5F5F7]/80 text-lg">Direct Impact.</p>
                                    <p className="text-[#F5F5F7]/60 text-sm mt-4 max-w-xs mx-auto">Every dollar goes directly to verified NGOs projects.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Card - Books */}
                    <div className="mt-6 bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-[300px] relative group">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1974&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                alt="Books"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-10">
                            <h3 className="text-4xl font-semibold mb-4 drop-shadow-lg">Spread Knowledge.</h3>
                            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-[#F5F5F7] transition-colors">Donate Books</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;