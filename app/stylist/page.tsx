'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AIStylist } from '@/components/ai-stylist';
import Link from 'next/link';
import { Sparkles, Zap, Heart, Shield } from 'lucide-react';

export default function StylistPage() {
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
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
          {/* AI Stylist Chat */}
          <div className="lg:col-span-2">
            <AIStylist />
          </div>

          {/* Sidebar with Features */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-bold">AI Stylist Features</h3>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Smart Recommendations
                  </h4>
                  <p className="text-muted-foreground">Get personalized tailor suggestions based on your style preferences and budget.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-destructive" />
                    Style Matching
                  </h4>
                  <p className="text-muted-foreground">Describe your vision and I'll match you with tailors who can bring it to life.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Expert Guidance
                  </h4>
                  <p className="text-muted-foreground">Get advice on designs, fabrics, timelines, and pricing for your projects.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/10 border-primary/20">
              <h3 className="font-bold mb-3">Popular Categories</h3>
              <div className="space-y-2">
                {['Wedding Dresses', 'Formal Wear', 'Traditional Design', 'Alterations', 'Custom Tailoring', 'Evening Gowns'].map(
                  (category) => (
                    <button key={category} className="w-full text-left px-3 py-2 rounded hover:bg-primary/20 transition-colors text-sm">
                      {category}
                    </button>
                  )
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ask me anything about finding the right tailor, design options, or project costs.
              </p>
              <Link href="/messages" className="block">
                <Button variant="outline" className="w-full">
                  View Messages
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <section className="mt-16 py-12 border-t border-border">
          <h2 className="text-2xl font-bold mb-8">How AI Stylist Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: 1,
                title: 'Describe Your Vision',
                desc: 'Tell me what you\'re looking for - style, budget, timeline, and any special requirements.',
              },
              {
                num: 2,
                title: 'Get Recommendations',
                desc: 'I\'ll analyze your needs and recommend the best matching tailors from our verified network.',
              },
              {
                num: 3,
                title: 'Connect with Tailors',
                desc: 'Review profiles, portfolios, and ratings. Start chatting with your top choices.',
              },
              {
                num: 4,
                title: 'Finalize & Create',
                desc: 'Work with your chosen tailor to finalize details and create your perfect custom piece.',
              },
            ].map((step) => (
              <Card key={step.num} className="p-6">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
