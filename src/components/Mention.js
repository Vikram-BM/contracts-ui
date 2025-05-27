import React from 'react'

export default function Mention({ node }) {
  const { color, children, value, id, title } = node
  
  // Render the mention text directly from children or value
  const text = children ? children.map(child => child.text).join('') : value
  
  const handleMentionClick = () => {
    // This could open a modal, inline editor, or trigger a context update
    console.log(`Edit mention: ${id} (${title}) - Current value: ${text}`)
  }
  
  return (
    <span 
      className="mention" 
      style={{ backgroundColor: color }}
      onClick={handleMentionClick}
      data-mention-id={id}
      data-mention-title={title}
      title={`Click to edit ${title || id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleMentionClick()
        }
      }}
    >
      {text}
    </span>
  )
}