import React, { useState, useEffect } from 'react';

// Curated quotes about food, donation, giving, sharing, and kindness
const quotes = [
    { text: "If you can't feed a hundred people, then feed just one.", author: "Mother Teresa" },
    { text: "There are people in the world so hungry, that God cannot appear to them except in the form of bread.", author: "Mahatma Gandhi" },
    { text: "We make a living by what we get, but we make a life by what we give.", author: "Winston Churchill" },
    { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
    { text: "No one has ever become poor by giving.", author: "Anne Frank" },
    { text: "Hunger is not a problem. It is an obscenity. How wonderful it is that nobody need wait a single moment before starting to improve the world.", author: "Anne Frank" },
    { text: "One of the greatest feelings in the world is knowing that we as individuals can make a difference.", author: "Jeff Bridges" },
    { text: "The measure of a life is not what that life accomplishes, but rather the impact that life has on others.", author: "Jackie Robinson" },
    { text: "Give, but give until it hurts.", author: "Mother Teresa" },
    { text: "We rise by lifting others.", author: "Robert Ingersoll" },
    { text: "Sharing food with another human being is an intimate act that should not be indulged in lightly.", author: "M.F.K. Fisher" },
    { text: "Food is symbolic of love when words are inadequate.", author: "Alan D. Wolfelt" },
    { text: "When you have more than you need, build a longer table, not a higher fence.", author: "Unknown" },
    { text: "Let us remember: One book, one pen, one child, and one teacher can change the world.", author: "Malala Yousafzai" },
    { text: "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.", author: "Mahatma Gandhi" },
    { text: "Charity begins at home, but should not end there.", author: "Thomas Fuller" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Never doubt that a small group of thoughtful, committed citizens can change the world.", author: "Margaret Mead" },
    { text: "Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.", author: "Lao Tzu" },
    { text: "What we have done for ourselves alone dies with us; what we have done for others remains and is immortal.", author: "Albert Pike" },
    { text: "To move forward you have to give back.", author: "Oprah Winfrey" },
    { text: "A hundred years from now, it will not matter what my bank account was, but the world may be different because I was important in the life of a child.", author: "Forest Witcraft" },
    { text: "The greatest good you can do for another is not just to share your riches but to reveal to him his own.", author: "Benjamin Disraeli" },
    { text: "There is no exercise better for the heart than reaching down and lifting people up.", author: "John Holmes" },
    { text: "Feeding the hungry is a greater work than raising the dead.", author: "Saint John Chrysostom" },
    { text: "If you want happiness for an hour, take a nap. If you want happiness for a lifetime, help somebody.", author: "Chinese Proverb" },
    { text: "The world has enough for everyone's need, but not enough for everyone's greed.", author: "Mahatma Gandhi" },
    { text: "A society grows great when old men plant trees in whose shade they shall never sit.", author: "Greek Proverb" },
    { text: "What is the essence of life? To serve others and to do good.", author: "Aristotle" },
    { text: "It's not how much we give but how much love we put into giving.", author: "Mother Teresa" },
];

const DailyQuote = () => {
    const [quote, setQuote] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Pick a random quote on mount
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
        setTimeout(() => setFadeIn(true), 100);
    }, []);

    const getNewQuote = () => {
        setFadeIn(false);
        setTimeout(() => {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(randomQuote);
            setFadeIn(true);
        }, 300);
    };

    if (!quote) return null;

    return (
        <div className="bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/20 border border-white/10 rounded-2xl p-6 text-white relative overflow-hidden group">
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

            <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1">
                    <span className="material-symbols-outlined text-3xl text-purple-400/60 mb-3 block">format_quote</span>
                    <p className={`text-lg md:text-xl font-medium italic leading-relaxed transition-all duration-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        "{quote.text}"
                    </p>
                    <p className={`text-sm text-neutral-400 mt-4 font-semibold tracking-wide transition-all duration-500 delay-100 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                        — {quote.author}
                    </p>
                </div>
                <button
                    onClick={getNewQuote}
                    title="Get a new quote"
                    className="shrink-0 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-all hover:rotate-180 duration-500"
                >
                    <span className="material-symbols-outlined text-xl">refresh</span>
                </button>
            </div>
        </div>
    );
};

export default DailyQuote;
