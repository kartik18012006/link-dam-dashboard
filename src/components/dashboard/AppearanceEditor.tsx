import { useState, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, X } from 'lucide-react'
import { useStore } from '@/store/useStore'

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'gradient', label: 'Gradient' },
]

const buttonStyles = [
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
]

const fonts = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Open Sans', label: 'Open Sans' },
]

export function AppearanceEditor() {
  const { themeSettings, updateThemeSettings, user } = useStore()
  const { toast } = useToast()
  const [displayName, setDisplayName] = useState(
    themeSettings.displayName || user.name || ''
  )
  const [bio, setBio] = useState(themeSettings.bio || '')
  const [theme, setTheme] = useState(themeSettings.theme)
  const [buttonStyle, setButtonStyle] = useState(themeSettings.buttonStyle)
  const [accentColor, setAccentColor] = useState(themeSettings.accentColor)
  const [fontFamily, setFontFamily] = useState(themeSettings.fontFamily)
  const [profileImage, setProfileImage] = useState(
    themeSettings.profileImage || user.image || ''
  )

  useEffect(() => {
    updateThemeSettings({
      displayName: displayName || null,
      bio: bio || null,
      theme,
      buttonStyle,
      accentColor,
      fontFamily,
      profileImage: profileImage || null,
    })
  }, [
    displayName,
    bio,
    theme,
    buttonStyle,
    accentColor,
    fontFamily,
    profileImage,
    updateThemeSettings,
  ])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload an image file',
        variant: 'destructive',
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
      toast({
        title: 'Success',
        description: 'Image uploaded',
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setProfileImage('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Appearance</CardTitle>
        <CardDescription>Changes are saved automatically</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="flex items-center gap-4">
            {profileImage ? (
              <div className="relative">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <span className="text-2xl font-bold">
                  {displayName.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload">
                <Button type="button" variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </span>
                </Button>
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your Name"
            maxLength={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell people about yourself"
            maxLength={80}
          />
          <p className="text-xs text-muted-foreground">
            {bio.length}/80 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={theme}
            onValueChange={(v: 'light' | 'dark' | 'gradient') => setTheme(v)}
          >
            <SelectTrigger id="theme">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="buttonStyle">Button Style</Label>
          <Select
            value={buttonStyle}
            onValueChange={(v: 'rounded' | 'square') => setButtonStyle(v)}
          >
            <SelectTrigger id="buttonStyle">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {buttonStyles.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex gap-2">
            <Input
              id="accentColor"
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="h-10 w-20"
            />
            <Input
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#3b82f6"
              pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Family</Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger id="fontFamily">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
