import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, ShieldCheck, Wallet } from "lucide-react";
import { assets } from "../assets/assets";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="w-9 h-9" />
                    <span className="text-lg font-semibold text-gray-800">Money Manager</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium px-4 py-2"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-sm bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-24 flex-1">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight max-w-2xl mb-5">
                    Take Control of Your <span className="text-violet-600">Finances</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-xl mb-10">
                    Your foundation for secure, intelligent financial management.
                    Effortlessly track your income and expenses to achieve your financial goals.
                </p>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-3 rounded-lg transition-colors"
                    >
                        Start Tracking for Free
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold px-5 py-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                        Learn More <ArrowRight size={16} />
                    </button>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 px-8 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Everything you need to manage money
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
                            <Wallet size={26} className="text-violet-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Track Income & Expenses</h3>
                        <p className="text-gray-500 text-sm">
                            Log every transaction with ease and keep your finances organized in one place.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
                            <BarChart2 size={26} className="text-violet-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Visual Analytics</h3>
                        <p className="text-gray-500 text-sm">
                            Get clear insights into your spending habits through beautiful charts and reports.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
                            <ShieldCheck size={26} className="text-violet-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Secure & Private</h3>
                        <p className="text-gray-500 text-sm">
                            Your financial data is protected with industry-standard security practices.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="flex flex-col items-center justify-center text-center px-6 py-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started???</h2>
                <p className="text-gray-500 mb-8">Join thousands of users managing their finances smarter.</p>
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                    Create Free Account
                </button>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 text-center py-6 text-sm text-gray-400">
                © {new Date().getFullYear()} Money Manager. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
