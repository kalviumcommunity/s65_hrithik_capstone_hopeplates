import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PendingApproval = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-8">
            <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>

                <div className="w-20 h-20 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <span className="material-symbols-outlined text-5xl text-yellow-400">pending</span>
                </div>

                <h1 className="text-2xl font-bold text-white mb-3">Verification Pending</h1>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                    Thanks for registering! since you are joining as an organization/partner, our team needs to manually verify your credentials.
                </p>

                <div className="bg-white/5 rounded-xl p-4 mb-8 text-sm text-neutral-300 border border-white/5">
                    <p className="flex items-center gap-2 justify-center mb-2">
                        <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                        <span>Account Created</span>
                    </p>
                    <p className="flex items-center gap-2 justify-center mb-2">
                        <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
                        <span>Details Submitted</span>
                    </p>
                    <p className="flex items-center gap-2 justify-center text-yellow-400 animate-pulse font-medium">
                        <span className="material-symbols-outlined text-lg">hourglass_top</span>
                        <span>Waiting for Approval</span>
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Check Status Again
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-xl font-medium transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <p className="mt-8 text-neutral-500 text-sm">Need help? <a href="#" className="text-blue-400 hover:underline">Contact Support</a></p>
        </div>
    );
};

export default PendingApproval;
