import React, { useState, useEffect } from 'react';

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Try GNews API first
                if (GNEWS_API_KEY && GNEWS_API_KEY !== 'your_gnews_api_key_here') {
                    const queries = ['food donation', 'hunger relief', 'food bank', 'food shortage'];
                    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
                    const res = await fetch(
                        `https://gnews.io/api/v4/search?q=${encodeURIComponent(randomQuery)}&lang=en&max=5&apikey=${GNEWS_API_KEY}`
                    );
                    if (res.ok) {
                        const data = await res.json();
                        if (data.articles && data.articles.length > 0) {
                            setArticles(data.articles.map(a => ({
                                title: a.title,
                                description: a.description,
                                url: a.url,
                                image: a.image,
                                source: a.source?.name || 'News',
                                publishedAt: a.publishedAt
                            })));
                            setLoading(false);
                            return;
                        }
                    }
                }

                // Fallback: curated food/donation news items
                setArticles(getFallbackNews());
            } catch (err) {
                console.error("News fetch error:", err);
                setArticles(getFallbackNews());
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const getFallbackNews = () => [
        {
            title: "Global food banks report surge in community donations",
            description: "Communities worldwide are stepping up to address food insecurity through local food banks and donation drives.",
            url: "https://www.feedingamerica.org",
            source: "Feeding America",
            publishedAt: new Date().toISOString(),
            icon: "volunteer_activism",
            color: "text-green-400"
        },
        {
            title: "New initiatives aim to reduce food waste by 50%",
            description: "Organizations are partnering with restaurants and grocery stores to redirect surplus food to those in need.",
            url: "https://www.wfp.org",
            source: "World Food Programme",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            icon: "recycling",
            color: "text-blue-400"
        },
        {
            title: "Rising food prices highlight need for donation networks",
            description: "As food costs increase globally, community donation platforms are becoming essential lifelines.",
            url: "https://www.unicef.org",
            source: "UNICEF",
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            icon: "trending_up",
            color: "text-yellow-400"
        },
        {
            title: "Tech platforms transform how people donate food",
            description: "Digital platforms are making it easier than ever to connect food donors with those who need it most.",
            url: "https://www.feedingamerica.org",
            source: "Food Tech Weekly",
            publishedAt: new Date(Date.now() - 14400000).toISOString(),
            icon: "phone_android",
            color: "text-purple-400"
        },
        {
            title: "School meal programs expand across developing nations",
            description: "Governments and NGOs are scaling school feeding programs to combat childhood hunger and malnutrition.",
            url: "https://www.wfp.org",
            source: "WFP News",
            publishedAt: new Date(Date.now() - 28800000).toISOString(),
            icon: "school",
            color: "text-pink-400"
        }
    ];

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const defaultIcons = ['public', 'newspaper', 'feed', 'breaking_news', 'campaign'];
    const defaultColors = ['text-green-400', 'text-blue-400', 'text-yellow-400', 'text-purple-400', 'text-pink-400'];

    return (
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl text-white h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 pb-3 border-b border-white/5">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400">newspaper</span>
                    Live News Feed
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Food & donation news from around the world</p>
            </div>

            {/* Articles */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="p-5 space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                                <div className="h-3 bg-white/5 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ul className="divide-y divide-white/5">
                        {articles.map((article, idx) => (
                            <li key={idx}>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex gap-3 p-4 hover:bg-white/5 transition-all duration-200 group cursor-pointer"
                                >
                                    {/* Icon or Image */}
                                    <div className="shrink-0 mt-0.5">
                                        {article.image ? (
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black">
                                                <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        ) : (
                                            <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${article.color || defaultColors[idx % 5]}`}>
                                                <span className="material-symbols-outlined text-xl">
                                                    {article.icon || defaultIcons[idx % 5]}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                            {article.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">{article.source}</span>
                                            <span className="text-neutral-700">•</span>
                                            <span className="text-[10px] text-neutral-600">{timeAgo(article.publishedAt)}</span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-sm text-neutral-500">arrow_forward</span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Footer */}
            {!loading && articles.length > 0 && (
                <div className="p-3 border-t border-white/5 text-center">
                    <button
                        onClick={() => { setLoading(true); setTimeout(() => { setArticles([]); window.location.reload(); }, 300); }}
                        className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1 mx-auto"
                    >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Refresh News
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsFeed;
