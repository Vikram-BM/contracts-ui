import React from 'react'
import Mention from './Mention'

export default function TextWithMarks({ node }) {
  // Handle null or undefined nodes
  if (!node) return null
  
  const { text, bold, italic, underline, children, type } = node
  
  // Handle mention type
  if (type === 'mention') {
    return <Mention node={node} />
  }
  
  // Handle plain text
  if (text != null) {
    let content = text
    
    // Handle newlines by splitting and adding <br> elements
    // Support both \n and \\n patterns
    if (typeof content === 'string' && (content.includes('\n') || content.includes('\\n'))) {
      // Normalize escaped newlines to actual newlines
      const normalizedContent = content.replace(/\\n/g, '\n')
      const parts = normalizedContent.split('\n')
      
      content = parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </React.Fragment>
      ))
    }
    
    // Apply formatting marks
    if (bold) content = <strong>{content}</strong>
    if (italic) content = <em>{content}</em>
    if (underline) content = <u>{content}</u>
    
    return <>{content}</>
  }
  
  // Handle children
  if (children && Array.isArray(children)) {
    let content = children.map((child, i) => {
      // Ensure each child is properly handled
      if (child === null || child === undefined) {
        return null
      }
      
      // Handle string children directly
      if (typeof child === 'string') {
        return <TextWithMarks key={i} node={{ text: child }} />
      }
      
      // Handle object children
      return <TextWithMarks key={i} node={child} />
    }).filter(Boolean) // Remove null/undefined elements
    
    // Apply formatting marks to the entire content
    if (bold) content = <strong>{content}</strong>
    if (italic) content = <em>{content}</em>
    if (underline) content = <u>{content}</u>
    
    return <>{content}</>
  }
  
  // Handle edge case where node is a string
  if (typeof node === 'string') {
    return <TextWithMarks node={{ text: node }} />
  }
  
  // Log unexpected node types for debugging
  if (process.env.NODE_ENV === 'development' && node && typeof node === 'object') {
    console.warn('Unexpected node structure in TextWithMarks:', node)
  }
  
  return null
}