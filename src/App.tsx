import { useUser, SignInButton, SignOutButton, useAuth } from '@clerk/clerk-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

function App() {
  const { user, isSignedIn } = useUser()
  const { getToken } = useAuth()
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatId, setChatId] = useState<string | null>(null)

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message')
      return
    }
    
    if (!isSignedIn) {
      toast.error('Please sign in first')
      return
    }

    setIsLoading(true)
    setResponse('')
    
    try {
      const token = await getToken()
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      console.log('Starting SSE stream...')
      
      // Use EventSource for SSE streaming
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ message }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      // Read streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''
      let currentChatId: string | null = null
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) {
            console.log('Stream completed')
            break
          }
          
          const chunk = decoder.decode(value)
          console.log('Raw chunk:', chunk)
          
          // Parse SSE format (data: {...})
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonData = line.replace('data: ', '').trim()
                const parsed = JSON.parse(jsonData)
                
                console.log('Parsed chunk:', parsed)
                
                if (parsed.chunk) {
                  fullResponse += parsed.chunk
                  setResponse(fullResponse)
                }
                
                if (parsed.chatId && !currentChatId) {
                  currentChatId = parsed.chatId
                  setChatId(parsed.chatId)
                }
              } catch (e) {
                console.error('Failed to parse JSON chunk:', e)
              }
            }
          }
        }
      }
      
      setMessage('')
      
    } catch (error: any) {
      console.error('Stream error:', error)
      
      let errorMessage = 'Error connecting to backend'
      
      if (error.message?.includes('fetch')) {
        errorMessage = 'Cannot connect to backend server.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setResponse(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kivo AI</h1>
          <p className="text-gray-600">Your Smart AI Assistant</p>
        </div>

        {!isSignedIn ? (
          <div className="text-center">
            <div className="card max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
              <p className="text-gray-600 mb-6">Please sign in to start chatting with AI</p>
              <SignInButton>
                <button className="btn-primary">Sign In</button>
              </SignInButton>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Chat with AI</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {user?.fullName}
                  </span>
                  <SignOutButton>
                    <button className="btn-secondary">Sign Out</button>
                  </SignOutButton>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 input-field"
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage} 
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    {isLoading ? 'Streaming...' : 'Send'}
                  </button>
                </div>
              </div>

              {response && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 whitespace-pre-wrap">{response}</p>
                </div>
              )}

              {chatId && (
                <div className="mt-2 text-xs text-gray-500">
                  Chat ID: {chatId}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App