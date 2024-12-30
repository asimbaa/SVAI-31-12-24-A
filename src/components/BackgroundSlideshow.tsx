import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2560', // Sydney Opera House
  'https://images.unsplash.com/photo-1494233892892-84542a694e72?auto=format&fit=crop&w=2560', // Great Barrier Reef
  'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=2560', // Uluru
  'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?auto=format&fit=crop&w=2560', // Melbourne
];

export default function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update the current image index on a timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 10 seconds interval

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        {images.map((image, index) =>
          index === currentIndex ? (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
                aria-label={`Background image ${index + 1}`}
              />
              <div className="absolute inset-0 bg-[hsl(var(--navy))]/80" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
