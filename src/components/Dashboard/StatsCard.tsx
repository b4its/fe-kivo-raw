import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: string
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="mt-4">
        <span className={`text-sm font-medium ${
          change.startsWith('+') ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-600 ml-1">from last month</span>
      </div>
    </motion.div>
  )
}