export function generateImageSrcSet(
  imagePath: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): string {
  return sizes
    .map(size => `${imagePath}?w=${size} ${size}w`)
    .join(', ');
}

export function generateImageSizes(
  defaultSize: string = '100vw',
  breakpoints: { [key: string]: string } = {
    '(min-width: 1280px)': '1280px',
    '(min-width: 1024px)': '1024px',
    '(min-width: 768px)': '768px'
  }
): string {
  return Object.entries(breakpoints)
    .map(([query, size]) => `${query} ${size}`)
    .concat(defaultSize)
    .join(', ');
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = src;
  });
}