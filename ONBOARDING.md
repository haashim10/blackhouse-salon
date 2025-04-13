# BLACKHOUSE SALON Developer Onboarding

Welcome to the BLACKHOUSE SALON project! This guide will help you get started with development.

## Project Overview

BLACKHOUSE SALON is a modern hair salon website built with:
- Next.js 14.1.0 (React Framework)
- TypeScript
- Tailwind CSS
- React 18

The site features:
- Responsive design with dark/light theme
- Booking system
- Team/stylist profiles
- Gift card system
- Image carousel
- Animated components

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev  # Uses Next.js built-in development server
```

3. View the site at: http://localhost:3000

### Docker Setup (Optional)

The project includes Docker configuration for both development and production environments:

1. Development:
```bash
docker-compose up app-dev
```

2. Production:
```bash
docker-compose up app-prod
```

## Project Structure

```
app/                    # Next.js App Router structure
├── components/         # Shared components
├── about/             # About page
├── affiliate/         # Affiliate program
├── book/              # Booking system
├── careers/           # Careers page
├── contact/           # Contact page
├── opening-times/     # Opening times
├── reviews/           # Reviews page
├── team/              # Team profiles
├── globals.css        # Global styles
├── layout.tsx         # Root layout (navigation)
└── page.tsx           # Homepage

types/                 # TypeScript interfaces
├── booking.ts         # Booking types
├── giftCard.ts        # Gift card types
├── product.ts         # Product types
├── service.ts         # Service types
├── stylist.ts         # Stylist types
└── user.ts           # User types
```

## Key Features & Implementation

### 1. Theme System
- Uses React Context (ThemeProvider)
- Dark/light mode with Tailwind
- Theme persists in localStorage
- CSS variables in globals.css control colors

### 2. Navigation
- Responsive navbar with dropdown
- Social media integration
- Cart and login placeholders
- Animated link underlines

### 3. Homepage
- Typing text animation
- Image carousel with fade transitions
- Responsive layout
- CSS animations defined in globals.css

## Development Workflow

1. **Starting Development**
   ```bash
   npm run dev
   ```

2. **Code Quality Checks**
   ```bash
   npm run checks   # Runs TypeScript + ESLint
   ```

3. **Building for Production**
   ```bash
   npm run build
   npm run start   # Test production build
   ```

## Best Practices

1. **TypeScript**
   - Use strict types
   - Define interfaces in types/ directory
   - No any types unless absolutely necessary

2. **Components**
   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Support dark/light themes
   - Follow existing naming patterns

3. **Styling**
   - Use Tailwind classes primarily
   - Custom styles go in globals.css
   - Follow CSS variable pattern for theming
   - Maintain responsive design

4. **Images**
   - Always use Next.js Image component
   - Include alt text
   - Set appropriate sizes prop
   - Use priority prop for above-fold images

5. **Performance**
   - Keep animations performant
   - Lazy load below-fold content
   - Optimize images
   - Monitor bundle size

## Common Tasks

### Adding a New Page
1. Create directory in app/
2. Add page.tsx with default export
3. Update navigation if needed

Example:
```tsx
export default function NewPage() {
  return (
    <main className="pt-24">
      <h1>New Page</h1>
    </main>
  );
}
```

### Creating Components
1. Add to app/components/
2. Define TypeScript interface
3. Support dark mode if needed

Example:
```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-accent text-background"
    >
      {label}
    </button>
  );
}
```

### Running Checks
Before committing:
1. Run TypeScript check
2. Run ESLint
3. Test in both light/dark modes
4. Check responsive layouts

## Need Help?

1. Check TECHNICAL_OVERVIEW.md for architecture details
2. Review existing components for patterns
3. Ask team members for guidance
4. Consult Next.js docs: https://nextjs.org/docs

## Deployment

The project is configured for deployment on Vercel:
- Outputs standalone build
- Optimizes images
- Handles routing automatically

You can also deploy using Docker with the provided configuration files.