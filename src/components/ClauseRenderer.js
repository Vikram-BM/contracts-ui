import React from 'react'
import BlockRenderer from './BlockRenderer'

export default function ClauseRenderer({ node }) {
  return (
    <div className="clause">
      <div className="clause-number">{node.clauseNumber}.</div>
      <div className="clause-content">
        {node.children.map((c, i) => <BlockRenderer key={i} node={c} />)}
      </div>
    </div>
  )
}