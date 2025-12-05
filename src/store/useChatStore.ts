import { create } from 'zustand'
import axios from 'axios'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatStore {
  messages: Message[]
  isLoading: boolean
  error: string | null
  
  sendMessage: (message: string, token?: string) => Promise<void>
  clearMessages: () => void
  setError: (error: string | null) => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  sendMessage: async (message: string, token?: string) => {
    const { messages } = get()
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    }
    
    set({ 
      messages: [...messages, userMessage], 
      isLoading: true, 
      error: null 
    })

    try {
      // Call AI API dengan proper headers
      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
          },
          timeout: 30000 // 30 second timeout
        }
      )
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.reply || response.data.message || 'No response from AI',
        role: 'assistant',
        timestamp: new Date(),
      }
      
      set({ 
        messages: [...get().messages, aiMessage], 
        isLoading: false 
      })
    } catch (error: any) {
      console.error('Chat API Error:', error)
      
      let errorMessage = 'Failed to get response from AI'
      
      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please sign in again.'
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment.'
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.'
      }
      
      set({ 
        error: errorMessage, 
        isLoading: false 
      })
    }
  },

  clearMessages: () => set({ messages: [] }),
  setError: (error) => set({ error }),
}))

// Custom hook untuk chat dengan auth otomatis - DI LUAR STORE!
import { useAuth } from '@clerk/clerk-react'

export const useChat = () => {
  const { getToken } = useAuth()
  const store = useChatStore()
  
  const sendAuthenticatedMessage = async (message: string) => {
    try {
      const token = await getToken()
      
      // Fix: Konversi null ke undefined
      await store.sendMessage(message, token || undefined)
    } catch (error) {
      store.setError('Failed to authenticate. Please sign in again.')
    }
  }
  
  return {
    messages: store.messages,
    isLoading: store.isLoading,
    error: store.error,
    sendMessage: sendAuthenticatedMessage,
    clearMessages: store.clearMessages,
    setError: store.setError
  }
}

// Alternative: Simple hook untuk public API (tanpa auth)
export const usePublicChat = () => {
  const store = useChatStore()
  
  const sendPublicMessage = async (message: string) => {
    await store.sendMessage(message) // Tanpa token
  }
  
  return {
    messages: store.messages,
    isLoading: store.isLoading,
    error: store.error,
    sendMessage: sendPublicMessage,
    clearMessages: store.clearMessages
  }
}