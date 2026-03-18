import React from 'react';

const WeatherWidget = () => {
    return (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-white h-full flex flex-col justify-center items-center">
            <span className="material-symbols-outlined text-5xl text-yellow-500 mb-2">partly_cloudy_day</span>
            <h3 className="text-xl font-bold">Good Day!</h3>
            <p className="text-neutral-400 text-sm text-center mt-2">Perfect weather for making a difference.</p>
        </div>
    );
};

export default WeatherWidget;
