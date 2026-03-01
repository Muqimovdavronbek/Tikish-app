'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIStylist() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Hello! I\'m your personal AI Stylist powered by TIKISH.UZ. I can help you find the perfect tailor and design for your clothing needs. What are you looking for today?',
      timestamp: new Date(),
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);

    try {
      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const responses: { [key: string]: string } = {
        wedding:
          'I can help you find the perfect tailor for your wedding dress! Are you looking for traditional Uzbek designs, modern styles, or something custom? I\'d also like to know your approximate budget and timeline.',
        formal:
          'Great choice! For formal wear, I recommend tailors who specialize in men\'s formal wear and evening gowns. They can create custom-fitted suits, tuxedos, and elegant dresses. What\'s your budget range?',
        alterations:
          'I can connect you with experienced tailors who specialize in alterations and repairs. Whether it\'s hemming, fitting adjustments, or zipper repairs, we have experts ready to help.',
        traditional:
          'Wonderful! Traditional Uzbek clothing like chapan, qalipak, and embroidered garments are beautiful. I can recommend tailors who specialize in authentic traditional designs. Would you like recommendations?',
        default:
          'That\'s interesting! Tell me more about what you\'re looking for. Are you interested in custom tailoring, alterations, traditional designs, or formal wear? This will help me recommend the best tailors for your needs.',
      };

      let response = responses.default;

      if (newMessage.toLowerCase().includes('wedding')) response = responses.wedding;
      else if (newMessage.toLowerCase().includes('formal')) response = responses.formal;
      else if (newMessage.toLowerCase().includes('alteration')) response = responses.alterations;
      else if (newMessage.toLowerCase().includes('traditional')) response = responses.traditional;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickSuggestions = [
    { icon: '👰', label: 'Wedding Dress', prompt: 'I need help finding a tailor for a wedding dress' },
    { icon: '🎩', label: 'Formal Wear', prompt: 'Looking for formal wear like suits' },
    { icon: '✂️', label: 'Alterations', prompt: 'I need alterations and repairs' },
    { icon: '🧵', label: 'Traditional', prompt: 'Show me traditional Uzbek clothing tailors' },
  ];

  return (
    <Card className="flex flex-col h-full bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <div className="border-b border-border/50 p-4 flex items-center gap-2 bg-primary/10">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-bold">AI Stylist Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div key={message.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}>
                {isUser ? '👤' : '✨'}
              </div>

              <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-xs rounded-lg p-3 ${isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card border border-border rounded-bl-none'}`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}

        {messages.length <= 1 && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-muted-foreground text-center font-semibold">Quick suggestions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNewMessage(suggestion.prompt);
                  }}
                  className="p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors text-sm"
                >
                  <div className="text-xl mb-1">{suggestion.icon}</div>
                  <div className="text-xs font-medium">{suggestion.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t border-border p-4 flex gap-2 bg-white dark:bg-gray-950">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask me about tailors, styles, or designs..."
          disabled={loading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={loading || !newMessage.trim()}
          size="icon"
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
}
