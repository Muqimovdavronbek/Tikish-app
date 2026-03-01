'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  userType: string;
}

export default function OnboardingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [specialty, setSpecialty] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signup');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleCompleteOnboarding = () => {
    if (user) {
      const updatedUser = {
        ...user,
        phone,
        city,
        bio,
        ...(user.userType === 'tailor' && { specialty }),
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      router.push('/dashboard');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Step {step} of {user.userType === 'customer' ? 2 : 3}
            </span>
            <div className="flex gap-2">
              {[1, 2, ...(user.userType === 'tailor' ? [3] : [])].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    s <= step ? 'bg-primary' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to TIKISH.UZ!</h2>
                <p className="text-muted-foreground">Let's complete your profile setup</p>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+998 (99) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Tashkent"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && user.userType === 'customer' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                <p className="text-muted-foreground">Your account is ready to use</p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Welcome, {user.name}!</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile is complete. Start exploring tailors and placing orders.
                </p>
              </div>

              <Button
                onClick={handleCompleteOnboarding}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Go to Dashboard
              </Button>
            </div>
          )}

          {step === 2 && user.userType === 'tailor' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Set Your Specialty</h2>
                <p className="text-muted-foreground">What type of tailoring do you specialize in?</p>
              </div>

              <div>
                <Label htmlFor="specialty">Primary Specialty</Label>
                <select
                  id="specialty"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="mt-2 w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a specialty</option>
                  <option value="wedding">Wedding Dresses</option>
                  <option value="mens">Men's Formal Wear</option>
                  <option value="traditional">Traditional Uzbek Clothing</option>
                  <option value="alterations">Alterations & Repairs</option>
                  <option value="casual">Casual Wear</option>
                  <option value="custom">Custom Design</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> You can add more specialties and update your portfolio once your account is active.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && user.userType === 'tailor' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                <p className="text-muted-foreground">Your tailor profile is ready</p>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Welcome to TIKISH.UZ, {user.name.split(' ')[0]}!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your profile is complete. Start receiving orders from customers.
                </p>
                <p className="text-sm text-muted-foreground">
                  Next, upload your portfolio to showcase your best work and increase your chances of getting orders.
                </p>
              </div>

              <Button
                onClick={handleCompleteOnboarding}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
