'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  read: boolean;
}

interface OrderChatProps {
  orderId: string;
  currentUserId: string;
  currentUserName: string;
  otherUserName: string;
  otherUserAvatar?: string;
}

export function OrderChat({
  orderId,
  currentUserId,
  currentUserName,
  otherUserName,
  otherUserAvatar,
}: OrderChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: {
        id: 'tailor-1',
        name: 'Madina Shodmonova',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madina',
        role: 'Tailor',
      },
      content: 'Hello! I received your order request. I\'m very interested in this project!',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: '2',
      sender: {
        id: 'customer-1',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
        role: 'Customer',
      },
      content: 'Great! Can you tell me more about your wedding dress design process?',
      timestamp: new Date(Date.now() - 3000000),
      read: true,
    },
    {
      id: '3',
      sender: {
        id: 'tailor-1',
        name: 'Madina Shodmonova',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madina',
        role: 'Tailor',
      },
      content:
        'I work with you step by step - first consultation, then sketches, fittings, and final adjustments. The timeline typically takes 6-8 weeks for a complete wedding dress.',
      timestamp: new Date(Date.now() - 2500000),
      read: true,
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

    setLoading(true);

    try {
      // Simulate sending message
      const message: Message = {
        id: Date.now().toString(),
        sender: {
          id: currentUserId,
          name: currentUserName,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
          role: 'Customer',
        },
        content: newMessage,
        timestamp: new Date(),
        read: false,
      };

      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate tailor response after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: Date.now().toString(),
          sender: {
            id: 'tailor-1',
            name: otherUserName,
            avatar: otherUserAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=tailor',
            role: 'Tailor',
          },
          content: 'Thanks for your message! I\'ll review your request and send you a detailed proposal shortly.',
          timestamp: new Date(),
          read: false,
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4 flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <img src={otherUserAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=tailor'} alt={otherUserName} />
        </Avatar>
        <div>
          <h3 className="font-bold">{otherUserName}</h3>
          <p className="text-xs text-muted-foreground">Order #{orderId.slice(0, 8)}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.sender.id === currentUserId;
          return (
            <div key={message.id} className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                <img src={message.sender.avatar} alt={message.sender.name} />
              </Avatar>

              <div className={`flex-1 ${isCurrentUser ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-xs rounded-lg p-3 ${isCurrentUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary/50 text-foreground rounded-bl-none'}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t border-border p-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={loading || !newMessage.trim()}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
}
