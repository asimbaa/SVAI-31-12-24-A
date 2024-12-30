import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isRecording: boolean;
  volume: number;
}

export function AudioVisualizer({ isRecording, volume }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isRecording || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!isRecording) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw visualization based on volume
      const barCount = 5;
      const barWidth = canvas.width / (barCount * 2);
      const maxHeight = canvas.height * 0.8;

      for (let i = 0; i < barCount; i++) {
        const height = (Math.sin(Date.now() * 0.01 + i) + 1) * maxHeight * (volume / 255);
        const x = canvas.width / 2 + (i * barWidth * 2) - (barCount * barWidth);
        
        ctx.fillStyle = `hsl(var(--gold) / ${0.3 + (height / maxHeight) * 0.7})`;
        ctx.fillRect(x, (canvas.height - height) / 2, barWidth, height);
        
        // Mirror bars
        ctx.fillRect(canvas.width - x - barWidth, (canvas.height - height) / 2, barWidth, height);
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, [isRecording, volume]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative w-full h-12 mb-4"
    >
      <canvas
        ref={canvasRef}
        width={200}
        height={48}
        className="w-full h-full"
      />
    </motion.div>
  );
}