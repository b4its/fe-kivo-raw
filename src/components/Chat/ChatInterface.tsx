import { useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { motion } from 'framer-motion'

export default function ChatInterface() {
  const { messages, isLoading, error } = useChatStore()

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
          <p className="text-gray-600">Ask me anything, I'm here to help!</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <MessageList messages={messages} isLoading={isLoading} />
        
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Start a conversation by typing your first message below</p>
          </div>
        )}
        
        <ChatInput />
      </div>
    </motion.div>
  )
}