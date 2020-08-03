import React, { useState, MouseEventHandler, useCallback } from 'react'

// TODO 虽然指定图片大小减少了网络下载量，
// 但完全没有利用到缓存
function hasDirectSize(src: Url | undefined) {
  if (!src) return false
  return src.match(/\?param=(\d+)y(\d+)$/)
}

export default function MyCover(props: {
  className?: string
  src: Url | undefined
  onClick?: MouseEventHandler<HTMLImageElement>
}) {
  const [size, setSize] = useState<[number, number]>()
  let parsedSrc = props.src
  if (size && !hasDirectSize(props.src)) {
    parsedSrc = `${props.src}?param=${Math.round(size[0] * window.devicePixelRatio)}y${Math.round(
      size[1] * window.devicePixelRatio
    )}`
  }

  const setRef = useCallback(el => {
    if (!el || hasDirectSize(props.src)) return
    const elRect = el.getBoundingClientRect()
    if (elRect.width === 0 || elRect.height === 0) return
    setSize([elRect.width, elRect.height])
  }, [])

  return (
    <img
      className={`MyCover ${props.className}`}
      ref={setRef}
      src={parsedSrc}
      onClick={props.onClick}
    />
  )
}
