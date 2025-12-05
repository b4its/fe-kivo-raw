import { ReactNode } from 'react'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import Header from './Header'
import WelcomeScreen from '../Auth/WelcomeScreen'

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignedIn>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </SignedIn>
      
      <SignedOut>
        <WelcomeScreen />
      </SignedOut>
    </div>
  )
}