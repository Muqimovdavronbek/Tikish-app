'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Star, Search, MapPin, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for tailors
  const tailors = [
    {
      id: 1,
      name: 'Madina Shodmonova',
      specialty: 'Wedding Dress Design',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85000,
      location: 'Tashkent',
      verified: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madina',
    },
    {
      id: 2,
      name: 'Rustam Tailors',
      specialty: 'Men\'s Formal Wear',
      rating: 4.8,
      reviews: 95,
      hourlyRate: 65000,
      location: 'Tashkent',
      verified: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rustam',
    },
    {
      id: 3,
      name: 'Gulnoza Fashion Studio',
      specialty: 'Traditional Uzbek Clothing',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 75000,
      location: 'Samarkand',
      verified: true,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gulnoza',
    },
    {
      id: 4,
      name: 'Aziz Alterations',
      specialty: 'Clothing Alterations',
      rating: 4.7,
      reviews: 84,
      hourlyRate: 45000,
      location: 'Bukhara',
      verified: false,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz',
    },
  ];

  const filteredTailors = tailors.filter(tailor =>
    tailor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tailor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">TZ</span>
            </div>
            <h1 className="text-xl font-bold">TIKISH.UZ</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/stylist">
              <Button variant="ghost">AI Stylist</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Connect with expert tailors in Uzbekistan
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Find skilled tailors for custom clothing, alterations, and traditional Uzbek designs. Quality craftsmanship, verified professionals, transparent pricing.
          </p>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by tailor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-card border-border"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div>
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Expert Tailors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">10k+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tailors */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8">Featured Tailors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTailors.map((tailor) => (
            <Card key={tailor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="w-12 h-12">
                    <img src={tailor.image} alt={tailor.name} />
                  </Avatar>
                  {tailor.verified && (
                    <Shield className="w-5 h-5 text-primary" />
                  )}
                </div>

                <h4 className="font-bold mb-1">{tailor.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tailor.specialty}</p>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{tailor.rating}</span>
                  <span className="text-sm text-muted-foreground">({tailor.reviews})</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  {tailor.location}
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-lg font-bold text-primary">
                    {tailor.hourlyRate.toLocaleString()} сум/hour
                  </p>
                </div>

                <Link href={`/tailor/${tailor.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    View Profile
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {filteredTailors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tailors found matching your search.</p>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Why Choose TIKISH.UZ?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center font-bold mb-4">
              🤖
            </div>
            <h4 className="font-bold mb-2">AI Stylist Assistant</h4>
            <p className="text-sm text-muted-foreground">
              Get personalized tailor recommendations and expert styling advice powered by AI
            </p>
          </Card>
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center font-bold mb-4">
              ✓
            </div>
            <h4 className="font-bold mb-2">Verified Tailors</h4>
            <p className="text-sm text-muted-foreground">
              All tailors are carefully vetted and verified for quality and reliability
            </p>
          </Card>
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center font-bold mb-4">
              💬
            </div>
            <h4 className="font-bold mb-2">Real-Time Chat</h4>
            <p className="text-sm text-muted-foreground">
              Communicate directly with tailors to discuss your project details and timeline
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-12 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Search Tailors', desc: 'Browse verified tailors by specialty and location' },
              { num: 2, title: 'Create Order', desc: 'Describe your project and set your budget' },
              { num: 3, title: 'Communicate', desc: 'Chat with tailors and finalize details' },
              { num: 4, title: 'Secure Payment', desc: 'Pay safely through our platform' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of customers who have found their perfect tailor on TIKISH.UZ
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">How It Works</a></li>
                <li><a href="#" className="hover:text-primary">Become a Tailor</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Safety</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Uzbekistan</h4>
              <p className="text-sm text-muted-foreground">Connecting skilled tailors with customers across Uzbekistan</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 TIKISH.UZ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
