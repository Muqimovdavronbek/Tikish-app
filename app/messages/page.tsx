'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { OrderChat } from '@/components/order-chat';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MessageSquare } from 'lucide-react';

interface Conversation {
  id: string;
  orderId: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: string;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      orderId: '1',
      otherUser: {
        id: 'tailor-1',
        name: 'Madina Shodmonova',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madina',
        role: 'Tailor',
      },
      lastMessage: 'Thanks for your message! I\'ll review your request and send you a detailed proposal shortly.',
      lastMessageTime: new Date(Date.now() - 600000),
      unreadCount: 0,
      status: 'active',
    },
    {
      id: '2',
      orderId: '2',
      otherUser: {
        id: 'tailor-2',
        name: 'Rustam Tailors',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rustam',
        role: 'Tailor',
      },
      lastMessage: 'When would you like to schedule your first fitting?',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 1,
      status: 'active',
    },
    {
      id: '3',
      orderId: '3',
      otherUser: {
        id: 'customer-1',
        name: 'Yasmin K.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yasmin',
        role: 'Customer',
      },
      lastMessage: 'Can you add some embroidery details?',
      lastMessageTime: new Date(Date.now() - 86400000),
      unreadCount: 0,
      status: 'completed',
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const filteredConversations = conversations.filter((conv) =>
    conv.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">TZ</span>
            </div>
            <h1 className="text-xl font-bold">TIKISH.UZ</h1>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[600px]">
          {/* Conversations List */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-4">Messages</h2>
                {totalUnread > 0 && (
                  <Badge className="bg-destructive text-white mb-4">{totalUnread} unread</Badge>
                )}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <Card
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <img src={conversation.otherUser.avatar} alt={conversation.otherUser.name} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-sm truncate">{conversation.otherUser.name}</h3>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-destructive text-white">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {conversation.lastMessageTime.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No conversations found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2">
            {selectedConversation ? (
              <OrderChat
                orderId={selectedConversation.orderId}
                currentUserId={user.id}
                currentUserName={user.name}
                otherUserName={selectedConversation.otherUser.name}
                otherUserAvatar={selectedConversation.otherUser.avatar}
              />
            ) : (
              <Card className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold">No conversation selected</h3>
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
