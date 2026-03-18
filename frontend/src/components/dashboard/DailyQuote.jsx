import React from 'react';

const DailyQuote = () => {
    return (
        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-white/10 rounded-2xl p-6 text-white h-full flex flex-col justify-between">
            <span className="material-symbols-outlined text-3xl opacity-50 mb-4">format_quote</span>
            <p className="text-lg font-medium italic">"No one has ever become poor by giving."</p>
            <p className="text-sm text-neutral-400 mt-4 font-semibold">- Anne Frank</p>
        </div>
    );
};

export default DailyQuote;
