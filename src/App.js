import React, { useState, useEffect } from 'react'
import data from './data/input.json'
import BlockRenderer from './components/BlockRenderer'

function assignClauseNumbers(nodes) {
  const counters = [0] // Array to track counters at each depth level
  
  function getClauseLabel(depth) {
    const count = counters[depth]
    
    if (depth === 0) {
      // Top level: 1., 2., 3., etc.
      return `${count}.`
    } else if (depth === 1) {
      // Second level: (a), (b), (c), etc.
      const letters = 'abcdefghijklmnopqrstuvwxyz'
      return count <= letters.length ? `(${letters[count - 1]})` : `(${count})`
    } else if (depth === 2) {
      // Third level: (i), (ii), (iii), etc.
      const romanNumerals = [
        'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x',
        'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'
      ]
      return count <= romanNumerals.length ? `(${romanNumerals[count - 1]})` : `(${count})`
    } else {
      // Fallback for deeper nesting: use numeric with period
      return `${count}.`
    }
  }
  
  function traverse(items, depth = 0) {
    // Ensure we have a counter for this depth
    if (counters.length <= depth) {
      counters.push(0)
    }
    
    return items.map(item => {
      if (item.type === 'clause') {
        // Increment counter at current depth
        counters[depth]++
        
        // Reset all deeper level counters
        for (let i = depth + 1; i < counters.length; i++) {
          counters[i] = 0
        }
        
        const clauseLabel = getClauseLabel(depth)
        const withNumber = { 
          ...item, 
          clauseNumber: clauseLabel,
          clauseDepth: depth
        }
        
        if (item.children) {
          withNumber.children = traverse(item.children, depth + 1)
        }
        return withNumber
      }
      if (item.children) {
        return { ...item, children: traverse(item.children, depth) }
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
    return <div className="loading">Loading contract...</div>
  }

  return (
    <div className="container">
      {documentData.map((node, i) => (
        <BlockRenderer key={i} node={node} />
      ))}
    </div>
  )
}