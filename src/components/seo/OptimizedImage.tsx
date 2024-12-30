import { useState, useEffect } from 'react';
import { generateImageSrcSet } from '@/lib/seo/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  priority = false
}: OptimizedImageProps) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
      };
      img.src = src;
    }
  }, [src, priority]);

  if (priority && dimensions) {
    return (
      <img
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={className}
        sizes={sizes}
        srcSet={generateImageSrcSet(src)}
        loading="eager"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      srcSet={generateImageSrcSet(src)}
      loading={loading}
    />
  );
}