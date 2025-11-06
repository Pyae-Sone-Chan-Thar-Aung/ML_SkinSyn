# SkinSync Frontend - Next.js Application

Modern, responsive web application built with Next.js 14, React 18, and TailwindCSS.

## Features

- ✨ Beautiful, modern UI with gradient designs
- 📱 Fully responsive on all devices
- ⚡ Fast performance with Next.js
- 🎨 TailwindCSS for styling
- 🔥 Interactive ML algorithm demonstrations
- 📊 Real-time predictions from backend API

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── about/page.tsx          # About page
│   ├── algorithms/page.tsx     # Algorithms explanation page
│   ├── try-now/page.tsx        # Interactive ML testing page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   └── Navbar.tsx              # Navigation component
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Pages

### Home (`/`)
- Company overview
- Mission and vision
- Algorithm showcase
- Call-to-action sections

### About (`/about`)
- Detailed company story
- Technology stack
- Why choose SkinSync

### Algorithms (`/algorithms`)
- Detailed explanation of all 6 ML algorithms
- Business value and use cases
- Technical details

### Try Now (`/try-now`)
- Interactive testing interface
- User profile input
- Product features configuration
- Real-time ML predictions

## Deployment to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=<your-backend-url>`
4. Deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

## Notes

- Make sure backend is running for the "Try Now" page to work
- All API calls are made from the client side
- CORS must be properly configured in the backend
