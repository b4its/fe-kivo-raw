import { motion } from 'framer-motion'
import StatsCard from './StatsCard'
// import QuickActions from './QuickActions'
// import RecentActivity from './RecentActivity'

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Messages"
          value="1,234"
          change="+12%"
          icon="💬"
        />
        <StatsCard
          title="AI Responses"
          value="1,156"
          change="+8%"
          icon="🤖"
        />
        <StatsCard
          title="Response Rate"
          value="93.7%"
          change="+2.3%"
          icon="📊"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <QuickActions />
        <RecentActivity /> */}
      </div>
    </motion.div>
  )
}