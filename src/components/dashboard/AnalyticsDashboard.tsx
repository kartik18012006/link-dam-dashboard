import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatNumber } from '@/lib/utils'
import { format } from 'date-fns'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { Link } from '@/store/useStore'

interface AnalyticsDashboardProps {
  analytics: {
    totalViews: number
    totalClicks: number
    pageViews: Array<{ date: string; count: number }>
    clickEvents: Array<{ date: string; count: number }>
  }
  links: Link[]
}

export function AnalyticsDashboard({
  analytics,
  links,
}: AnalyticsDashboardProps) {
  const ctr =
    analytics.totalViews > 0
      ? ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1)
      : '0.0'

  // Combine views and clicks for chart
  const chartData = analytics.pageViews.map((pv) => {
    const clicks = analytics.clickEvents.find((ce) => ce.date === pv.date)
    return {
      date: pv.date,
      views: pv.count,
      clicks: clicks?.count || 0,
    }
  })

  // Get clicks per link
  const clicksPerLink = links
    .map((link) => ({
      name: link.title,
      clicks: link.clickCount,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics.totalViews)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time page views
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics.totalClicks)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time link clicks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Click-Through Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ctr}%</div>
            <p className="text-xs text-muted-foreground">Clicks per view</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {links.filter((l) => l.enabled).length}
            </div>
            <p className="text-xs text-muted-foreground">Enabled links</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views & Clicks (Last 30 Days)</CardTitle>
            <CardDescription>
              Daily page views and link clicks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => format(new Date(value), 'MMM d')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    format(new Date(value), 'MMM d, yyyy')
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  name="Views"
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#10b981"
                  name="Clicks"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Links</CardTitle>
            <CardDescription>Most clicked links</CardDescription>
          </CardHeader>
          <CardContent>
            {clicksPerLink.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No clicks yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clicksPerLink}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
