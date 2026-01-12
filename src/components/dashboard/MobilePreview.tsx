import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Link, ThemeSettings, User } from '@/store/useStore'

interface MobilePreviewProps {
  user: User
  links: Link[]
  themeSettings: ThemeSettings
}

export function MobilePreview({
  user,
  links,
  themeSettings,
}: MobilePreviewProps) {
  const displayName = themeSettings.displayName || user.name || 'User'
  const profileImage = themeSettings.profileImage || user.image
  const bio = themeSettings.bio || 'Check out my links!'
  const theme = themeSettings.theme || 'light'
  const buttonStyle = themeSettings.buttonStyle || 'rounded'
  const accentColor = themeSettings.accentColor || '#3b82f6'
  const fontFamily = themeSettings.fontFamily || 'Inter'

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white'
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white'
      default:
        return 'bg-white text-gray-900'
    }
  }

  const getButtonStyles = () => {
    const baseStyles = `w-full py-3 px-4 font-medium transition-all hover:scale-105 active:scale-95`
    const rounded = buttonStyle === 'rounded' ? 'rounded-full' : 'rounded-lg'
    return `${baseStyles} ${rounded}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border-4 border-gray-800 shadow-2xl">
          <div
            className={`min-h-[600px] p-6 ${getThemeStyles()}`}
            style={{ fontFamily }}
          >
            <div className="flex flex-col items-center space-y-4 pb-8">
              {profileImage ? (
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src={profileImage} alt={displayName} />
                  <AvatarFallback>
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-3xl font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-center text-sm opacity-90">{bio}</p>
            </div>
            <div className="space-y-3">
              {links.length === 0 ? (
                <div className="py-8 text-center text-sm opacity-70">
                  No links yet
                </div>
              ) : (
                links.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${getButtonStyles()} flex items-center justify-center gap-2`}
                    style={{
                      backgroundColor:
                        theme === 'light'
                          ? accentColor
                          : 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.title}
                    <ExternalLink className="h-4 w-4" />
                  </motion.a>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
