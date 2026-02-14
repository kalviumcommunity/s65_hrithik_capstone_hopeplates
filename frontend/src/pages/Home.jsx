import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, Badge } from "../components/ui";

// Apple-style Slideshow Component
const HeroSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
            title: "Share Hope.",
            subtitle: "One plate at a time."
        },
        {
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
            title: "Give Warmth.",
            subtitle: "More than just clothes."
        },
        {
            image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop", // Books/Learning
            title: "Empower.",
            subtitle: "Knowledge for everyone."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-60 scale-105 animate-ken-burns" // Added simple scale generic, assumes Tailwind config or custom class
                        style={{ animation: index === currentSlide ? 'kenBurns 20s infinite alternate' : 'none' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
            ))}

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                <div className="max-w-4xl space-y-6">
                    <h1 className="text-6xl md:text-8xl font-semibold text-white tracking-tight drop-shadow-2xl">
                        {slides[currentSlide].title} <br />
                        <span className="text-[#2997FF]">{slides[currentSlide].subtitle}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[#F5F5F7] max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        Join the movement. Connect directly with those in need using our unified platform.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link to="/donations">
                            <Button className="bg-white text-black hover:bg-[#F5F5F7] text-lg px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-xl">
                                Start Giving
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="ghost" className="text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full border border-white/30 backdrop-blur-md">
                                How it Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            <style>{`
                @keyframes kenBurns {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
            `}</style>
        </section>
    );
};

const Home = () => {
    return (
        <div className="bg-[#FFFFFF]">
            <HeroSlideshow />

            {/* Apple-style "Big Grid" for Donation Types */}
            <section className="py-32 bg-[#F5F5F7]">
                <div className="max-w-[1280px] mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-semibold text-[#1D1D1F] tracking-tight mb-6">
                            Choose your impact.
                        </h2>
                        <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
                            Every category is optimized for speed and transparency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Food Card - Large */}
                        <Link to="/donations?type=food" className="group relative h-[500px] rounded-[40px] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                            <div className="absolute inset-x-0 top-0 p-12 z-10">
                                <span className="text-[#E85D04] font-semibold tracking-wider text-xs uppercase mb-3 block">Urgent Needs</span>
                                <h3 className="text-4xl font-semibold text-[#1D1D1F] mb-3">Food.</h3>
                                <p className="text-[#86868B] text-lg max-w-xs">Connecting restaurants and homes to local shelters.</p>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop"
                                alt="Food"
                                className="absolute inset-0 w-full h-full object-cover mt-32 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-10 right-10 z-20 bg-white/40 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="material-symbols-outlined text-[#1D1D1F]">arrow_forward</span>
                            </div>
                        </Link>

                        {/* Side by Side */}
                        <div className="grid grid-rows-2 gap-8 h-[500px]">
                            {/* Clothes */}
                            <Link to="/donations?type=clothes" className="group relative rounded-[40px] overflow-hidden bg-[#FBFBFD] shadow-sm hover:shadow-2xl transition-all duration-500">
                                <div className="absolute inset-0 flex items-center justify-between p-10 z-10">
                                    <div className="max-w-[50%]">
                                        <h3 className="text-3xl font-semibold text-[#1D1D1F] mb-2">Clothes.</h3>
                                        <p className="text-[#86868B]">Share warmth.</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
                                        alt="Clothes"
                                        className="w-32 h-32 object-cover rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg"
                                    />
                                </div>
                            </Link>

                            {/* Money */}
                            <Link to="/donations?type=money" className="group relative rounded-[40px] overflow-hidden bg-[#1D1D1F] shadow-sm hover:shadow-2xl transition-all duration-500 flex items-center justify-center text-center">
                                <div className="relative z-10 p-10">
                                    <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2997FF] to-[#0A84FF] mb-2">Funds.</h3>
                                    <p className="text-[#F5F5F7] text-lg">100% Verified.</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Books Full Width */}
                    <Link to="/donations?type=books" className="mt-8 block group relative h-[300px] rounded-[40px] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                alt="Books"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 p-10">
                            <h3 className="text-4xl font-semibold mb-2 drop-shadow-lg">Books & Education.</h3>
                            <button className="mt-4 bg-white/20 backdrop-blur-md border border-white/50 text-white px-8 py-2 rounded-full font-medium hover:bg-white hover:text-black transition-all">
                                Donate Books
                            </button>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;