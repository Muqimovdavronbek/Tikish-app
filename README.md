# TIKISH.UZ - Tailor Marketplace Platform

A modern web application connecting customers with expert tailors in Uzbekistan. Built with Next.js 16, React 19, and Tailwind CSS.

## Features

### For Customers
- **Tailor Discovery**: Browse and search verified tailors by specialty and location
- **Tailor Profiles**: View detailed profiles with portfolios, ratings, and reviews
- **Order Management**: Track orders in real-time with progress updates
- **Secure Payments**: Integrated payment system with escrow protection
- **Real-time Chat**: Communicate directly with tailors
- **Reviews & Ratings**: Leave feedback and read customer testimonials

### For Tailors
- **Professional Profiles**: Showcase your skills and experience
- **Portfolio Management**: Upload and organize your best work
- **Order Management**: Receive and manage customer orders
- **Earnings Dashboard**: Track income and completed projects
- **Client Reviews**: Build your reputation with ratings and testimonials
- **Verification Badge**: Get verified to increase client trust

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom theme
- **Components**: shadcn/ui component library
- **State Management**: React hooks with localStorage (demo mode)
- **Database**: Ready for Supabase integration
- **Authentication**: Prepared for Supabase Auth

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── globals.css             # Theme and tailwind config
│   ├── page.tsx                # Homepage with marketplace
│   ├── auth/
│   │   ├── login/page.tsx      # Login page
│   │   └── signup/page.tsx     # Signup page
│   ├── dashboard/page.tsx      # User/tailor dashboard
│   ├── tailor/[id]/page.tsx    # Tailor profile page
│   └── onboarding/page.tsx     # Account setup flow
├── components/
│   └── ui/                     # shadcn/ui components
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities and helpers
└── scripts/
    └── 01-create-schema.sql    # Database schema
```

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tikish-uz
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

### Demo Account Access

The application currently uses localStorage for demo purposes. You can:
- Sign up with any email and password
- Choose to be a Customer or Tailor
- Complete the onboarding process
- Access the dashboard and explore features

## Database Setup (Supabase)

To enable real data persistence, set up Supabase:

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Run Database Schema**
   - Copy the SQL from `scripts/01-create-schema.sql`
   - Execute in Supabase SQL editor

3. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Key Pages

### Public Pages
- `/` - Homepage with marketplace and tailor discovery
- `/tailor/[id]` - Individual tailor profile with portfolio and reviews

### Authentication Pages
- `/auth/login` - User login
- `/auth/signup` - Account creation with role selection

### User Pages (Protected)
- `/onboarding` - Account setup and profile completion
- `/dashboard` - Customer or tailor dashboard with orders and management

## Future Enhancements

- [ ] Real-time chat system with WebSockets
- [ ] Payment integration (Stripe/Payme)
- [ ] Advanced search and filtering
- [ ] AI-powered tailor recommendations
- [ ] Video consultation booking
- [ ] Portfolio image hosting and management
- [ ] Push notifications for orders
- [ ] Mobile app (React Native)
- [ ] Localization (Uzbek language)
- [ ] Map-based tailor discovery
- [ ] Admin dashboard for moderation
- [ ] Analytics and insights

## Styling

The application uses a professional teal/emerald color scheme optimized for trust and professionalism:
- **Primary Color**: Teal (#00A699)
- **Secondary Color**: Light Blue-Gray
- **Neutrals**: White, grays, and dark blue-grays
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Performance Optimizations

- Next.js 16 with Turbopack bundler (default)
- Image optimization with next/image
- Component-level code splitting
- Optimized asset loading
- CSS-in-JS with Tailwind CSS

## Security Considerations

- Password hashing ready for bcrypt implementation
- Secure session management structure
- Input validation on all forms
- CORS configuration ready
- Environment variables for sensitive data

## Support & Feedback

For issues, feature requests, or feedback, please open an issue in the repository.

## License

MIT License - feel free to use this template for your projects.

---

Built with ❤️ for the TIKISH.UZ community
