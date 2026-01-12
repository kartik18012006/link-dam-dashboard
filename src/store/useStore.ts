import { create } from 'zustand'

export interface Link {
  id: string
  title: string
  url: string
  enabled: boolean
  order: number
  clickCount: number
}

export interface ThemeSettings {
  profileImage: string | null
  displayName: string | null
  bio: string | null
  theme: 'light' | 'dark' | 'gradient'
  buttonStyle: 'rounded' | 'square'
  accentColor: string
  fontFamily: string
}

export interface User {
  id: string
  email: string
  username: string
  name: string
  image: string | null
}

interface Analytics {
  totalViews: number
  totalClicks: number
  pageViews: Array<{ date: string; count: number }>
  clickEvents: Array<{ date: string; count: number }>
}

interface AppState {
  user: User
  links: Link[]
  themeSettings: ThemeSettings
  analytics: Analytics
  addLink: (link: Omit<Link, 'id' | 'order' | 'clickCount'>) => void
  updateLink: (id: string, updates: Partial<Link>) => void
  deleteLink: (id: string) => void
  reorderLinks: (links: Link[]) => void
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void
  updateUser: (updates: Partial<User>) => void
}

// Generate mock analytics data
const generateMockAnalytics = (): Analytics => {
  const pageViews = []
  const clickEvents = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    pageViews.push({
      date: dateStr,
      count: Math.floor(Math.random() * 20) + 5,
    })

    clickEvents.push({
      date: dateStr,
      count: Math.floor(Math.random() * 15) + 3,
    })
  }

  return {
    totalViews: pageViews.reduce((sum, pv) => sum + pv.count, 0),
    totalClicks: clickEvents.reduce((sum, ce) => sum + ce.count, 0),
    pageViews,
    clickEvents,
  }
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: '1',
    email: 'john@example.com',
    username: 'johndoe',
    name: 'John Doe',
    image: null,
  },
  links: [
    {
      id: '1',
      title: 'My Website',
      url: 'https://example.com',
      enabled: true,
      order: 0,
      clickCount: 42,
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com',
      enabled: true,
      order: 1,
      clickCount: 28,
    },
    {
      id: '3',
      title: 'Twitter',
      url: 'https://twitter.com',
      enabled: true,
      order: 2,
      clickCount: 15,
    },
  ],
  themeSettings: {
    profileImage: null,
    displayName: 'John Doe',
    bio: 'Creator, Developer, Designer',
    theme: 'light',
    buttonStyle: 'rounded',
    accentColor: '#3b82f6',
    fontFamily: 'Inter',
  },
  analytics: generateMockAnalytics(),
  addLink: (link) =>
    set((state) => {
      const newLink: Link = {
        ...link,
        id: Date.now().toString(),
        order: state.links.length,
        clickCount: 0,
      }
      return { links: [...state.links, newLink] }
    }),
  updateLink: (id, updates) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    })),
  deleteLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),
  reorderLinks: (newLinks) =>
    set({
      links: newLinks.map((link, index) => ({ ...link, order: index })),
    }),
  updateThemeSettings: (settings) =>
    set((state) => ({
      themeSettings: { ...state.themeSettings, ...settings },
    })),
  updateUser: (updates) =>
    set((state) => ({
      user: { ...state.user, ...updates },
    })),
}))
