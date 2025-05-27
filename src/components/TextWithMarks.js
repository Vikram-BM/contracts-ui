import React from 'react'
import Mention from './Mention'

export default function TextWithMarks({ node }) {
  if (!node) return null
  const { text, bold, italic, underline, children, type } = node
  if (type === 'mention') {
    return <Mention node={node} />
  }
  if (text != null) {
    let content = text
    // Normalize and split on newlines for <br/>
    if (typeof content === 'string' && (content.includes('\n') || content.includes('\\n'))) {
      const normalizedContent = content.replace(/\\n/g, '\n')
      const parts = normalizedContent.split('\n')
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
  if (children && Array.isArray(children)) {
    let content = children.map((child, i) => {
      if (child === null || child === undefined) return null
      if (typeof child === 'string') {
        return <TextWithMarks key={i} node={{ text: child }} />
      }
      return <TextWithMarks key={i} node={child} />
    }).filter(Boolean)
    if (bold) content = <strong>{content}</strong>
    if (italic) content = <em>{content}</em>
    if (underline) content = <u>{content}</u>
    return <>{content}</>
  }
  if (typeof node === 'string') {
    return <TextWithMarks node={{ text: node }} />
  }
  if (process.env.NODE_ENV === 'development' && node && typeof node === 'object') {
    console.warn('Unexpected node structure in TextWithMarks:', node)
  }
  return null
}