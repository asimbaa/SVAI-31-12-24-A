import { motion } from 'framer-motion';
import { useState } from 'react';
import { VisaGrantsTooltip } from './VisaGrantsTooltip';

interface VisaGrantsBarProps {
  sector: string;
  count: number;
  percentage: number;
  index: number;
}

export function VisaGrantsBar({ sector, count, percentage, index }: VisaGrantsBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/80">{sector}</span>
        <span className="text-white/60">{count.toLocaleString()} ({percentage}%)</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="h-full bg-[hsl(var(--gold))] rounded-full hover:bg-[hsl(var(--gold))]/80 transition-colors"
        />
      </div>

      {showTooltip && (
        <VisaGrantsTooltip
          sector={sector}
          count={count}
          percentage={percentage}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
        />
      )}
    </motion.div>
  );
}