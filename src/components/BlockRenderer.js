import React from 'react'
import TextWithMarks from './TextWithMarks'
import ClauseRenderer from './ClauseRenderer'
import Mention from './Mention'

export default function BlockRenderer({ node }) {
  // Handle null, undefined, or empty nodes
  if (!node) return null
  
  const { type, children, text } = node
  
  // Handle direct text nodes
  if (text != null) {
    return <TextWithMarks node={node} />
  }
  
  // Handle string nodes (fallback)
  if (typeof node === 'string') {
    return <TextWithMarks node={{ text: node }} />
  }
  
  switch (type) {
    case 'h1': 
      return (
        <h1>
          {children?.map((c, i) => <TextWithMarks key={i} node={c} />)}
        </h1>
      )
      
    case 'h4': 
      return (
        <h4>
          {children?.map((c, i) => <TextWithMarks key={i} node={c} />)}
        </h4>
      )
      
    case 'p': 
      // Handle complex paragraph scenarios
      return (
        <p>
          {children?.map((c, i) => {
            // Handle nested paragraphs by rendering as spans
            if (c.type === 'p') {
              return (
                <span key={i}>
                  {c.text || c.children?.map((cc, ii) => <TextWithMarks key={ii} node={cc} />)}
                </span>
              )
            }
            // Handle clauses inside paragraphs - promote them out
            if (c.type === 'clause') {
              // This shouldn't happen in well-formed HTML, but handle gracefully
              console.warn('Clause found inside paragraph - this may cause layout issues')
              return <BlockRenderer key={i} node={c} />
            }
            // Handle block elements inside paragraphs
            if (['ul', 'ol', 'div', 'block'].includes(c.type)) {
              console.warn(`Block element ${c.type} found inside paragraph - rendering as span`)
              return (
                <span key={i} className={`inline-${c.type}`}>
                  {c.children?.map((cc, ii) => <TextWithMarks key={ii} node={cc} />)}
                </span>
              )
            }
            return <TextWithMarks key={i} node={c} />
          })}
        </p>
      )
      
    case 'ul': 
      return (
        <ul>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </ul>
      )
      
    case 'ol': 
      return (
        <ol>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </ol>
      )
      
    case 'li': 
      return (
        <li>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </li>
      )
      
    case 'lic': 
      // List item content - render as span to avoid nested list issues
      return (
        <span className="list-item-content">
          {children?.map((c, i) => <TextWithMarks key={i} node={c} />)}
        </span>
      )
      
    case 'mention': 
      return <Mention node={node} />
      
    case 'clause': 
      return <ClauseRenderer node={node} />
      
    case 'block':
      // Generic block container
      return (
        <div className="block">
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </div>
      )
      
    case 'doc':
      // Document root
      return (
        <>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </>
      )
      
    case 'div':
      // Generic div container
      return (
        <div>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </div>
      )
      
    default:
      // Enhanced fallback for unknown types
      if (children && Array.isArray(children)) {
        // If it has children, render them
        return (
          <>
            {children.map((c, i) => <BlockRenderer key={i} node={c} />)}
          </>
        )
      }
      
      // If it's an object with text property
      if (node && typeof node === 'object' && node.text) {
        return <TextWithMarks node={node} />
      }
      
      // Log unknown types for debugging
      if (type) {
        console.warn(`Unknown block type: ${type}`, node)
      }
      
      return null
  }
}