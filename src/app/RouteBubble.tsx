import React, { useContext } from 'react'
import { RouterContext } from 'context/router'
export default function RouteBubble() {
  const [, dispatchRoute] = useContext(RouterContext)
  return (
    <div
      className='RouteBubble _clickable _hoverable _transiable'
      onClick={() => {
        dispatchRoute({ type: 'back' })
      }}
    >
      ←
    </div>
  )
}
