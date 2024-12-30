import { useState, useEffect } from 'react';
import { backgroundImages, ROTATION_INTERVAL } from './constants';
import type { BackgroundState } from './types';

export function useBackgroundRotation(): BackgroundState {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return {
    currentImage: backgroundImages[currentIndex],
    currentIndex
  };
}