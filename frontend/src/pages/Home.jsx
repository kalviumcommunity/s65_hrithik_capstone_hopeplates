import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Badge } from "../components/ui";

// --- Components for Sections ---

const Section = ({ id, className, children }) => (
    <section id={id} className={`w-full py-24 md:py-32 px-6 ${className}`}>
        <div className="max-w-[1080px] mx-auto">
            {children}
        </div>
    </section>
);

const FadeIn = ({ children }) => {
    // Simple fade-in wrapper logic could be added here, 
    // for now just returning children to ensure robustness.
    return <div className="animate-fade-in-up">{children}</div>;
};

// 1. Hero Slideshow (Unchanged due to user satisfaction, just ensuring it blends)
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
            image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop",
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
                        className="w-full h-full object-cover opacity-60 scale-105"
                        style={{
                            transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 10s ease-out'
                        }}
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
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </section>
    );
};

// 2. Mission Section - Large Typography - DARK MODE
const MissionSection = () => (
    <Section id="mission" className="bg-black py-32">
        <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-12 text-center md:text-left">
            Our mission is simple. <br />
            <span className="text-neutral-500">Make hunger history, efficiently.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <p className="text-xl text-neutral-300 leading-relaxed font-light">
                    We believe that surplus food is not waste—it's a resource. <span className="text-white font-medium">HopePlates</span> connects restaurants, households, and event managers directly with verified NGOs.
                </p>
                <div className="flex gap-4">
                    <div className="px-6 py-4 bg-zinc-900 rounded-2xl border border-white/10">
                        <div className="text-2xl font-bold text-white mb-1">Zero</div>
                        <div className="text-sm text-neutral-500">Hidden Fees</div>
                    </div>
                    <div className="px-6 py-4 bg-zinc-900 rounded-2xl border border-white/10">
                        <div className="text-2xl font-bold text-white mb-1">10k+</div>
                        <div className="text-sm text-neutral-500">Volunteers</div>
                    </div>
                </div>
            </div>
            <div className="h-[500px] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mission" />
            </div>
        </div>
    </Section>
);

// 3. Impact Stats (Innovative "Ticker" style)
const ImpactSection = () => (
    <div id="impact" className="w-full bg-[#1D1D1F] text-white py-24 overflow-hidden">
        <div className="max-w-[1080px] mx-auto px-6 mb-16 text-center">
            <h2 className="text-4xl font-semibold mb-4">Real Impact. Real Time.</h2>
            <p className="text-[#86868B] text-lg">Every donation counts.</p>
        </div>

        <div className="flex justify-center gap-8 md:gap-24 flex-wrap px-6">
            {[
                { label: "Meals Served", val: "12,400+" },
                { label: "Active Donors", val: "850+" },
                { label: "NGOs Supported", val: "42" }
            ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                    <div className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.val}
                    </div>
                    <div className="text-xl text-[#86868B] font-medium">{stat.label}</div>
                </div>
            ))}
        </div>
    </div>
);

// 4. Bento Grid (The "Solution" - Donation Types) - REDESIGNED: DARK & DYNAMIC
const DonationTypesSection = () => (
    <Section className="bg-transparent relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
                Choose your impact.
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                Direct, transparent, and verified.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
            {/* FOOD: Large Feature Card (Span 7) */}
            <Link to="/donations?type=food" className="group relative md:col-span-12 lg:col-span-7 rounded-[32px] overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                <img
                    src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=2698&auto=format&fit=crop"
                    alt="Food Donation"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-10 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-orange-500/20">
                        Urgent
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">Food Recovery.</h3>
                    <p className="text-neutral-300 text-lg max-w-md">Bridging the gap between restaurant surplus and local hunger.</p>
                </div>
            </Link>

            {/* CLOTHES: Vertical Card (Span 5) */}
            <Link to="/donations?type=clothes" className="group relative md:col-span-12 lg:col-span-5 rounded-[32px] overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                <img
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop"
                    alt="Clothes Donation"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-10 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-blue-500/20">
                        Essentials
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-2">Warmth & Dignity.</h3>
                    <p className="text-neutral-300 text-lg">Give clothes a second life.</p>
                </div>
            </Link>

            {/* FUNDS: Dark Gradient Card (Span 5) */}
            <Link to="/donations?type=money" className="group relative md:col-span-12 lg:col-span-5 rounded-[32px] overflow-hidden glass-card flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-zinc-900/0 to-zinc-900/0 z-0"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                    {/* Abstract visual for funds */}
                    <div className="w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full"></div>
                </div>

                <div className="relative z-20 p-10">
                    <h3 className="text-4xl font-bold text-white mb-2">Direct Funds.</h3>
                    <p className="text-neutral-400 text-lg mb-6">100% verified transfers to registered NGOs.</p>
                    <div className="flex items-center gap-3 text-blue-400 font-semibold group-hover:gap-5 transition-all">
                        <span>Donate securely</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                </div>
            </Link>

            {/* BOOKS/EDUCATION: Large Feature Card (Span 7) */}
            <Link to="/donations?type=books" className="group relative md:col-span-12 lg:col-span-7 rounded-[32px] overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                <img
                    src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2574&auto=format&fit=crop"
                    alt="Education"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-10 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-purple-500/20">
                        Education
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-2">Knowledge.</h3>
                    <p className="text-neutral-300 text-lg">Fuel the future with books and supplies.</p>
                </div>
            </Link>
        </div>
    </Section>
);

