import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'
import { useStore } from '@/store/useStore'

export function AnalyticsPage() {
  const { analytics, links } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your profile performance
        </p>
      </div>
      <AnalyticsDashboard analytics={analytics} links={links} />
    </div>
  )
}
