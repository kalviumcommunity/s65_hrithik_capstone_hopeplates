import { useState, useEffect } from 'react';

const NewsFeed = () => {
    // Mock news since NewsAPI requires keys and limits dev usage
    const defaultNews = [
        {
            title: "India ranks 111th in Global Hunger Index: The road to change.",
            source: "The Hindu",
            time: "2 hrs ago"
        },
        {
            title: "Mumbai's 'Roti Bank' feeds thousands daily with leftover food.",
            source: "Times of India",
            time: "5 hrs ago"
        },
        {
            title: "New Govt Policy: Tax benefits for restaurants donating surplus food.",
            source: "Economic Times",
            time: "1 day ago"
        },
        {
            title: "Bangalore techie builds app to connect NGOs with donors.",
            source: "YourStory",
            time: "3 days ago"
        }
    ];

    const [news, setNews] = useState(defaultNews);

    return (
        <div className="glass-card p-6 h-full flex flex-col justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                <span className="material-symbols-outlined text-red-500 animate-pulse">new_releases</span>
                Latest Updates
            </h3>

            <div className="space-y-4 overflow-y-auto max-h-[300px] scrollbar-hide">
                {news.map((item, idx) => (
                    <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition">
                        <h4 className="font-semibold text-white line-clamp-2 mb-1">{item.title}</h4>
                        <div className="flex justify-between items-center text-xs text-neutral-400">
                            <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded uppercase font-bold">{item.source}</span>
                            <span>{item.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-center">
                <button className="text-blue-400 text-sm font-semibold hover:text-white transition">Read More News</button>
            </div>
        </div>
    );
};

export default NewsFeed;
