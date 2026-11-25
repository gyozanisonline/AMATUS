import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

// The AMATUS three-dot mark turns a third of a circle at a time. Each time a
// ball arrives at the top, its value appears under the mark.
// Reduced motion: the mark stands still and all three values show in a row.

const HOLD_MS = 2200; // time each value stays up
const TURN_S = 0.8; // length of each turn

export default function ValuesMark({ values, start = true }) {
  const [step, setStep] = useState(0);
  const [reduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!start || reduce) return;
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') setStep((s) => s + 1);
    }, HOLD_MS + TURN_S * 1000);
    return () => clearInterval(id);
  }, [start, reduce]);

  const word = values[step % values.length];

  if (reduce) {
    return (
      <div className="values-mark">
        <Mark />
        <p className="values-mark__static">{values.join('  ·  ')}</p>
      </div>
    );
  }

  return (
    <div className="values-mark">
      <Motion.div
        className="values-mark__logo"
        animate={{ rotate: step * 120 }}
        transition={{ duration: TURN_S, ease: [0.65, 0, 0.35, 1] }}
      >
        <Mark />
      </Motion.div>

      <div className="values-mark__word" aria-hidden="true">
        <AnimatePresence mode="wait">
          <Motion.span
            key={step}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, delay: TURN_S * 0.6, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.25 } }}
          >
            {word}
          </Motion.span>
        </AnimatePresence>
      </div>
      <p className="visually-hidden">Our values: {values.join(', ')}.</p>
    </div>
  );
}

// viewBox is centred on the middle of the three balls, so it turns in place.
function Mark() {
  return (
    <svg className="values-mark__svg" viewBox="410.14 138.86 320 320" aria-hidden="true">
      <circle cx="647.94" cy="344.29" r="62.28" />
      <circle cx="492.35" cy="344.29" r="62.28" />
      <circle cx="570.14" cy="207.99" r="62.28" />
    </svg>
  );
}
