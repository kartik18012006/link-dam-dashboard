import { AppearanceEditor } from '@/components/dashboard/AppearanceEditor'
import { MobilePreview } from '@/components/dashboard/MobilePreview'
import { useStore } from '@/store/useStore'

export function AppearancePage() {
  const { user, links, themeSettings } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Appearance</h1>
        <p className="text-muted-foreground">
          Customize how your profile looks
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AppearanceEditor />
        <MobilePreview
          user={user}
          links={links.filter((link) => link.enabled)}
          themeSettings={themeSettings}
        />
      </div>
    </div>
  )
}
