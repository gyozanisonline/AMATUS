const Footer = ({ logo, linkedin }) => {
    return (
        <footer className="bg-black text-white py-8 border-t border-gray-800 relative z-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <img src={logo} alt="Amatus" className="h-4 w-auto" width="1490" height="190" />
                    <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} Amatus. All rights reserved.</p>
                </div>

                <div className="flex gap-6">
                    <a href="#contact" className="footer-link">Contact</a>
                    {linkedin && (
                        <a href={linkedin} className="footer-link" target="_blank" rel="noreferrer">LinkedIn</a>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
