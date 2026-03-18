import React from 'react';

const NewsFeed = () => {
    return (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 text-white h-full">
            <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400">article</span>
                Community Updates
            </h3>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-400 mt-0.5">check_circle</span>
                    <div>
                        <p className="text-sm">Over 1000 meals recovered this week!</p>
                        <p className="text-xs text-neutral-500">2 hours ago</p>
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-purple-400 mt-0.5">event</span>
                    <div>
                        <p className="text-sm">New food drive event starting downtown.</p>
                        <p className="text-xs text-neutral-500">5 hours ago</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default NewsFeed;
