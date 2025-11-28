import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';
import { ChatMessage, AppSettings } from '../types';
import { TEXT } from '../utils/translations';

interface AIAdvisorProps {
  settings: AppSettings;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ settings }) => {
  const t = TEXT[settings.language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  // Set initial greeting only once based on language
  useEffect(() => {
    if (!initialized.current) {
      setMessages([{
        role: 'model',
        text: t.ADVISOR_GREETING,
        timestamp: new Date()
      }]);
      initialized.current = true;
    }
  }, [t.ADVISOR_GREETING]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await getFinancialAdvice(input, settings);

    const modelMsg: ChatMessage = {
      role: 'model',
      text: advice,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl h-[600px] flex flex-col bg-ottoman-parchment rounded-xl shadow-2xl border-4 border-ottoman-teal overflow-hidden relative">
      {/* Header */}
      <div className="bg-ottoman-teal p-4 flex items-center gap-3 border-b-4 border-ottoman-gold">
        <div className="p-2 bg-ottoman-gold rounded-full text-ottoman-teal">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-white font-serif text-xl">{t.TOOL_ADVISOR}</h2>
          <p className="text-ottoman-gold text-xs font-body">Powered by Gemini Wisdom</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-opacity-50">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-ottoman-gold ${msg.role === 'user' ? 'bg-ottoman-red' : 'bg-ottoman-teal'}`}>
                {msg.role === 'user' ? <User size={16} className="text-white"/> : <Bot size={16} className="text-white"/>}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-md border font-body text-lg leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-white border-ottoman-red/20 text-ottoman-dark rounded-tr-none' 
                  : 'bg-ottoman-cream border-ottoman-teal/20 text-ottoman-dark rounded-tl-none'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                ))}
                <span className="text-[10px] opacity-50 block mt-2 text-right">
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start w-full animate-pulse">
                <div className="flex max-w-[80%] gap-3">
                    <div className="w-8 h-8 rounded-full bg-ottoman-teal flex items-center justify-center border-2 border-ottoman-gold">
                        <Bot size={16} className="text-white"/>
                    </div>
                    <div className="bg-ottoman-cream p-4 rounded-2xl rounded-tl-none border border-ottoman-teal/20 text-ottoman-teal italic font-body">
                        Consulting the archives...
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-2 border-ottoman-gold/50 flex items-center gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about Zakat, inheritance, or trade..."
          className="flex-1 p-3 bg-ottoman-parchment rounded-lg border border-ottoman-gold/30 focus:outline-none focus:ring-2 focus:ring-ottoman-teal resize-none font-body text-lg h-14"
        />
        <button 
            onClick={handleSend}
            disabled={isLoading}
            className="h-14 w-14 bg-ottoman-teal text-ottoman-gold rounded-lg hover:bg-ottoman-gold hover:text-ottoman-teal transition-colors flex items-center justify-center shadow-lg border-2 border-ottoman-gold disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default AIAdvisor;
