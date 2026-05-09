# ASOMOVIT SYNDIC

Professional property management website for ASOMOVIT SYNDIC, a copropriété (condominium) management company based in Marrakech, Morocco.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives (shadcn/ui)
- **Backend**: Supabase (form submissions)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Features

- 🏠 Modern, responsive design
- 📱 Mobile-first approach
- 🎨 Custom brand colors and design system
- 📝 Contact form with Supabase integration
- 🌐 SEO-optimized with structured data
- ♿ Accessibility-compliant
- 🚀 Production-ready

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── a-propos/          # About page
│   ├── services/          # Services page
│   ├── contact/           # Contact page + form
│   └── not-found.tsx      # 404 page
├── components/            # Reusable components
│   ├── SiteHeader.tsx     # Navigation header
│   ├── SiteFooter.tsx     # Footer
│   ├── FloatingContact.tsx # WhatsApp/Phone buttons
│   └── ui/                # shadcn/ui components
├── integrations/
│   └── supabase/          # Supabase client & types
├── lib/                   # Utilities
├── hooks/                 # Custom React hooks
└── assets/                # Images and static files
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Supabase account (for form submissions)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd asomovit-syndic
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

4. Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Supabase Setup

The contact form requires a Supabase table. Run the migration:

```sql
-- See supabase/migrations/20260417180000_quote_requests.sql
```

Or manually create the `quote_requests` table with the following columns:

- `id` (uuid, primary key)
- `created_at` (timestamptz)
- `name` (text)
- `email` (text)
- `phone` (text)
- `residence_name` (text, optional)
- `lots_count` (text, optional)
- `message` (text)

## Build for Production

```bash
npm run build
npm run start
```

## Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended, zero-config)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting**

For Vercel:

```bash
vercel
```

Make sure to set environment variables in your deployment platform.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## License

© 2025 ASOMOVIT SYNDIC. All rights reserved.

## Contact

- **Phone**: +212 661-901209
- **Email**: direction@asomovitmultiservices.com
- **Location**: Marrakech, Morocco
