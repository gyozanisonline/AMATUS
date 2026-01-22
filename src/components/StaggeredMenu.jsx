import React, { useState, useEffect } from 'react';
import './StaggeredMenu.css';
import { motion, AnimatePresence } from 'framer-motion';

const StaggeredMenu = ({
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    position = 'right',
    menuButtonColor = '#000',
    openMenuButtonColor = '#fff',
    logoUrl,
    onMenuOpen,
    onMenuClose
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            onMenuOpen?.();
        } else {
            document.body.style.overflow = '';
            onMenuClose?.();
        }
    }, [isOpen, onMenuOpen, onMenuClose]);

    return (
        <div
            className={`staggered-menu-wrapper ${isOpen ? 'fixed-wrapper' : ''}`}
            data-open={isOpen}
            data-position={position}
        >
            <header className="staggered-menu-header">
                <div className="sm-logo">
                    {logoUrl && <img src={logoUrl} alt="Logo" className="sm-logo-img" />}
                </div>

                <button
                    className="sm-toggle"
                    onClick={toggleMenu}
                    style={{ color: isOpen ? openMenuButtonColor : menuButtonColor }}
                >
                    <span className="sm-toggle-textWrap">
                        <span className="sm-toggle-textInner">
                            <span className="sm-toggle-line">{isOpen ? 'CLOSE' : 'MENU'}</span>
                        </span>
                    </span>
                    <div className="sm-icon">
                        <span className={`sm-line ${isOpen ? 'hidden' : 'block'}`}></span>
                        {/* Simple Hamburger/Close icon using CSS or SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            {isOpen ? (
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            ) : (
                                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </div>
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop / Prelayers for animation effect */}
                        <motion.div
                            className="sm-prelayers"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            className="staggered-menu-panel"
                            initial={{ x: position === 'left' ? '-100%' : '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: position === 'left' ? '-100%' : '100%' }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="sm-panel-inner">
                                <nav>
                                    <ul className="sm-panel-list" data-numbering={displayItemNumbering}>
                                        {items.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + index * 0.1 }}
                                            >
                                                <a href={item.link} className="sm-panel-item" aria-label={item.ariaLabel}>
                                                    <span className="sm-panel-itemLabel">{item.label}</span>
                                                </a>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                {displaySocials && (
                                    <div className="sm-socials">
                                        <h3 className="sm-socials-title">Follow Us</h3>
                                        <ul className="sm-socials-list">
                                            {socialItems.map((social, idx) => (
                                                <li key={idx}>
                                                    <a href={social.link} className="sm-socials-link" target="_blank" rel="noopener noreferrer">
                                                        {social.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StaggeredMenu;
