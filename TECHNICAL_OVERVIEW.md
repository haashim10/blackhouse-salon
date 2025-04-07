# BLACKHOUSE SALON Technical Overview

## Stack
- Next.js 15.1.5 (React Framework)
- TypeScript
- Tailwind CSS
- React 19

## Project Structure
```
app/                    # Next.js App Router structure
├── components/         # Shared components
├── about/             # About page
├── affiliate/         # Affiliate program page
├── book/              # Booking page
├── careers/           # Careers page
├── contact/           # Contact page
├── opening-times/     # Opening times page
├── reviews/           # Reviews page
├── services/          # Services page
├── team/              # Team page
├── globals.css        # Global styles
├── layout.tsx         # Root layout (navigation)
└── page.tsx           # Homepage
```

## Key Features
1. **Theme System**
   - Dark/light mode support
   - Uses Context API (ThemeProvider)
   - Persists theme preference in localStorage
   - CSS variables for colors in globals.css

2. **Navigation**
   - Responsive navbar with dropdown menu
   - Social media links
   - Cart and login functionality (placeholder)

3. **Homepage**
   - Animated text typing effect
   - Image carousel
   - Responsive design
   - Call-to-action buttons

## Development Workflow
1. Start dev server: `npm run dev` (uses Turbopack)
2. Run checks: `npm run checks` (TypeScript + ESLint)
3. Build: `npm run build`
4. Start prod: `npm run start`

## Important Files
- `app/layout.tsx`: Main layout, navigation
- `app/globals.css`: Theme variables, animations
- `app/page.tsx`: Homepage with animations
- `components/theme-provider.tsx`: Theme context
- `tailwind.config.ts`: Theme customization

## Styling
- Uses Tailwind CSS with custom configuration
- Dark mode enabled via 'class' strategy
- Custom CSS variables for theming
- Custom animations in globals.css

## Deployment
- Configured for standalone output
- Ready for Vercel deployment
- Images configured for external domains

## Best Practices
1. Use TypeScript for type safety
2. Follow existing component patterns
3. Maintain dark mode support
4. Keep animations performant
5. Use Next.js Image component for images
6. Follow existing naming conventions

## Common Tasks
1. **Adding a New Page**
   - Create new directory in `app/`
   - Add page.tsx with default export

2. **Creating Components**
   - Add to `app/components/`
   - Use TypeScript interfaces
   - Support dark mode if needed

3. **Styling**
   - Use Tailwind classes
   - Add custom styles to globals.css
   - Follow CSS variable pattern for theming