import { useState, useEffect } from 'react';

const DailyQuote = () => {
    // API of quotes: https://api.quotable.io/random?tags=wisdom,life,service
    // Or mock a list of famous Indian/World leaders on service
    const [quote, setQuote] = useState({
        text: "The best way to find yourself is to lose yourself in the service of others.",
        author: "Mahatma Gandhi"
    });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                // Try fetching a quote from API
                const res = await fetch('https://api.quotable.io/random?tags=inspirational');
                if (!res.ok) throw new Error("API Limit");
                const data = await res.json();
                setQuote({ text: data.content, author: data.author });
            } catch (e) {
                // Fallback list of Indian specific quotes
                const localQuotes = [
                    { text: "We make a living by what we get. We make a life by what we give.", author: "Winston S. Churchill" },
                    { text: "Service to others is the rent you pay for your room here on earth.", author: "Muhammad Ali" },
                    { text: "You cannot do a kindness too soon, for you never know how soon it will be too late.", author: "Ralph Waldo Emerson" },
                    { text: "The simplest acts of kindness are by far more powerful then a thousand heads bowing in prayer.", author: "Mahatma Gandhi" },
                    { text: "Where there is love, there is life.", author: "Mahatma Gandhi" },
                    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" }
                ];
                const rand = Math.floor(Math.random() * localQuotes.length);
                setQuote(localQuotes[rand]);
            }
        };

        fetchQuote();
    }, []);

    return (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/5 shadow-2xl group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <span className="material-symbols-outlined text-6xl text-white/10 mb-6 group-hover:text-white/20 transition-colors duration-500">format_quote</span>

            <p className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed drop-shadow-lg mb-6 max-w-2xl">
                "{quote.text}"
            </p>

            <div className="flex items-center gap-3">
                <div className="h-0.5 w-8 bg-white/20"></div>
                <cite className="text-lg font-medium text-neutral-300 not-italic tracking-wide uppercase font-sans">
                    {quote.author}
                </cite>
                <div className="h-0.5 w-8 bg-white/20"></div>
            </div>
        </div>
    );
};

export default DailyQuote;
