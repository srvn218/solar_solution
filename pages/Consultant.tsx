import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { createSolarChat, sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const Consultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm Aswin, your personal Solar Consultant. ☀️\n\nI can help you with:\n* Understanding solar technology\n* Estimating savings based on your bill\n* Choosing the right products\n* Installation processes\n\nHow can I help you go green today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<Chat | null>(null);

  // Initialize chat instance
  useEffect(() => {
    try {
      chatInstance.current = createSolarChat();
    } catch (e) {
      console.error("Failed to init chat", e);
      setError("Unable to connect to AI service. Please check your connection.");
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatInstance.current) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Create a placeholder for the AI response
    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMessageId,
      role: 'model',
      text: '',
      timestamp: new Date(),
      isStreaming: true
    }]);

    try {
      const streamResult = await sendMessageStream(chatInstance.current, userMessage.text);
      
      let fullText = '';
      
      for await (const chunk of streamResult) {
         const chunkText = (chunk as GenerateContentResponse).text;
         if (chunkText) {
             fullText += chunkText;
             setMessages(prev => prev.map(msg => 
                 msg.id === botMessageId 
                 ? { ...msg, text: fullText } 
                 : msg
             ));
         }
      }
      
      // Mark streaming as done
       setMessages(prev => prev.map(msg => 
           msg.id === botMessageId 
           ? { ...msg, isStreaming: false } 
           : msg
       ));

    } catch (err) {
      console.error(err);
      setError("I'm having trouble connecting to the solar network right now. Please try again.");
      // Remove the empty loading message if failed
      setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pt-20 h-screen flex flex-col bg-gray-50">
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col h-full">
        
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-sm border-b border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="bg-primary-100 p-2 rounded-full">
               <Bot className="w-6 h-6 text-primary-600" />
             </div>
             <div>
               <h1 className="font-bold text-gray-800">Aswin AI Consultant</h1>
               <p className="text-xs text-green-600 flex items-center">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                 Online
               </p>
             </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1"/> Connection Issue
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white shadow-sm scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-600" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {msg.role === 'model' ? (
                   <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-primary-600">
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                     {msg.isStreaming && <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1">|</span>}
                   </div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                )}
                <div className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-primary-100' : 'text-gray-500'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="flex-shrink-0 ml-3">
                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                     <User className="w-4 h-4 text-gray-500" />
                   </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 rounded-b-2xl shadow-sm border-t border-gray-100">
          <div className="relative flex items-end bg-gray-50 rounded-xl border border-gray-200 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about solar panels, costs, or installation..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 pl-4 pr-12 max-h-32 text-gray-700 placeholder-gray-400"
              rows={1}
              style={{ minHeight: '50px' }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bottom-2 p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-400">AI can make mistakes. Please verify critical information with our human agents.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Consultant;