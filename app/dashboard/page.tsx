'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare, Plus, Clock, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  userType: string;
}

interface Order {
  id: string;
  title: string;
  tailor: string;
  status: string;
  price: number;
  deadline: string;
  progress: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('orders');
  const router = useRouter();

  const orders: Order[] = [
    {
      id: '1',
      title: 'Wedding Dress Alteration',
      tailor: 'Madina Shodmonova',
      status: 'in_progress',
      price: 500000,
      deadline: '2026-04-15',
      progress: 65,
    },
    {
      id: '2',
      title: 'Custom Suit Tailoring',
      tailor: 'Rustam Tailors',
      status: 'pending',
      price: 750000,
      deadline: '2026-03-30',
      progress: 10,
    },
    {
      id: '3',
      title: 'Traditional Chapan',
      tailor: 'Gulnoza Fashion Studio',
      status: 'completed',
      price: 450000,
      deadline: '2026-02-28',
      progress: 100,
    },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500/20 text-blue-700">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-700">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user.name}</span>
            <Link href="/messages">
              <Button variant="ghost">Messages</Button>
            </Link>
            <Link href="/stylist">
              <Button variant="ghost">AI Stylist</Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Dashboard</h2>
            <p className="text-muted-foreground">
              {user.userType === 'customer' ? 'Manage your orders and find tailors' : 'Manage your tailor profile and orders'}
            </p>
          </div>
          {user.userType === 'customer' && (
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                New Order
              </Button>
            </Link>
          )}
        </div>

        {user.userType === 'customer' ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Active Orders</h3>
                <div className="space-y-4">
                  {orders.filter(o => o.status !== 'completed').map(order => (
                    <Card key={order.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold">{order.title}</h4>
                          <p className="text-sm text-muted-foreground">Tailor: {order.tailor}</p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{order.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="text-muted-foreground">Deadline: {order.deadline}</span>
                        <span className="font-bold text-primary">{order.price.toLocaleString()} сум</span>
                      </div>
                      <Button variant="outline" className="w-full gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message Tailor
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Completed Orders</h3>
                <div className="space-y-4">
                  {orders.filter(o => o.status === 'completed').map(order => (
                    <Card key={order.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold">{order.title}</h4>
                          <p className="text-sm text-muted-foreground">Tailor: {order.tailor}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <Card className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">No messages yet</h3>
                <p className="text-muted-foreground">Start chatting with tailors on your active orders</p>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Profile Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Name</label>
                    <p className="text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Email</label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Account Type</label>
                    <p className="text-muted-foreground">Customer</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">Order Requests</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card className="p-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">No pending orders</h3>
                <p className="text-muted-foreground">You'll see new order requests here</p>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Portfolio Items</h3>
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>
                </div>
                <p className="text-muted-foreground text-center py-12">No portfolio items yet. Start by uploading your best work!</p>
              </Card>
            </TabsContent>

            <TabsContent value="earnings">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Earnings</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold">0 сум</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">0 сум</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Completed Orders</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-6">Tailor Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Name</label>
                    <p className="text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Email</label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Specialization</label>
                    <p className="text-muted-foreground">Not set yet</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
