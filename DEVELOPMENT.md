# Development Guidelines

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Authentication pages
│   ├── properties/       # Property management pages
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── dashboard/       # Dashboard-specific components
│   └── properties/      # Property-specific components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and types
└── types.ts             # TypeScript interfaces
```

## 🎯 Missing Pages & Routes

### Property Manager Routes
- [ ] `/properties/units` - Units & Access Info
- [ ] `/properties/maintenance` - Maintenance Schedules
- [ ] `/work-orders/*` - All work order pages
- [ ] `/contractors/*` - Contractor management pages
- [ ] `/messages/*` - Messaging pages
- [ ] `/reports/*` - Reporting pages
- [ ] `/settings/*` - Settings pages

### Admin Routes
- [ ] `/admin/*` - All admin pages
- [ ] `/admin/users/*` - User management
- [ ] `/admin/work-orders/*` - Work order monitoring
- [ ] `/admin/sms/*` - SMS management
- [ ] `/admin/storage/*` - Storage management
- [ ] `/admin/analytics/*` - Analytics
- [ ] `/admin/settings/*` - System settings
- [ ] `/admin/support/*` - Support
- [ ] `/admin/billing/*` - Billing
- [ ] `/admin/security/*` - Security
- [ ] `/admin/activity/*` - Activity logs

### Contractor Routes
- [ ] `/contractor/*` - All contractor pages
- [ ] `/contractor/jobs/*` - Job management
- [ ] `/contractor/upload/*` - Upload center
- [ ] `/contractor/messages/*` - Messaging
- [ ] `/contractor/profile/*` - Profile management
- [ ] `/contractor/history/*` - History
- [ ] `/contractor/support/*` - Support

### Accountant Routes
- [ ] `/accountant/*` - All accountant pages
- [ ] `/accountant/invoices/*` - Invoice management
- [ ] `/accountant/payments/*` - Payment processing
- [ ] `/accountant/reports/*` - Financial reports
- [ ] `/accountant/tax/*` - Tax & compliance
- [ ] `/accountant/contractors/*` - Contractor payments
- [ ] `/accountant/analytics/*` - Analytics
- [ ] `/accountant/settings/*` - Financial settings

## 🛠️ Development Best Practices

### 1. Component Structure
```typescript
// Use consistent component structure
interface ComponentProps {
  // Props interface
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### 2. Error Handling
- Use the `ErrorBoundary` component for error catching
- Implement proper loading states with `LoadingSkeleton`
- Handle API errors gracefully
- Provide user-friendly error messages

### 3. TypeScript
- Use the defined interfaces in `src/lib/types.ts`
- Avoid `any` types - use proper typing
- Create specific interfaces for component props

### 4. Styling
- Use Tailwind CSS classes
- Follow the design system defined in `globals.css`
- Use shadcn/ui components for consistency

### 5. State Management
- Use React hooks for local state
- Use `useLocalStorage` hook for persistent data
- Consider context for global state when needed

### 6. Performance
- Use `React.memo` for expensive components
- Implement proper loading states
- Optimize images and assets
- Use Next.js Image component for images

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Adding New Pages

1. **Create the page file:**
   ```typescript
   // src/app/your-route/page.tsx
   export default function YourPage() {
     return (
       <div>
         {/* Your content */}
       </div>
     );
   }
   ```

2. **Add to sidebar navigation:**
   - Update the appropriate sidebar sections in `src/components/app-sidebar.tsx`
   - Add the route to the correct role's sidebar sections

3. **Create components if needed:**
   - Place reusable components in `src/components/`
   - Create page-specific components in appropriate subdirectories

## 🔧 Available Hooks

- `useIsMobile()` - Detect mobile devices
- `useLocalStorage<T>()` - Local storage management
- `LoadingSkeleton` - Loading state components
- `ErrorBoundary` - Error handling

## 🎨 UI Components

All UI components are from shadcn/ui and located in `src/components/ui/`. Available components:
- Button, Card, Input, Label
- DropdownMenu, Select, Tabs
- Sidebar, Navigation, etc.

## 📊 Data Flow

1. **Authentication:** Login → localStorage → Dashboard
2. **Role-based routing:** URL params → Sidebar sections
3. **Component state:** Local state → Props → Child components

## 🐛 Debugging

- Use browser dev tools for client-side debugging
- Check console for error messages
- Use React DevTools for component inspection
- Check Network tab for API calls (when implemented)

## 🔒 Security Considerations

- Validate all user inputs
- Sanitize data before rendering
- Use proper authentication (currently demo)
- Implement proper authorization checks
- Handle sensitive data securely

## 📱 Responsive Design

- Mobile-first approach
- Use `useIsMobile()` hook for mobile-specific logic
- Test on various screen sizes
- Ensure touch-friendly interactions

## 🎯 Next Steps

1. **Implement missing pages** based on the route list above
2. **Add proper API integration** when backend is ready
3. **Implement real authentication** system
4. **Add comprehensive testing** (unit, integration, e2e)
5. **Optimize performance** and bundle size
6. **Add accessibility features** (ARIA labels, keyboard nav)
7. **Implement offline support** with service workers
8. **Add comprehensive error tracking** and monitoring 