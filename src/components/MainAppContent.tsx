import React from 'react'
import {
  Item,
  Section,
  Avatar,
  Icon,
  Text,
  Group,
  Block,
  ImageBox,
  Button,
  List,
  Grid,
  Divider,
} from 'mypack/basic_components'
import './MainAppContent.scss'
import thumbnail from 'assets/专辑封面.webp' // 这个信息最终要靠后端传过来，现在只是占位
import avatar from 'assets/whiteEye--small.png' // 这个信息最终要靠后端传过来，现在只是占位
import heart from 'assets/icons/heart-line.svg' // 这个信息最终要靠后端传过来，现在只是占位

export default function MainAppContent() {
  return (
    <Section className='main-app-content'>
      <Text headline>歌单</Text>
      <Grid className='collection-info'>
        <Block className='thumbnail'>
          <ImageBox src={thumbnail} className='thumbnail-pic' />
          {/* TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理 */}
          <Icon src={heart} className='thumbnail-icon' />
        </Block>
        <Text largeTitle>我喜欢的音乐</Text>
        <Block className='creator'>
          <Avatar src={avatar} className='creator-avatar' />
          <Text subhead className='creator-nickname'>
            desolaters
          </Text>
          <Text footnote className='creator-create-time'>
            2016-09-13 创建
          </Text>
        </Block>
        <Group className='buttons'>
          <Button>收藏</Button>
          <Button>评论</Button>
          <Button>分享</Button>
          <Button>下载全部</Button>
          <Button>更多</Button>
        </Group>
      </Grid>
      <List
        data={[
          { label: 'Coming Home (Part Ⅱ)' },
          { label: '嘘' },
          { label: 'Lose Yourself' },
          { label: "Where'd You Go" },
          { label: 'Words' },
          { label: 'Love The Way You Lie [Pary Ⅲ]' },
          { label: 'I Need a Doctor' },
        ]}
        __ListItem={(itemInfo) => (
          <Item>
            <Text>{itemInfo.label}</Text>
          </Item>
        )}
        __Between={() => <Divider />}
      />
    </Section>
  )
}
