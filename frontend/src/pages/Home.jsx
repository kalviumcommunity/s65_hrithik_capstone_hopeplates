import { Link } from "react-router-dom";
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

// 2. Mission Section - Large Typography
const MissionSection = () => (
    <Section id="mission" className="bg-white">
        <h2 className="text-[#1D1D1F] text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-8">
            Our mission is simple. <br />
            <span className="text-[#86868B]">Make hunger history, efficiently.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <p className="text-xl text-[#1D1D1F] leading-relaxed font-medium">
                We believe that surplus food is not waste—it's a resource. By connecting restaurants, households, and event managers directly with verified NGOs, we bridge the gap between abundance and scarcity using smart technology.
            </p>
            <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Mission" />
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

// 4. Bento Grid (The "Solution" - Donation Types)
// Keeping the existing nice design but refining it
const DonationTypesSection = () => (
    <Section className="bg-[#F5F5F7]">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-semibold text-[#1D1D1F] tracking-tight mb-6">
                Choose your impact.
            </h2>
            <p className="text-xl text-[#86868B] max-w-2xl mx-auto">
                Every category is optimized for speed and transparency.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </Link>
            <div className="grid grid-rows-2 gap-8 h-[500px]">
                <Link to="/donations?type=clothes" className="group relative rounded-[40px] overflow-hidden bg-[#FBFBFD] shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-between p-10 z-10">
                        <div className="max-w-[50%]">
                            <h3 className="text-3xl font-semibold text-[#1D1D1F] mb-2">Clothes.</h3>
                            <p className="text-[#86868B]">Share warmth.</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop" className="w-32 h-32 object-cover rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg" alt="Clothes" />
                    </div>
                </Link>
                <Link to="/donations?type=money" className="group relative rounded-[40px] overflow-hidden bg-[#1D1D1F] shadow-sm hover:shadow-2xl transition-all duration-500 flex items-center justify-center text-center">
                    <div className="relative z-10 p-10">
                        <h3 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2997FF] to-[#0A84FF] mb-2">Funds.</h3>
                        <p className="text-[#F5F5F7] text-lg">100% Verified.</p>
                    </div>
                </Link>
            </div>
        </div>
    </Section>
);

// 5. Stories Section ("Voices")
const StoriesSection = () => (
    <Section id="stories" className="bg-white">
        <h2 className="text-[#1D1D1F] text-4xl font-semibold mb-12">Voices of Hope.</h2>
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
                <div key={i} className="flex flex-col gap-6 p-6 rounded-3xl bg-[#F5F5F7] hover:bg-[#E8E8ED] transition-colors">
                    <div className="flex items-center gap-4">
                        <img src={story.img} className="w-12 h-12 rounded-full object-cover" alt={story.u} />
                        <div>
                            <div className="font-semibold text-[#1D1D1F]">{story.u}</div>
                            <div className="text-sm text-[#86868B]">{story.role}</div>
                        </div>
                    </div>
                    <p className="text-[#1D1D1F] text-lg leading-relaxed italic">"{story.q}"</p>
                </div>
            ))}
        </div>
    </Section>
);

// 6. Impact Calculator (Interactive Feature)
const ImpactCalculator = () => {
    const [amount, setAmount] = useState(50);
    // Logic: $1 = 2 meals approx
    return (
        <Section className="bg-[#1D1D1F] text-white text-center">
            <h2 className="text-4xl font-semibold mb-6">Calculate Your Impact</h2>
            <p className="text-[#86868B] mb-12 max-w-xl mx-auto">See how your contribution translates directly into meals for families in need.</p>

            <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md border border-white/10 rounded-3xl p-12">
                <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2997FF] to-[#0A84FF] mb-4">
                    {Math.floor(amount * 2)}
                </div>
                <div className="text-xl font-medium mb-12">Meals Provided</div>

                <input
                    type="range"
                    min="10"
                    max="1000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#2997FF]"
                />
                <div className="flex justify-between mt-4 text-[#86868B] font-medium font-mono">
                    <span>$10</span>
                    <span className="text-white">${amount} Donation</span>
                    <span>$1,000</span>
                </div>
            </div>
        </Section>
    );
};

// 7. Community/Events (Carousel)
const CommunitySection = () => (
    <Section id="community" className="bg-[#000000] text-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-semibold mb-6">Community Events.</h2>
                <p className="text-[#86868B] text-xl">Join us on the ground. From food drives to charity runs, make a physical difference.</p>
            </div>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 mt-6 md:mt-0 rounded-full px-8">
                View All Events
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative rounded-[32px] overflow-hidden sm:h-[400px]">
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-700" alt="Event" />
                <div className="absolute bottom-0 left-0 p-8">
                    <Badge className="bg-[#2997FF] text-white mb-3">Upcoming</Badge>
                    <h3 className="text-2xl font-bold">NYC Winter Food Drive</h3>
                    <p className="text-white/80 mt-1">Dec 24 • Central Park</p>
                </div>
            </div>
            <div className="group relative rounded-[32px] overflow-hidden sm:h-[400px]">
                <img src="https://images.unsplash.com/photo-1518398046578-8cca57782eeb?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-700" alt="Event" />
                <div className="absolute bottom-0 left-0 p-8">
                    <Badge className="bg-white/20 backdrop-blur text-white mb-3">Volunteer Open</Badge>
                    <h3 className="text-2xl font-bold">Community Kitchen Setup</h3>
                    <p className="text-white/80 mt-1">Jan 10 • Brooklyn</p>
                </div>
            </div>
        </div>
    </Section>
);

// 8. Join Us / Final CTA (Minimal)
const JoinSection = () => (
    <Section className="bg-[#F5F5F7]">
        <div className="bg-white rounded-[40px] p-12 md:p-24 text-center shadow-xl">
            <h2 className="text-4xl md:text-5xl font-semibold text-[#1D1D1F] mb-6">Ready to make a difference?</h2>
            <p className="text-xl text-[#86868B] mb-10 max-w-2xl mx-auto">Create an account today and start your journey of giving. It takes less than 2 minutes.</p>
            <div className="flex justify-center gap-4">
                <Link to="/register">
                    <Button className="bg-[#0071E3] text-white hover:bg-[#0077ED] h-14 px-10 rounded-full text-lg shadow-lg shadow-blue-500/30">
                        Join HopePlates
                    </Button>
                </Link>
            </div>
        </div>
    </Section>
);

const Home = () => {
    return (
        <div className="bg-[#FFFFFF] snap-y snap-mandatory">
            <HeroSlideshow />
            <MissionSection />
            <ImpactSection />
            <DonationTypesSection />
            <ImpactCalculator />
            <StoriesSection />
            <CommunitySection />
            <JoinSection />
        </div>
    );
};

export default Home;