// 5. Stories Section ("Voices") - DARK MODE
const StoriesSection = () => (
    <Section id="stories" className="bg-transparent border-t border-white/5 py-32">
        <h2 className="text-white text-4xl md:text-6xl font-semibold mb-16 text-center tracking-tight">Voices of Hope.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                {
                    q: "HopePlates made it effortless for our restaurant to donate surplus food daily. No more waste.",
                    u: "Chef Michael",
                    role: "Restaurant Owner",
                    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1968&auto=format&fit=crop"
                },
                {
                    q: "Receiving verified donations has changed how we operate our shelter. We can focus on care.",
                    u: "Sarah Jenkins",
                    role: "NGO Director",
                    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    q: "I wanted to help but didn't know how. This app makes it transparent and simple.",
                    u: "David Chen",
                    role: "Donor",
                    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                }
            ].map((story, i) => (
                <div key={i} className="flex flex-col gap-6 p-8 rounded-[32px] glass-dark hover:bg-black/60 transition-colors">
                    <div className="flex items-center gap-4">
                        <img src={story.img} className="w-14 h-14 rounded-full object-cover border border-white/10" alt={story.u} />
                        <div>
                            <div className="font-semibold text-white text-lg">{story.u}</div>
                            <div className="text-sm text-neutral-400">{story.role}</div>
                        </div>
                    </div>
                    <p className="text-neutral-300 text-lg leading-relaxed italic">"{story.q}"</p>
                </div>
            ))}
        </div>
    </Section>
);

