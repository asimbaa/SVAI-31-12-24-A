import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface StreamingMessageProps {
  content: string;
  isComplete: boolean;
}

export function StreamingMessage({ content, isComplete }: StreamingMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [content]);

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 mr-auto max-w-[80%] mb-4 p-6 rounded-lg backdrop-blur-sm"
    >
      <ReactMarkdown
        className="prose prose-invert max-w-none"
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
              >
                {String(children)}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-4 mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="text-white/90">{children}</li>
        }}
      >
        {content}
      </ReactMarkdown>
      {!isComplete && (
        <div className="flex space-x-2 mt-2">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-150" />
        </div>
      )}
    </motion.div>
  );
}