import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  type: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ type, content }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: type === 'user' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`mb-4 p-6 rounded-lg backdrop-blur-sm ${
        type === 'user'
          ? 'bg-[hsl(var(--gold))]/10 ml-auto max-w-[80%]'
          : 'bg-white/10 mr-auto max-w-[80%]'
      }`}
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
          li: ({ children }) => <li className="text-white/90">{children}</li>,
          h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[hsl(var(--gold))] pl-4 italic my-4">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}