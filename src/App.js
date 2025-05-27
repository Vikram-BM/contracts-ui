import React, { useState, useEffect } from 'react'
import data from './data/input.json'
import BlockRenderer from './components/BlockRenderer'

function assignClauseNumbers(nodes) {
  let counter = 1
  
  function traverse(items) {
    return items.map(item => {
      if (item.type === 'clause') {
        const withNumber = { ...item, clauseNumber: counter++ }
        if (item.children) {
          withNumber.children = traverse(item.children)
        }
        return withNumber
      }
      if (item.children) {
        return { ...item, children: traverse(item.children) }
      }
      return item
    })
  }
  
  return traverse(nodes)
}

export default function App() {
  const [documentData, setDocumentData] = useState(null)

  useEffect(() => {
    // Process the entire document structure
    const structured = assignClauseNumbers(data)
    setDocumentData(structured)
  }, [])

  if (!documentData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      {documentData.map((node, i) => (
        <BlockRenderer key={i} node={node} />
      ))}
    </div>
  )
}