import React from 'react'
import TextWithMarks from './TextWithMarks'
import ClauseRenderer from './ClauseRenderer'
import Mention from './Mention'

export default function BlockRenderer({ node }) {
  if (!node) return null
  const { type, children, text } = node
  if (text != null) {
    return <TextWithMarks node={node} />
  }
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
      return (
        <p>
          {children?.map((c, i) => {
            if (c.type === 'p') {
              return (
                <span key={i}>
                  {c.text || c.children?.map((cc, ii) => <TextWithMarks key={ii} node={cc} />)}
                </span>
              )
            }
            // Promote clause out of paragraph for valid HTML
            if (c.type === 'clause') {
              return <BlockRenderer key={i} node={c} />
            }
            if (['ul', 'ol', 'div', 'block'].includes(c.type)) {
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
      return (
        <div className="block">
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </div>
      )
    case 'doc':
      return (
        <>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </>
      )
    case 'div':
      return (
        <div>
          {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
        </div>
      )
    default:
      if (children && Array.isArray(children)) {
        return (
          <>
            {children.map((c, i) => <BlockRenderer key={i} node={c} />)}
          </>
        )
      }
      if (node && typeof node === 'object' && node.text) {
        return <TextWithMarks node={node} />
      }
      if (type) {
        console.warn(`Unknown block type: ${type}`, node)
      }
      return null
  }
}