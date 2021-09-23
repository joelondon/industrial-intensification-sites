import React from 'react'

const TooltipHover = ({ feature }) => {
  return (
    <div>
      {feature.properties.Development ? feature.properties.Development : ''}
    </div>
  )
}

export default TooltipHover
