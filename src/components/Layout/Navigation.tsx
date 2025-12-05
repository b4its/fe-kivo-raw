import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Chat', href: '/chat', icon: '💬' },
  { name: 'Profile', href: '/profile', icon: '👤' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export default function Navigation() {
  return (
    <nav className="fixed left-0 top-16 h-full w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}