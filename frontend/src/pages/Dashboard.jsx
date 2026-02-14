import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorDashboard from './dashboard/DonorDashboard';
import NGODashboard from './dashboard/NGODashboard';
import RestaurantDashboard from './dashboard/RestaurantDashboard';
import ManagerDashboard from './dashboard/ManagerDashboard';
import AdminDashboard from './AdminDashboard'; // Existing AdminDashboard for 'admin' role

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    if (!user) return null;

    // Role-based rendering
    const renderDashboard = () => {
        switch (user.role) {
            case 'donor':
                return <DonorDashboard user={user} />;
            case 'ngo':
                return <NGODashboard user={user} />;
            case 'restaurant':
                return <RestaurantDashboard user={user} />;
            case 'event_manager':
                return <ManagerDashboard user={user} />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return (
                    <div className="text-center mt-20">
                        <h2 className="text-2xl font-bold text-white">Role Not Recognize</h2>
                        <p className="text-neutral-400">Please contact support.</p>
                    </div>
                );
        }
    };

    return (
        <div className="w-full">
            {renderDashboard()}
        </div>
    );
};

export default Dashboard;
