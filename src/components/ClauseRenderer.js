import React from 'react'
import BlockRenderer from './BlockRenderer'

export default function ClauseRenderer({ node }) {
  const { clauseNumber, clauseDepth = 0, children } = node
  
  return (
    <div className="clause" data-depth={clauseDepth}>
      <div className="clause-number">{clauseNumber}</div>
      <div className="clause-content">
        {children?.map((c, i) => <BlockRenderer key={i} node={c} />)}
      </div>
    </div>
  )
}