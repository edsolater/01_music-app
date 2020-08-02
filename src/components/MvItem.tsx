import React, { useContext } from 'react'
import './style.scss'
import { RouterContext } from 'context/router'

export default function MvItem(props: {
  item: ExclusiveContent | undefined
  type?: 'portrait'
  onClick?: () => void
}) {
  const [, routeDispatch] = useContext(RouterContext)
  if (!props.item) return null
  switch (props.type) {
    default: {
      const resource = props.item as ExclusiveContent
      return (
        <div
          className='MvItem'
          onClick={() => {
            props.onClick?.()
            routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
          }}
        >
          <div className='picture'>
            <img className='thumbnail' src={resource.sPicUrl} />
          </div>
          <p className='description'>{resource.name}</p>
        </div>
      )
    }
  }
}
