export const easing = {
  smooth: [0.22, 1, 0.36, 1],
  hero: [0.16, 1, 0.3, 1],
};

export const motionPreset = {
  fast: { duration: 0.22, ease: easing.smooth },
  medium: { duration: 0.45, ease: easing.smooth },
  slow: { duration: 0.75, ease: easing.hero },
  hero: { duration: 1.0, ease: easing.hero },
};

export const fadeUp = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -28, filter: "blur(8px)" },
  transition: motionPreset.medium,
};

export const cinematicPanel = {
  initial: { opacity: 0, scale: 0.96, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.98, y: -18, filter: "blur(10px)" },
  transition: motionPreset.slow,
};

export const phoneMotion = {
  initial: { opacity: 0, x: 36, rotate: 3, scale: 0.94 },
  animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
  exit: { opacity: 0, x: -28, rotate: -2, scale: 0.96 },
  transition: motionPreset.medium,
};
