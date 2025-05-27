import React from 'react'
import TextWithMarks from './TextWithMarks'
import ClauseRenderer from './ClauseRenderer'
import Mention from './Mention'

export default function BlockRenderer({ node }) {
  if (!node) return null
  
  const { type, children, text } = node
  
  // Handle text nodes
  if (text != null) {
    return <TextWithMarks node={node} />
  }
  
  switch (type) {
    case 'h1': 
      return <h1>{children?.map((c, i) => <TextWithMarks key={i} node={c} />)}</h1>
    case 'h4': 
      return <h4>{children?.map((c, i) => <TextWithMarks key={i} node={c} />)}</h4>
    case 'p': 
      // Handle nested p elements by rendering them as spans instead
      return (
        <p>
          {children?.map((c, i) => {
            if (c.type === 'p') {
              // Render nested p as span to avoid invalid HTML
              return <span key={i}>{c.text || c.children?.map((cc, ii) => <TextWithMarks key={ii} node={cc} />)}</span>
            }
            return <TextWithMarks key={i} node={c} />
          })}
        </p>
      )
    case 'ul': 
      return <ul>{children?.map((c, i) => <BlockRenderer key={i} node={c} />)}</ul>
    case 'li': 
      return <li>{children?.map((c, i) => <BlockRenderer key={i} node={c} />)}</li>
    case 'lic': 
      // List item content - render as span to avoid nested list issues
      return <span>{children?.map((c, i) => <TextWithMarks key={i} node={c} />)}</span>
    case 'mention': 
      return <Mention node={node} />
    case 'clause': 
      return <ClauseRenderer node={node} />
    case 'block':
      // Generic block container
      return <div className="block">{children?.map((c, i) => <BlockRenderer key={i} node={c} />)}</div>
    case 'doc':
      // Document root
      return <>{children?.map((c, i) => <BlockRenderer key={i} node={c} />)}</>
    default:
      // Fallback for unknown types - render children if they exist
      if (children) {
        return <>{children.map((c, i) => <BlockRenderer key={i} node={c} />)}</>
      }
      // If it's a text node without explicit text property
      if (typeof node === 'string') {
        return <>{node}</>
      }
      return null
  }
}