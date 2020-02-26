import React, { useContext } from 'react'
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
import { heartIcon } from 'assets/icons'
import { AppDataContext } from 'App'

export default function MainAppContent() {
  const appData = useContext(AppDataContext)
  return (
    <Section className='main-app-content'>
      <Text headline>歌单</Text>
      <Grid className='collection-info'>
        <Block className='thumbnail'>
          <ImageBox src={appData.collectionInfo.thumbnail} className='thumbnail-pic' />
          {/* TODO: 以后SVGIcon要动态的化不能简单地作为 img 处理 */}
          <Icon src={heartIcon} className='thumbnail-icon' />
        </Block>
        <Text largeTitle>{appData.collectionInfo.title}</Text>
        <Block className='creator'>
          <Avatar src={appData.collectionInfo.creatorInfo.avatar} className='creator-avatar' />
          <Text subhead className='creator-nickname'>
            {appData.collectionInfo.creatorInfo.nickName}
          </Text>
          <Text footnote className='creator-create-time'>
            {appData.collectionInfo.createTime} 创建
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
        keyForItems={item => item.songName}
        data={appData.collectionMusicList}
        initSelectedIndex={0} //TODO: 属于App数据的一部分，要由AppStore控制
        renderListItem={itemInfo => (
          <Item>
            <Text>{itemInfo.songName}</Text>
          </Item>
        )}
        renderBetween={() => <Divider />}
        onSelectItem={itemInfo => {
          appData.playNewMusic(itemInfo)
        }}
      />
    </Section>
  )
}
