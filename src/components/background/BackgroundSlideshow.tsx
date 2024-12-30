import { AnimatePresence } from 'framer-motion';
import { BackgroundImage } from './BackgroundImage';
import { useBackgroundRotation } from './useBackgroundRotation';

export function BackgroundSlideshow() {
  const { currentImage, currentIndex } = useBackgroundRotation();

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        <BackgroundImage
          key={currentIndex}
          imageUrl={currentImage}
          isActive={true}
        />
      </AnimatePresence>
    </div>
  );
}