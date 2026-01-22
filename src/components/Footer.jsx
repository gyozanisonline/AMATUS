import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 border-t border-gray-800 relative z-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-xl font-bold text-amatus-red" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>AMATUS</h2>
                    <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} All Rights Reserved.</p>
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-amatus-red transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-amatus-red transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-amatus-red transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
