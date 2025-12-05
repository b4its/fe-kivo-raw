import { useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import toast from 'react-hot-toast'

export default function ChatInput() {
  const [input, setInput] = useState('')
  const { sendMessage, isLoading } = useChatStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim()) {
      toast.error('Please enter a message')
      return
    }

    if (isLoading) {
      toast.error('Please wait for the current response')
      return
    }

    await sendMessage(input.trim())
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
        disabled={isLoading}
        className="flex-1 input-field"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="btn-primary"
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}