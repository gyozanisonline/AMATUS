import { motion as Motion } from 'framer-motion';

// The monograph turns once, then the page fades in. Shown once per visit;
// skipped when the visitor asks for reduced motion.

const monograph = `${import.meta.env.BASE_URL}img/monograph.svg`;

const IntroScreen = ({ onComplete }) => {
    return (
        <Motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 1.0, ease: 'easeOut' }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            aria-hidden="true"
        >
            <Motion.img
                src={monograph}
                alt=""
                initial={{ rotate: -120, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-32 w-32"
            />
        </Motion.div>
    );
};

export default IntroScreen;
