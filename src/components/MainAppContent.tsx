import React, { ComponentProps, useEffect, useContext } from 'react'
import {
  Menu,
  Title,
  Item,
  Section,
  Card,
  Footer,
  Avatar,
  Icon,
  Text,
  RedDot,
  LineText,
} from 'mypack/basic_components'
import './MainAppContent.scss'
import { ChildTubeContext } from 'App'
import { ChildSideType } from 'tubeSystem'

/**
 * 组件的与app通信的子设备
 * TODO：想想怎么能自动推断呢？手写类型很烦的
 * TODO: 这相当于是一个配件，需要一个容纳配件的 “配件库”
 */
let tube: ChildSideType

export default function MainAppContent(props: {}) {
  const Tube = useContext(ChildTubeContext)
  useEffect(() => {
    tube = new Tube('AlbumMenu', (payload) => console.log('listen from AlbumMenu: ', payload))
  }, [])
  return (
    <Section className='main-app-content'>
      <LineText>歌单</LineText>
    </Section>
  )
}
