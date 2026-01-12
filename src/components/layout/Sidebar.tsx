import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Link2, Palette, BarChart3, Settings } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface SidebarProps {
  onNavigate?: () => void
}

const navItems = [
  {
    title: 'Links',
    href: '/dashboard/links',
    icon: Link2,
  },
  {
    title: 'Appearance',
    href: '/dashboard/appearance',
    icon: Palette,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar({ onNavigate }: SidebarProps) {
  const { user } = useStore()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Link Dam</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </NavLink>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-3">
          <Avatar>
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