// 6. Impact Calculator (Interactive Feature) - REDESIGNED: Dynamic Visualizer
const ImpactCalculator = () => {
    const [amount, setAmount] = useState(50);
    const navigate = useNavigate();

    const handleDonationClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate(`/make-donation?type=money`);
        } else {
            navigate("/login");
        }
    };

    // Logic: $1 = 2 meals approx
    return (
        <Section className="bg-transparent py-32 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-6">
                        See your power.
                    </h2>
                    <p className="text-neutral-400 text-xl font-light">Drag to calculate the direct impact of your donation.</p>
                </div>

                <div className="glass-dark rounded-[40px] p-8 md:p-16 relative overflow-hidden group">
                    {/* Dynamic Glow based on amount */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[100px] transition-opacity duration-300" style={{ opacity: amount / 1000 + 0.2 }}></div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-20">
                        <div className="text-center md:text-left w-full md:w-1/2">
                            <div className="text-neutral-500 font-medium tracking-widest uppercase mb-2 text-sm">Your Contribution</div>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="text-5xl md:text-7xl font-bold text-white">$</span>
                                <span className="text-6xl md:text-8xl font-bold text-white tracking-tighter tabular-nums">
                                    {amount}
                                </span>
                            </div>

                            <div className="mt-8">
                                <input
                                    type="range"
                                    min="10"
                                    max="500"
                                    step="10"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full h-3 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                                />
                                <div className="flex justify-between mt-3 text-neutral-500 text-xs font-mono uppercase">
                                    <button onClick={handleDonationClick} className="hover:text-white transition-colors uppercase">Micro</button>
                                    <button onClick={handleDonationClick} className="hover:text-white transition-colors uppercase">Transformative</button>
                                </div>
                            </div>
                        </div>

                        {/* Visualizer Circle */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
                            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                                {/* Rings */}
                                <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]"></div>

                                <div onClick={handleDonationClick} className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
                                    <span className="material-symbols-outlined text-4xl mb-2 text-orange-500 animate-bounce">restaurant</span>
                                    <div className="text-6xl md:text-7xl font-bold text-white tabular-nums drop-shadow-2xl">
                                        {Math.floor(amount * 2.5)}
                                    </div>
                                    <div className="text-orange-400 font-medium text-lg mt-2 uppercase tracking-wide">Meals Served</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

// 7. Community/Events (Carousel) - REDESIGNED: Actionable & Dynamic
const CommunitySection = () => (
    <Section id="community" className="bg-zinc-950 text-white border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">Community Events.</h2>
                <p className="text-neutral-400 text-xl font-light">Join us on the ground. From food drives to charity runs, make a physical difference.</p>
            </div>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 mt-6 md:mt-0 rounded-full px-8 py-6 text-lg transition-transform hover:scale-105">
                View All Events
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative rounded-[40px] overflow-hidden sm:h-[450px] border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Event" />
                <div className="absolute top-8 left-8 z-20">
                    <Badge className="bg-blue-600 text-white border-none py-1.5 px-4 text-sm shadow-xl">Upcoming</Badge>
                </div>
                <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">NYC Winter Food Drive</h3>
                    <p className="text-neutral-300 text-lg mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">calendar_today</span> Dec 24 • Central Park
                    </p>
                    <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 duration-300" onClick={() => alert("Registration feature coming soon!")}>
                        Register Now <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

            <div className="group relative rounded-[40px] overflow-hidden sm:h-[450px] border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1518398046578-8cca57782eeb?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" alt="Event" />
                <div className="absolute top-8 left-8 z-20">
                    <Badge className="bg-green-600 text-white border-none py-1.5 px-4 text-sm shadow-xl">Volunteers Needed</Badge>
                </div>
                <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-green-400 transition-colors">Community Kitchen Setup</h3>
                    <p className="text-neutral-300 text-lg mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">location_on</span> Jan 10 • Brooklyn
                    </p>
                    <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 duration-300" onClick={() => alert("Joined as volunteer!")}>
                        Join Team <span className="material-symbols-outlined">handshake</span>
                    </button>
                </div>
            </div>
        </div>
    </Section>
);

// 8. Join Us / Final CTA (Minimal) - DARK MODE
const JoinSection = () => {
    const token = localStorage.getItem("token");

    return (
        <Section className="bg-black py-40">
            <div className="bg-neutral-900/50 border border-white/10 rounded-[50px] p-12 md:p-32 text-center shadow-2xl relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter relative z-10">Ready to change a life?</h2>
                <p className="text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto font-light relative z-10">Join 20,000+ others directly impacting their local communities.</p>
                <div className="flex justify-center gap-6 relative z-10">
                    <Link to={token ? "/make-donation" : "/register"}>
                        <Button className="bg-white text-black hover:bg-neutral-200 h-16 px-12 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            {token ? "Start your Donation" : "Join HopePlates"}
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
};

const Home = () => {
    const navigate = useNavigate();

    const handleDonationClick = (type) => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate(`/make-donation?type=${type}`);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="bg-black font-sans selection:bg-blue-500/30 selection:text-blue-200">
            <HeroSlideshow />
            <MissionSection />
            <ImpactSection />
            {/* UPDATED FUNDS Image in DonationTypesSection needed within the file edit context, applying strict replace for safety */}
            <Section className="bg-black relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="relative z-10 text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">Choose your impact.</h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Direct, transparent, and verified.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
                    <div onClick={() => handleDonationClick('food')} className="group relative md:col-span-12 lg:col-span-7 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                        <img src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=2698&auto=format&fit=crop" alt="Food" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 p-10 z-20">
                            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-orange-500/20">Urgent</span>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">Food Recovery.</h3>
                            <p className="text-neutral-300 text-lg">Bridging the gap between restaurant surplus and local hunger.</p>
                        </div>
                    </div>
                    <div onClick={() => handleDonationClick('clothes')} className="group relative md:col-span-12 lg:col-span-5 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                        <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop" alt="Clothes" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 p-10 z-20">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-blue-500/20">Essentials</span>
                            <h3 className="text-4xl font-bold text-white mb-2">Warmth.</h3>
                            <p className="text-neutral-300 text-lg">Give clothes a second life.</p>
                        </div>
                    </div>
                    {/* UPDATED FUNDS CARD WITH PHOTO */}
                    <div onClick={() => handleDonationClick('money')} className="group relative md:col-span-12 lg:col-span-5 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80"></div>
                        {/* Dynamic Photo for Funds */}
                        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop" alt="Funds" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 p-10 z-20">
                            <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-green-500/20">Verified</span>
                            <h3 className="text-4xl font-bold text-white mb-2">Direct Funds.</h3>
                            <p className="text-neutral-300 text-lg">Secure transfers to NGOs.</p>
                            <div className="mt-4 flex items-center gap-2 text-green-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                <span>Donate Now</span> <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => handleDonationClick('books')} className="group relative md:col-span-12 lg:col-span-7 rounded-[32px] overflow-hidden bg-zinc-900 border border-white/10 cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                        <img src="https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2574&auto=format&fit=crop" alt="Education" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                        <div className="absolute bottom-0 left-0 p-10 z-20">
                            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-md border border-purple-500/20">Education</span>
                            <h3 className="text-4xl font-bold text-white mb-2">Knowledge.</h3>
                            <p className="text-neutral-300 text-lg">Fuel the future.</p>
                        </div>
                    </div>
                </div>
            </Section>

            <ImpactCalculator />
            <StoriesSection />
            <CommunitySection />
            <JoinSection />
        </div>
    );
};

export default Home;