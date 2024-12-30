import { Mic, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioVisualizer } from './AudioVisualizer';

interface AudioRecordButtonProps {
  isRecording: boolean;
  volume: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function AudioRecordButton({
  isRecording,
  volume,
  onStartRecording,
  onStopRecording
}: AudioRecordButtonProps) {
  return (
    <div className="relative">
      <AnimatePresence>
        {isRecording && volume > 0 && (
          <AudioVisualizer isRecording={isRecording} volume={volume} />
        )}
      </AnimatePresence>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={`p-2 rounded-full transition-colors ${
          isRecording
            ? 'bg-red-500/90 hover:bg-red-600 animate-pulse'
            : 'bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90'
        }`}
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        {isRecording ? (
          <Square className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-[hsl(var(--navy))]" />
        )}
        <span className="sr-only">
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </span>
      </motion.button>
    </div>
  );
}