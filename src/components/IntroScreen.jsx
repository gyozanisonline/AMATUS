import { motion } from 'framer-motion';
import monograph from '/assets/monograph.svg?inline';

const IntroScreen = ({ onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
            <motion.img
                src={monograph}
                alt="Amatus Monograph"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="h-32 w-32"
            />
        </motion.div>
    );
};

export default IntroScreen;
