import React from 'react'
import Mention from './Mention'

export default function TextWithMarks({ node }) {
  const { text, bold, italic, underline, children, type } = node
  
  // Handle mention type
  if (type === 'mention') {
    return <Mention node={node} />
  }
  
  // Handle plain text
  if (text != null) {
    let content = text
    
    // Handle newlines by splitting and adding <br> elements
    if (typeof content === 'string' && content.includes('\n')) {
      const parts = content.split('\n')
      content = parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </React.Fragment>
      ))
    }
    
    if (bold) content = <strong>{content}</strong>
    if (italic) content = <em>{content}</em>
    if (underline) content = <u>{content}</u>
    return <>{content}</>
  }
  
  // Handle children
  if (children) {
    let content = children.map((child, i) => <TextWithMarks key={i} node={child} />)
    if (bold) content = <strong>{content}</strong>
    if (italic) content = <em>{content}</em>
    if (underline) content = <u>{content}</u>
    return <>{content}</>
  }
  
  return null
}