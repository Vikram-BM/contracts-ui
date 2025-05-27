import React, { createContext, useContext, useState } from 'react'

// Context for managing mention values globally
const MentionContext = createContext()

export const useMentionContext = () => {
  const context = useContext(MentionContext)
  if (!context) {
    throw new Error('useMentionContext must be used within a MentionProvider')
  }
  return context
}

export const MentionProvider = ({ children, initialMentions = {} }) => {
  const [mentions, setMentions] = useState(initialMentions)
  
  const updateMention = (id, newValue) => {
    setMentions(prev => ({
      ...prev,
      [id]: newValue
    }))
  }
  
  const getMentionValue = (id, fallbackValue) => {
    return mentions[id] !== undefined ? mentions[id] : fallbackValue
  }
  
  const getAllMentions = () => mentions
  
  const resetMentions = () => setMentions(initialMentions)
  
  const value = {
    mentions,
    updateMention,
    getMentionValue,
    getAllMentions,
    resetMentions
  }
  
  return (
    <MentionContext.Provider value={value}>
      {children}
    </MentionContext.Provider>
  )
}

export default MentionContext 