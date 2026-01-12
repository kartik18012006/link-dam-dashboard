# Link Dam Dashboard

A production-quality React dashboard for a link-in-bio SaaS application.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

The app will automatically redirect to `/dashboard/links`

## ✨ Features

- **Links Management** - Add, edit, delete, and drag-and-drop reorder links
- **Appearance Customization** - Customize profile image, theme, colors, fonts, and button styles with live preview
- **Analytics Dashboard** - View charts and metrics with mock data
- **Settings** - Manage account settings
- **Responsive Design** - Mobile-first with collapsible sidebar
- **Smooth Animations** - Framer Motion animations throughout
- **Toast Notifications** - User feedback for all actions

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Recharts** - Analytics charts
- **@dnd-kit** - Drag and drop
- **Lucide Icons** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/     # Dashboard-specific components
│   ├── layout/        # Layout components (Sidebar, TopBar)
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
├── store/             # Zustand store
└── lib/               # Utility functions
```

## 🎯 Dashboard Pages

- `/dashboard/links` - Manage your links
- `/dashboard/appearance` - Customize appearance
- `/dashboard/analytics` - View analytics
- `/dashboard/settings` - Account settings

## 📝 Notes

- **Frontend Only** - No backend, all data stored in Zustand
- **Mock Data** - Realistic mock data for demonstration
- **Production Ready** - Clean code, type-safe, well-organized

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 🎉 Enjoy!

The dashboard is fully functional with all interactions working via local state management.
