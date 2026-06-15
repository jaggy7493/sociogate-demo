import { useEffect, useMemo, useState } from "react";

export function useExperienceEngine(scenes) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const scene = useMemo(() => scenes[index], [scenes, index]);
  const progress = Math.round(((index + 1) / scenes.length) * 100);
  const isFirst = index === 0;
  const isLast = index === scenes.length - 1;

  useEffect(() => {
    if (!playing || !scene?.duration) return undefined;

    const timer = setTimeout(() => {
      setIndex((prev) => {
        if (prev >= scenes.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, scene.duration);

    return () => clearTimeout(timer);
  }, [index, playing, scene, scenes.length]);

  const next = () => setIndex((prev) => Math.min(scenes.length - 1, prev + 1));
  const back = () => setIndex((prev) => Math.max(0, prev - 1));
  const restart = () => {
    setIndex(0);
    setPlaying(true);
  };
  const togglePlay = () => setPlaying((prev) => !prev);

  return {
    index,
    scene,
    progress,
    playing,
    isFirst,
    isLast,
    next,
    back,
    restart,
    togglePlay,
    setIndex,
    setPlaying,
  };
}
