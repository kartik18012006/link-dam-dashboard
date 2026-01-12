import { LinksManager } from '@/components/dashboard/LinksManager'
import { MobilePreview } from '@/components/dashboard/MobilePreview'
import { useStore } from '@/store/useStore'

export function LinksPage() {
  const { links, user, themeSettings } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Links</h1>
        <p className="text-muted-foreground">
          Manage your links and customize their order
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <LinksManager />
        <MobilePreview
          user={user}
          links={links.filter((link) => link.enabled)}
          themeSettings={themeSettings}
        />
      </div>
    </div>
  )
}
