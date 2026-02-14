import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Badge } from "../components/ui";

const MOCK_DONATIONS = [
    { id: 1, type: 'Food', title: 'Rice Bags', status: 'Pending', quantity: '10kg', icon: 'restaurant' },
    { id: 2, type: 'Clothes', title: 'Winter Jackets', status: 'Verified', quantity: '5 items', icon: 'checkroom' },
    { id: 3, type: 'Money', title: 'Fundraiser', status: 'Completed', quantity: '$50', icon: 'payments' },
    { id: 4, type: 'Books', title: 'Science Textbooks', status: 'Pending', quantity: '12 books', icon: 'menu_book' },
];

const Donations = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const typeFilter = queryParams.get('type'); // auto-filter based on Home page click

    // In real app, fetch from API.
    const [donations, setDonations] = useState(MOCK_DONATIONS);
    const [activeTab, setActiveTab] = useState(typeFilter || 'all');

    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-20">
            <div className="max-w-[1080px] mx-auto px-6">

                {/* Header - Apple Style */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-semibold text-[#1D1D1F] tracking-tight">Donations.</h1>
                        <p className="text-[#86868B] text-lg mt-2">Manage your contributions and make new ones.</p>
                    </div>
                    <Link to="/make-donation">
                        <Button className="bg-[#0071E3] text-white hover:bg-[#0077ED] px-6 py-3 rounded-full shadow-lg shadow-blue-500/20 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">add</span>
                            New Donation
                        </Button>
                    </Link>
                </div>

                {/* Filter Tabs - Pill Style */}
                <div className="flex overflow-x-auto pb-4 gap-3 mb-10 no-scrollbar">
                    {['all', 'food', 'clothes', 'books', 'money'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-[#1D1D1F] text-white shadow-md'
                                    : 'bg-white text-[#86868B] hover:bg-[#E8E8ED]'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Add New Card (Always visible) */}
                    <Link to="/make-donation" className="group bg-white rounded-[24px] p-8 border border-dashed border-[#D2D2D7] hover:border-[#0071E3] hover:bg-[#F5F9FF] transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[280px]">
                        <div className="w-16 h-16 rounded-full bg-[#F5F5F7] group-hover:bg-[#E1F0FF] text-[#0071E3] flex items-center justify-center mb-4 transition-colors">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-1">New Donation</h3>
                        <p className="text-[#86868B] text-sm">Select a category to start.</p>
                    </Link>

                    {/* Donation Cards */}
                    {donations
                        .filter(d => activeTab === 'all' || d.type.toLowerCase() === activeTab)
                        .map((donation) => (
                            <div key={donation.id} className="bg-white rounded-[24px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[280px] group">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${donation.type === 'Food' ? 'bg-orange-100 text-orange-600' :
                                                donation.type === 'Clothes' ? 'bg-blue-100 text-blue-600' :
                                                    donation.type === 'Money' ? 'bg-green-100 text-green-600' :
                                                        'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            <span className="material-symbols-outlined">{donation.icon}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${donation.status === 'Verified' ? 'bg-blue-50 text-blue-600' :
                                                donation.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {donation.status}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">{donation.title}</h3>
                                    <p className="text-[#86868B] font-medium">{donation.quantity}</p>
                                </div>

                                <div className="pt-6 mt-auto border-t border-[#F5F5F7] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs text-[#86868B]">Tap to view details</span>
                                    <button className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F]">
                                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Donations;