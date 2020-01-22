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
  Group,
  View,
  Image,
  ImageBox,
  Button,
  List,
  Grid,
} from 'mypack/basic_components'
import './MainAppContent.scss'
import { ChildTubeContext } from 'App'
import { ChildSideType } from 'tubeSystem'
import thumbnail from 'assets/专辑封面.webp' // 这个信息最终要靠后端传过来，现在只是占位
import avatar from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import heart from 'assets/icons/heart-line.svg' // 这个信息最终要靠后端传过来，现在只是占位

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
      <Text headline>歌单</Text>
      <Grid className='collection-info'>
        <View className='thumbnail'>
          <ImageBox src={thumbnail} className='thumbnail-pic' />
          {/* TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理 */}
          <Icon src={heart} className='thumbnail-icon' />
        </View>
        <Text largeTitle>我喜欢的音乐</Text>
        <View className='creator'>
          <Avatar src={avatar} className='creator-avatar' />
          <Text subhead className='creator-nickname'>
            desolaters
          </Text>
          <Text footnote className='creator-create-time'>
            2016-09-13 创建
          </Text>
        </View>
        <Group className='buttons'>
          <Button>收藏</Button>
          <Button>评论</Button>
          <Button>分享</Button>
          <Button>下载全部</Button>
          <Button>更多</Button>
        </Group>
      </Grid>
      <List>this should be a list</List>
    </Section>
  )
}
