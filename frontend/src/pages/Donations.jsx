import { useState, useEffect } from "react";
import { Button, Card, Badge } from "../components/ui";
import { Link } from "react-router-dom";

// Mock Data for UI Dev
const MOCK_DONATIONS = [
    { id: 1, type: 'Food', title: 'Surplus Rice & Curry', status: 'Pending', date: '2 mins ago', quantity: '10kg', icon: 'restaurant' },
    { id: 2, type: 'Clothes', title: 'Winter Jackets', status: 'Verified', date: '2 hours ago', quantity: '5 items', icon: 'checkroom' },
    { id: 3, type: 'Money', title: 'School Fees Fund', status: 'Completed', date: '1 day ago', quantity: '$50', icon: 'payments' },
];

const Donations = () => {
    // In real app, fetch from API. For UI overhaul, using mock first to show the design.
    const [donations, setDonations] = useState(MOCK_DONATIONS);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-[#181311]">Dashboard Overview</h1>
                    <p className="text-sm text-[#546E7A]">Welcome back! Here's your impact summary.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Donations', value: '12', trend: '+2 this week', color: 'bg-orange-50 text-orange-600', icon: 'volunteer_activism' },
                    { label: 'Families Helped', value: '45', trend: 'High Impact', color: 'bg-green-50 text-green-600', icon: 'diversity_1' },
                    { label: 'Active Requests', value: '3', trend: 'Action needed', color: 'bg-blue-50 text-blue-600', icon: 'notifications_active' },
                ].map((stat, idx) => (
                    <Card key={idx} className="p-6 border-none shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-[#181311]">{stat.value}</h3>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2 inline-block">{stat.trend}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                            <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Donations List */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-[#181311]">Recent Activity</h2>
                    <Link to="/donation-history" className="text-sm font-semibold text-[#FF7043] hover:text-[#F4511E]">View All</Link>
                </div>

                <div className="space-y-4">
                    {donations.map((donation) => (
                        <Card key={donation.id} className="p-4 flex flex-col sm:flex-row items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 shrink-0`}>
                                <span className="material-symbols-outlined">{donation.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                                <h4 className="font-bold text-[#181311] truncate">{donation.title}</h4>
                                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-gray-500 mt-1">
                                    <span>{donation.type}</span>
                                    <span>•</span>
                                    <span>{donation.quantity}</span>
                                    <span>•</span>
                                    <span>{donation.date}</span>
                                </div>
                            </div>
                            <Badge color={donation.status === 'Completed' ? 'green' : donation.status === 'Verified' ? 'blue' : 'orange'}>
                                {donation.status}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#181311]">
                                <span className="material-symbols-outlined">more_vert</span>
                            </Button>
                        </Card>
                    ))}
                    {/* Add New CTA */}
                    <Link to="/make-donation">
                        <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[#FF7043] hover:bg-orange-50/50 transition-all cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF7043] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined">add</span>
                            </div>
                            <p className="font-bold text-[#181311]">Make a New Donation</p>
                            <p className="text-xs text-gray-500">Food, Clothes, Books, or Money</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Donations;