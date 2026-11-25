// Intro shows once per visit, never with reduced motion.
export const shouldShowIntro = () => {
    try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        if (sessionStorage.getItem('amatus-intro-seen')) return false;
        sessionStorage.setItem('amatus-intro-seen', '1');
    } catch {
        /* storage blocked: show it */
    }
    return true;
};
