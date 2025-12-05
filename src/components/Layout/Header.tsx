import { useUser, SignInButton, SignOutButton } from '@clerk/clerk-react'
import { motion } from 'framer-motion'

export default function Header() {
  const { user, isSignedIn } = useUser()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Kivo AI</h1>
            <span className="ml-2 text-sm text-gray-500">Your Smart Assistant</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.imageUrl}
                    alt={user?.fullName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.fullName}
                  </span>
                </div>
                <SignOutButton>
                  <button className="btn-secondary">Sign Out</button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton>
                <button className="btn-primary">Sign In</button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}