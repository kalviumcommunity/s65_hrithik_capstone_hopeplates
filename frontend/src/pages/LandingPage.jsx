import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#2d2a29] dark:text-[#f3f2f1] font-display min-h-screen">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 glass-nav border-b border-primary/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl animate-heartbeat">favorite</span>
                        </div>
                        <h1 className="text-xl font-800 tracking-tight text-[#181311] dark:text-white">GivingHeart</h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">About</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#categories">Categories</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#impact">Impact</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden sm:block text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all">Sign In</Link>
                        <Link to="/donations" className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                            Donate Now
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
                    <div className="absolute inset-0 hero-gradient" data-alt="Diverse group of volunteers smiling while helping community"></div>
                    <div className="relative z-10 max-w-3xl animate-in fade-in duration-1000">
                        <span className="inline-block bg-primary/20 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            Join the Movement
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                            Small Acts,<br /><span className="text-primary italic">Big Impact</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-medium mb-10 leading-relaxed">
                            Join a community dedicated to uplifting lives through simple gestures of kindness. Together, we can make a difference in every home.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/donations" className="w-full sm:w-auto bg-primary text-white text-base font-bold px-10 py-4 rounded-xl hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
                                Start Giving <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                            <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
                                Watch Our Story
                            </button>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="py-16 bg-white dark:bg-[#1a100a] border-y border-primary/5" id="impact">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center items-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-4xl font-black text-primary">10k+</span>
                                <span className="text-sm font-bold text-[#896f61] uppercase tracking-wider">Meals Served</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-primary/10">
                                <span className="text-4xl font-black text-primary">5k+</span>
                                <span className="text-sm font-bold text-[#896f61] uppercase tracking-wider">Families Clothed</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-primary/10">
                                <span className="text-4xl font-black text-primary">50+</span>
                                <span className="text-sm font-bold text-[#896f61] uppercase tracking-wider">Communities</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-primary/10">
                                <span className="text-4xl font-black text-primary">$2M+</span>
                                <span className="text-sm font-bold text-[#896f61] uppercase tracking-wider">Funds Raised</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-24 max-w-7xl mx-auto px-6" id="categories">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#181311] dark:text-white mb-4">Choose Your Way to Help</h2>
                            <p className="text-[#896f61] dark:text-[#896f61] text-lg">Every contribution, no matter how small, fuels our mission to build a more compassionate world.</p>
                        </div>
                        <button className="text-primary font-bold flex items-center gap-2 group hover:underline underline-offset-4 transition-all">
                            View All Categories <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">trending_flat</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Food Card */}
                        <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 shadow-md">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Fresh nutritious organic vegetables in a basket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTKHfY4VO58h9L-3X2L1y_CxLlH9XIwmTJhDqhJPRPC0jarqu049INbg0_Us_JBz8UEsdYD_-rk7L8-HXkpZQ7Qy3Up78gTUy7cIgQfrcDVfKOfxd9zwJyFoFbFZT8bVeuf1L0LeGWoH7d75WOiAEN8xvss_JClfJceCN35gp4nL10Eo7mH3Ofjis-zamSNlcCdXlcfmoV3zcaLrs4U6389nxLtiy_3F_mbMzwHRaX-_YR1KCLx3auEZ-NUrQhQbtx7KLPi3efiGs" />
                            </div>
                            <div className="px-2 pb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">restaurant</span>
                                    <h3 className="text-xl font-bold">Food</h3>
                                </div>
                                <p className="text-[#896f61] text-sm leading-relaxed mb-6">Nutritious meals for families in need of support and sustenance.</p>
                                <button className="w-full py-3 rounded-lg border-2 border-primary/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary font-bold text-sm transition-all">
                                    Provide a meal
                                </button>
                            </div>
                        </div>
                        {/* Clothing Card */}
                        <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 shadow-md">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Stack of clean folded warm clothes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYwkVNsEh9k8M6h-R6GOnH9scR5dAU-EPnwf2dV4m4AkbmGIbnRvn_-QAqovM4X8ooB0NPPKEvFGQGQ6k-KjvNDahCdpZ_ReB2lriOYil43Rahh7QzKVLqMG_g8OhjHyzos7ndnwxBhE9rO6aRJQW6lYtQeNcPihEZKCDjfwrTyOVWAR051eXlEm8W2LGAeaU7TtVltmMhddDas4iRTWxbG56SbbgD7iQTZvZkDLTLwURV_cQzCsy3P1ZJtFZR2TZG_bm-3HoK0HM" />
                            </div>
                            <div className="px-2 pb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">apparel</span>
                                    <h3 className="text-xl font-bold">Clothing</h3>
                                </div>
                                <p className="text-[#896f61] text-sm leading-relaxed mb-6">Warmth and dignity through your high-quality pre-loved clothes.</p>
                                <button className="w-full py-3 rounded-lg border-2 border-primary/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary font-bold text-sm transition-all">
                                    Share the warmth
                                </button>
                            </div>
                        </div>
                        {/* Books Card */}
                        <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 shadow-md">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Child reading a colorful storybook happily" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChns7qiqatiICEc4Z9hnUM2iI3didZ08hXYWu6vE_cZa4uusX3qGDUkAev8KjLj46Hm0-dBN1Hiw5v6rYHuuRfz-Hh7U7BrJFKXQL1PnPXpSzfFwV_e2wQh5Ih_mpfzcVWdQXc5AUXFI89vGIfrufpZzUhcnLM6pP_wyrTCXHNe1sILQ6-p6Zaux0yLdg18iQ88BZ7GI-TikJucY53Zm1N2dU0ZxluGUYvMpJ3X1ewqaClggwFArenfEa7Cx05snowd1SkVR5CsTU" />
                            </div>
                            <div className="px-2 pb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">auto_stories</span>
                                    <h3 className="text-xl font-bold">Books</h3>
                                </div>
                                <p className="text-[#896f61] text-sm leading-relaxed mb-6">Opening worlds of imagination and learning for curious children.</p>
                                <button className="w-full py-3 rounded-lg border-2 border-primary/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary font-bold text-sm transition-all">
                                    Inspire a child
                                </button>
                            </div>
                        </div>
                        {/* Money Card */}
                        <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 shadow-md">
                            <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Hands holding coins to put into charity jar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3MNlUYgwMyVHLLz2UqtEGY5hLnB_jBqQETUFOvK0SEZ0In4KzcAjpFMRhXiczM_8g5tZfvS12bibUWpeTCriqjpCOmOWhTB37_YDrnys7Llt2nu-apR92TYrv_VvZCfUs94WmJnXLrUYV11eIexWvxdoWZ2EvqpfZSpSmR6Qgzw7KpiMwJscNULUrGA7mlssfTCXpfJAl_8qx0ZciUe2tOMCxan4RKUMyXothkl9TjkANT1py2kvirfIwNDtpNcdXsduNHSLaJ0" />
                            </div>
                            <div className="px-2 pb-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                                    <h3 className="text-xl font-bold">Money</h3>
                                </div>
                                <p className="text-[#896f61] text-sm leading-relaxed mb-6">Financial support for critical, high-impact community projects.</p>
                                <button className="w-full py-3 rounded-lg border-2 border-primary/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary font-bold text-sm transition-all">
                                    Fund a project
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-24 bg-[#f3f1ee] dark:bg-primary/5" id="how-it-works">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#181311] dark:text-white mb-4">How It Works</h2>
                            <p className="text-[#896f61] max-w-2xl mx-auto">Three simple steps to start your journey of giving. We make it easy for you to make a meaningful impact today.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                            {/* Connector lines for desktop */}
                            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-primary/20 -z-0"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="size-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-primary/20">1</div>
                                <h4 class="text-xl font-bold mb-4">Choose a Category</h4>
                                <p className="text-[#896f61] leading-relaxed">Select what you want to give - whether it's essentials like food and clothes or financial support.</p>
                            </div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="size-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-primary/20">2</div>
                                <h4 className="text-xl font-bold mb-4">Schedule Pickup</h4>
                                <p className="text-[#896f61] leading-relaxed">For physical items, we'll arrange a contactless pickup from your home. For money, use our secure gateway.</p>
                            </div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="size-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black mb-8 shadow-xl shadow-primary/20">3</div>
                                <h4 className="text-xl font-bold mb-4">Track Your Impact</h4>
                                <p className="text-[#896f61] leading-relaxed">Receive personalized updates on how your contribution is changing lives in real-time.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6">
                    <div className="max-w-5xl mx-auto bg-[#181311] dark:bg-primary/10 rounded-3xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                        <div className="relative z-10 p-10 md:p-20 text-center">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Ready to make a difference?</h2>
                            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">Join 20,000+ others who are already part of the GivingHeart community. Your journey of kindness starts with a single click.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register" className="bg-primary text-white font-bold px-12 py-5 rounded-xl text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95">Become a Member</Link>
                                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-12 py-5 rounded-xl text-lg hover:bg-white/20 transition-all">Explore Projects</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#1a100a] border-t border-primary/5 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-primary p-1.5 rounded-lg text-white">
                                    <span className="material-symbols-outlined text-xl animate-heartbeat">favorite</span>
                                </div>
                                <h1 className="text-xl font-800 tracking-tight">GivingHeart</h1>
                            </div>
                            <p className="text-[#896f61] text-sm leading-relaxed">Empowering communities through collective acts of kindness. Registered non-profit organization.</p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Platform</h5>
                            <ul className="space-y-4 text-sm text-[#896f61]">
                                <li><a className="hover:text-primary transition-colors" href="#">How it Works</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Categories</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Trust & Safety</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Global Impact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Company</h5>
                            <ul className="space-y-4 text-sm text-[#896f61]">
                                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Newsletter</h5>
                            <p className="text-sm text-[#896f61] mb-4">Stay updated with our latest impact stories.</p>
                            <div className="flex gap-2">
                                <input className="bg-primary/5 border-none rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-primary" placeholder="Your email" type="email" />
                                <button className="bg-primary text-white p-2 rounded-lg">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#896f61] uppercase tracking-widest">
                        <p>© 2024 GivingHeart. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a className="hover:text-primary" href="#">Privacy Policy</a>
                            <a className="hover:text-primary" href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
