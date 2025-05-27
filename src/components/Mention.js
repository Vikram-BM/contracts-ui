import React from 'react'

export default function Mention({ node }) {
  const { color, children, value } = node
  
  // Render the mention text directly from children or value
  const text = children ? children.map(child => child.text).join('') : value
  
  return (
    <span className="mention" style={{ backgroundColor: color }}>
      {text}
    </span>
  )
}