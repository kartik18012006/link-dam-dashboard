import { useLocation } from 'react-router-dom'
import { useStore } from '@/store/useStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, LogOut } from 'lucide-react'

const pageTitles: Record<string, string> = {
  '/dashboard/links': 'Links',
  '/dashboard/appearance': 'Appearance',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/settings': 'Settings',
}

export function TopBar() {
  const location = useLocation()
  const { user } = useStore()
  const pageTitle = pageTitles[location.pathname] || 'Dashboard'

  return (
    <header className="flex h-16 items-center border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <h2 className="text-2xl font-semibold">{pageTitle}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
              <Avatar>
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
