import React, { useContext, Fragment } from 'react'
import './style.scss'
import { RouterContext } from 'context/router'
import Icon from 'baseUI/UI/Icon'
import { recoder } from 'assets/icons'
import MyCover from './MyCover'
import { formatTimeNumber } from 'utils/functions'

export default function MvItem(props: {
  item: ExclusiveContent | MvBrief | MvBrief2 | undefined
  type?: 'in-home' | 'brief2' | 'in-detail-page'
  onClick?: () => void
}) {
  const [, routeDispatch] = useContext(RouterContext)
  if (!props.item) return null
  switch (props.type) {
    case 'in-home': {
      const resource = props.item as MvBrief
      return (
        <div
          className='MvItem_in-home --clickable'
          onClick={() => {
            routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
          }}
        >
          <div className='picture'>
            <div className='legend'>
              <span>{resource.copywriter}</span>
            </div>
            <div className='count'>
              <Icon src={recoder} />
              <span className='number'>{resource.playCount}</span>
            </div>
            <MyCover src={resource.picUrl} className='thumbnail' />
          </div>
          <span className='description'>{resource.name}</span>
          <span className='sub-description _footnote _block'>
            {resource.artists.map((art, idx, { length }) => (
              <Fragment key={art.id}>
                <span>{art.name}</span>
                {idx !== length - 1 && <span>/</span>}
              </Fragment>
            ))}
          </span>
        </div>
      )
    }
    case 'brief2': {
      const resource = props.item as MvBrief2
      return (
        <div
          className='MvItem_brief2 --clickable'
          onClick={() => {
            routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
          }}
        >
          <div className='picture'>
            <div className='count'>
              <Icon src={recoder} />
              <span className='number'>{resource.playCount}</span>
            </div>
            <MyCover src={resource.cover} className='thumbnail' />
          </div>
          <span className='description'>{resource.name}</span>
          <span className='sub-description _footnote _block'>
            {resource.artists.map((art, idx, { length }) => (
              <Fragment key={art.id}>
                <span>{art.name}</span>
                {idx !== length - 1 && <span>/</span>}
              </Fragment>
            ))}
          </span>
        </div>
      )
    }
    case 'in-detail-page': {
      const resource = props.item as MvBrief2
      return (
        <div
          className='MvItem_in-detail-page --clickable'
          onClick={() => {
            routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
          }}
        >
          <div className='picture'>
            <div className='count'>
              <Icon src={recoder} />
              <span className='number'>{resource.playCount}</span>
            </div>
            <MyCover src={resource.cover} className='thumbnail' />
          </div>
          <span className='description'>{resource.name}</span>
          <span className='duration'>{formatTimeNumber(resource.duration)}</span>
          <span className='sub-description'>
            by
            {resource.artists.map((art, idx, { length }) => (
              <Fragment key={art.id}>
                <span>{art.name}</span>
                {idx !== length - 1 && <span>/</span>}
              </Fragment>
            ))}
          </span>
        </div>
      )
    }
    default: {
      const resource = props.item as ExclusiveContent
      return (
        <div
          className='MvItem --clickable'
          onClick={() => {
            props.onClick?.()
            routeDispatch({ type: 'to', item: { name: 'mvDetail', id: resource.id } })
          }}
        >
          <div className='picture'>
            <MyCover className='thumbnail' src={resource.sPicUrl} />
          </div>
          <p className='description'>{resource.name}</p>
        </div>
      )
    }
  }
}
