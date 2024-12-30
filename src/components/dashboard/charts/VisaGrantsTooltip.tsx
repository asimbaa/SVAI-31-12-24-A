import { motion } from 'framer-motion';

interface VisaGrantsTooltipProps {
  sector: string;
  count: number;
  percentage: number;
  x: number;
  y: number;
}

export function VisaGrantsTooltip({ sector, count, percentage, x, y }: VisaGrantsTooltipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute z-50 bg-black/90 backdrop-blur-sm p-3 rounded-lg border border-white/10 shadow-xl"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px',
        minWidth: '200px'
      }}
    >
      <div className="text-sm space-y-1">
        <p className="font-medium text-white">{sector}</p>
        <p className="text-white/80">{count.toLocaleString()} visas</p>
        <p className="text-white/60">{percentage}% of total</p>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/90 border-r border-b border-white/10" />
    </motion.div>
  );
}