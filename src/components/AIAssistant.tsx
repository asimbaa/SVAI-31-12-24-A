import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuggestedQuestions } from '../hooks/useSuggestedQuestions';
import { useChat } from '../hooks/useChat';
import { StreamingMessage } from './chat/StreamingMessage';
import { SuggestedQuestions } from './chat/SuggestedQuestions';
import { AudioRecordButton } from './chat/AudioRecordButton';

export default function AIAssistant() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'assistant', content: string }>>([]);
  const { suggestedQuestions } = useSuggestedQuestions();

  const {
    processMessage,
    isProcessing,
    isStreaming,
    isRecording,
    volume,
    startRecording,
    stopRecording,
    streamQuestion
  } = useChat();

  const prefetchResponses = useCallback(async () => {
    if (!isOpen) return;
    for (const q of suggestedQuestions) {
      try {
        await processMessage(q);
      } catch (error) {
        // Ignore pre-fetch errors
      }
    }
  }, [isOpen, suggestedQuestions, processMessage]);

  useEffect(() => {
    prefetchResponses();
  }, [prefetchResponses]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    const currentQuestion = question;
    setQuestion('');
    
    setMessages(prev => [...prev, { type: 'user', content: currentQuestion }]);
    
    try {
      let currentResponse = '';
      await streamQuestion(currentQuestion, (chunk) => {
        currentResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[newMessages.length - 1]?.type === 'assistant') {
            newMessages[newMessages.length - 1].content = currentResponse;
          } else {
            newMessages.push({ type: 'assistant', content: currentResponse });
          }
          return newMessages;
        });
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setMessages(prev => [...prev, { type: 'assistant', content: `Sorry, I encountered an error: ${errorMessage}` }]);
    }
  };

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    handleSubmit(new Event('submit') as any);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[hsl(var(--gold))] text-[hsl(var(--navy))] p-4 rounded-full shadow-lg hover:bg-[hsl(var(--gold))]/90 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="w-full max-w-4xl bg-black/40 border border-white/10 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white">AI Immigration Assistant</h3>
                  <p className="text-sm text-white/60">Ask me anything about immigrating to Australia</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>
            
            <div className="h-[calc(100vh-12rem)] overflow-y-auto p-6 space-y-6">
              {messages.length === 0 && (
                <SuggestedQuestions
                  questions={suggestedQuestions}
                  onSelect={handleSuggestedQuestion}
                />
              )}
              
              {messages.map((message, index) => (
                <StreamingMessage
                  key={index}
                  content={message.content}
                  isComplete={index !== messages.length - 1 || !isStreaming}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <AudioRecordButton
                  isRecording={isRecording}
                  volume={volume}
                  onStartRecording={startRecording}
                  onStopRecording={stopRecording}
                />
                <input
                  type="text"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    // Pre-fetch responses for longer queries
                    if (e.target.value.length > 2) {
                      processMessage(e.target.value).catch(() => {});
                    }
                  }}
                  placeholder="Ask me anything about immigration..."
                  className="flex-1 p-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]/20 transition-all hover:bg-black/30"
                />
                <button
                  type="submit"
                  disabled={isProcessing || isStreaming}
                  className="bg-[hsl(var(--gold))] text-[hsl(var(--navy))] px-6 py-3 rounded-lg hover:bg-[hsl(var(--gold))]/90 transition-all disabled:opacity-50 font-medium shadow-lg hover:shadow-xl"
                >
                  {isProcessing || isStreaming ? 'Thinking...' : 'Ask'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}