import { motion } from 'framer-motion'
import { SignInButton } from '@clerk/clerk-react'

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div 
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <svg className="w-24 h-24 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </motion.div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Kivo AI
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Your intelligent assistant powered by advanced AI. Chat, create, and collaborate seamlessly.
        </p>
        
        <SignInButton>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-3"
          >
            Get Started
          </motion.button>
        </SignInButton>
        
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900">Smart AI</h3>
            <p className="text-sm text-gray-600">Powered by OpenAI</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900">Secure</h3>
            <p className="text-sm text-gray-600">Protected by Clerk</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Fast</h3>
            <p className="text-sm text-gray-600">Real-time responses</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}