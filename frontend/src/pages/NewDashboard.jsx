import React from 'react';
import { Link } from 'react-router-dom';

const NewDashboard = () => {
    return (
        <div style={{ "--font-display": '"Work Sans", sans-serif', "--color-primary": "#ec5b13" }} className="bg-background-light dark:bg-background-dark text-[#181311] dark:text-white font-display flex h-screen overflow-hidden">
            {/* Navigation */}
            <aside className="w-64 bg-white dark:bg-[#1a100a] border-r border-primary/10 flex flex-col h-full">
                <div className="p-6 flex items-center gap-2 mb-8">
                    <div className="bg-primary p-1.5 rounded-lg text-white">
                        <span className="material-symbols-outlined text-2xl">favorite</span>
                    </div>
                    <h1 className="text-xl font-800 tracking-tight text-[#181311] dark:text-white">GivingHeart</h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-semibold" to="/new-dashboard">
                        <span className="material-symbols-outlined">dashboard</span> Home
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-3 text-[#896f61] hover:bg-primary/5 hover:text-primary rounded-xl transition-all font-semibold" to="/donations">
                        <span className="material-symbols-outlined">volunteer_activism</span> Donations
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-3 text-[#896f61] hover:bg-primary/5 hover:text-primary rounded-xl transition-all font-semibold" to="/profile">
                        <span className="material-symbols-outlined">person</span> Profile
                    </Link>
                    <Link className="flex items-center gap-3 px-4 py-3 text-[#896f61] hover:bg-primary/5 hover:text-primary rounded-xl transition-all font-semibold" to="/messages">
                        <span className="material-symbols-outlined">mail</span> Messages
                    </Link>
                    <div className="pt-4 mt-4 border-t border-primary/10">
                        <Link to="/make-donation" className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                            <span className="material-symbols-outlined">add_circle</span> Make Donation
                        </Link>
                    </div>
                </nav>
                <div className="p-4 mb-4">
                    <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold w-full text-left">
                        <span className="material-symbols-outlined">logout</span> Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-y-auto">
                {/* Dashboard Top Bar */}
                <header className="h-20 border-b border-primary/5 flex items-center justify-between px-8 bg-white/50 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">pending_actions</span> Pending Verification (Admin)
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#896f61] hover:bg-primary/5 rounded-full">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/20">JD</div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto space-y-12">
                    {/* Welcome */}
                    <section>
                        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
                        <p className="text-[#896f61]">Your kindness has impacted 12 families this month. Thank you for making a difference.</p>
                    </section>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="dashboard-stats">
                        <div className="bg-white dark:bg-[#2a1b14] p-6 rounded-2xl border border-primary/5 shadow-sm">
                            <span className="text-3xl font-black text-primary">10k+</span>
                            <p className="text-xs font-bold text-[#896f61] uppercase tracking-wider mt-1">Meals Served</p>
                        </div>
                        <div className="bg-white dark:bg-[#2a1b14] p-6 rounded-2xl border border-primary/5 shadow-sm">
                            <span className="text-3xl font-black text-primary">5k+</span>
                            <p className="text-xs font-bold text-[#896f61] uppercase tracking-wider mt-1">Families Clothed</p>
                        </div>
                        <div className="bg-white dark:bg-[#2a1b14] p-6 rounded-2xl border border-primary/5 shadow-sm">
                            <span className="text-3xl font-black text-primary">50+</span>
                            <p className="text-xs font-bold text-[#896f61] uppercase tracking-wider mt-1">Communities</p>
                        </div>
                        <div className="bg-white dark:bg-[#2a1b14] p-6 rounded-2xl border border-primary/5 shadow-sm">
                            <span className="text-3xl font-black text-primary">$2M+</span>
                            <p className="text-xs font-bold text-[#896f61] uppercase tracking-wider mt-1">Funds Raised</p>
                        </div>
                    </div>

                    {/* Categories / Make Donation */}
                    <section id="dashboard-categories">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold">Quick Donation</h3>
                            <button className="text-primary font-bold hover:underline">See all categories</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="categories-container">
                            <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 shadow-sm hover:shadow-lg transition-all">
                                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTKHfY4VO58h9L-3X2L1y_CxLlH9XIwmTJhDqhJPRPC0jarqu049INbg0_Us_JBz8UEsdYD_-rk7L8-HXkpZQ7Qy3Up78gTUy7cIgQfrcDVfKOfxd9zwJyFoFbFZT8bVeuf1L0LeGWoH7d75WOiAEN8xvss_JClfJceCN35gp4nL10Eo7mH3Ofjis-zamSNlcCdXlcfmoV3zcaLrs4U6389nxLtiy_3F_mbMzwHRaX-_YR1KCLx3auEZ-NUrQhQbtx7KLPi3efiGs" alt="Food" />
                                </div>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">restaurant</span> Food</h4>
                                <button className="w-full py-2 text-xs font-bold border-2 border-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">Donate Now</button>
                            </div>
                            <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 shadow-sm hover:shadow-lg transition-all">
                                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYwkVNsEh9k8M6h-R6GOnH9scR5dAU-EPnwf2dV4m4AkbmGIbnRvn_-QAqovM4X8ooB0NPPKEvFGQGQ6k-KjvNDahCdpZ_ReB2lriOYil43Rahh7QzKVLqMG_g8OhjHyzos7ndnwxBhE9rO6aRJQW6lYtQeNcPihEZKCDjfwrTyOVWAR051eXlEm8W2LGAeaU7TtVltmMhddDas4iRTWxbG56SbbgD7iQTZvZkDLTLwURV_cQzCsy3P1ZJtFZR2TZG_bm-3HoK0HM" alt="Clothing" />
                                </div>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">apparel</span> Clothing</h4>
                                <button className="w-full py-2 text-xs font-bold border-2 border-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">Donate Now</button>
                            </div>
                            <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 shadow-sm hover:shadow-lg transition-all">
                                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChns7qiqatiICEc4Z9hnUM2iI3didZ08hXYWu6vE_cZa4uusX3qGDUkAev8KjLj46Hm0-dBN1Hiw5v6rYHuuRfz-Hh7U7BrJFKXQL1PnPXpSzfFwV_e2wQh5Ih_mpfzcVWdQXc5AUXFI89vGIfrufpZzUhcnLM6pP_wyrTCXHNe1sILQ6-p6Zaux0yLdg18iQ88BZ7GI-TikJucY53Zm1N2dU0ZxluGUYvMpJ3X1ewqaClggwFArenfEa7Cx05snowd1SkVR5CsTU" alt="Books" />
                                </div>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">auto_stories</span> Books</h4>
                                <button className="w-full py-2 text-xs font-bold border-2 border-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">Donate Now</button>
                            </div>
                            <div className="group bg-white dark:bg-[#2a1b14] p-4 rounded-2xl border border-primary/5 shadow-sm hover:shadow-lg transition-all">
                                <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3MNlUYgwMyVHLLz2UqtEGY5hLnB_jBqQETUFOvK0SEZ0In4KzcAjpFMRhXiczM_8g5tZfvS12bibUWpeTCriqjpCOmOWhTB37_YDrnys7Llt2nu-apR92TYrv_VvZCfUs94WmJnXLrUYV11eIexWvxdoWZ2EvqpfZSpSmR6Qgzw7KpiMwJscNULUrGA7mlssfTCXpfJAl_8qx0ZciUe2tOMCxan4RKUMyXothkl9TjkANT1py2kvirfIwNDtpNcdXsduNHSLaJ0" alt="Money" />
                                </div>
                                <h4 className="font-bold mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-primary text-lg">volunteer_activism</span> Money</h4>
                                <button className="w-full py-2 text-xs font-bold border-2 border-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all">Donate Now</button>
                            </div>
                        </div>
                    </section>

                    <footer className="pt-12 border-t border-primary/5" id="dashboard-footer">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-[#896f61] uppercase tracking-widest pb-8">
                            <p>© 2024 GivingHeart Dashboard.</p>
                            <div className="flex gap-8">
                                <a className="hover:text-primary" href="#">Privacy Policy</a>
                                <a className="hover:text-primary" href="#">Terms of Service</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default NewDashboard;
