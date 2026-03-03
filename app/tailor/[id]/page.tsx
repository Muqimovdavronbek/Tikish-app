'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Shield, Clock, Zap, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function TailorProfilePage({ params }: { params: { id: string } }) {
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock tailor data
  const tailor = {
    id: params.id,
    name: 'Madina Shodmonova',
    specialty: 'Wedding Dress Design & Alterations',
    bio: 'Master tailor with 15+ years of experience in creating stunning wedding dresses and formal wear. I specialize in traditional Uzbek designs with modern aesthetics.',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85000,
    location: 'Fergana',
    verified: true,
    responseTime: 4,
    completionRate: 98,
    membersince: 'January 2018',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madina',
    specializations: ['Wedding Dresses', 'Formal Wear', 'Alterations', 'Traditional Designs'],
    portfolio: [
      {
        id: 1,
        title: 'Bridal Collection 2025',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
        category: 'Wedding Dresses',
      },
      {
        id: 2,
        title: 'Custom Chapan Designs',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        category: 'Traditional Wear',
      },
      {
        id: 3,
        title: 'Formal Alterations',
        image: 'https://images.unsplash.com/photo-1595777707802-b8b6e0d7bf9c?w=400&h=400&fit=crop',
        category: 'Alterations',
      },
      {
        id: 4,
        title: 'Evening Gowns',
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop',
        category: 'Evening Wear',
      },
    ],
    reviews_list: [
      {
        id: 1,
        reviewer: 'Yasmin K.',
        rating: 5,
        comment: 'Amazing work! Madina transformed my dress beyond my expectations. Highly professional!',
        date: '2 weeks ago',
      },
      {
        id: 2,
        reviewer: 'Aziza M.',
        rating: 5,
        comment: 'Perfect fit and beautiful design. Will definitely order again!',
        date: '1 month ago',
      },
      {
        id: 3,
        reviewer: 'Dilshoda T.',
        rating: 4,
        comment: 'Great tailor, very detailed work. Quick turnaround time.',
        date: '2 months ago',
      },
    ],
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
          <Link href="/auth/login">
            <Button variant="ghost">Back</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Avatar className="w-32 h-32">
              <img src={tailor.image} alt={tailor.name} />
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{tailor.name}</h1>
                    {tailor.verified && (
                      <Shield className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <p className="text-lg text-primary font-semibold mb-2">{tailor.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tailor.location}
                    </div>
                    <span>Member since {tailor.membersince}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{tailor.rating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">({tailor.reviews} reviews)</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{tailor.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-bold">{tailor.responseTime}h</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Avg. Response</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-primary">{tailor.hourlyRate.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">сум/hour</p>
                </div>
              </div>

              <Button className="bg-primary hover:bg-primary/90 gap-2 w-full md:w-auto">
                <MessageSquare className="w-4 h-4" />
                Contact Tailor
              </Button>
            </div>
          </div>
        </Card>

        {/* Bio */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-bold mb-4">About</h3>
          <p className="text-muted-foreground leading-relaxed">{tailor.bio}</p>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-bold mb-4">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {tailor.specializations.map((spec, idx) => (
                <Badge key={idx} variant="secondary">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faqs">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tailor.portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {tailor.reviews_list.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold">{review.reviewer}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < review.rating ? '#FBBF24' : '#E5E7EB'}
                          color={i < review.rating ? '#FBBF24' : '#E5E7EB'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">What is your turnaround time?</h4>
                  <p className="text-muted-foreground">Most projects take 2-4 weeks depending on complexity. Rush orders are available for an additional fee.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="font-bold mb-2">Do you offer international shipping?</h4>
                  <p className="text-muted-foreground">Yes, I ship internationally! Shipping costs vary by location and will be quoted after discussing your project details.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="font-bold mb-2">What payment methods do you accept?</h4>
                  <p className="text-muted-foreground">I accept payments through the TIKISH.UZ platform, which supports all major payment methods. A 50% deposit is required to start your project.</p>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="font-bold mb-2">Can I request custom designs?</h4>
                  <p className="text-muted-foreground">Absolutely! I specialize in custom designs. Please share your ideas, reference images, or sketches when submitting your request.</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <Card className="p-8 mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to work with {tailor.name.split(' ')[0]}?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get started with your custom tailoring project today. Madina will review your request and get back to you within {tailor.responseTime} hours.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Place Order Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
