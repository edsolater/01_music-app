import React, { useContext } from 'react'
import {
  Menu,
  Item,
  Section,
  Card,
  Avatar,
  Icon,
  Text,
  RedDot,
  View,
} from 'mypack/basic_components'
import './AlbumMenu.scss'
import { AppDataContext } from 'App'
import { emailIcon, gearIcon } from 'assets/icons'

export default function AlbumMenu() {
  const appData = useContext(AppDataContext)
  return (
    <Section className='album-menu'>
      <Card className='shrink-button'>
        <Text title3>Header hear!</Text>
      </Card>
      <Menu
        data={appData.menu.collections} //TEMP
        initItemIndex={appData.menu.initIndex}
        onSelectMenuItem={() => {
          //TODO 这里还没写
        }}
      >
        haha
        <Menu.Group>{(groupInfo) => <Text headline>{groupInfo.data.name}</Text>}</Menu.Group>
        <Menu.Item>
          {(itemInfo) => (
            <Item html={{ title: 'hello' }}>
              <View className='textbox'>
                {/* TODO： 这个textbox 专门为了RedDot元素能overflow而存在，应该提取一个名为软性外边框的组件 */}
                <RedDot onlyDot />
                <Text>{itemInfo.data.title}</Text>
              </View>
            </Item>
          )}
        </Menu.Item>
      </Menu>
      <Card className='user-info'>
        <Avatar src={appData.userProfile.avatar} />
        <Text className='nickname'>{appData.userProfile.nickname}</Text>
        <Icon src={emailIcon} iconName='email'>
          <RedDot amount={32} />
        </Icon>
        <Icon src={gearIcon} iconName='setting' />
      </Card>
    </Section>
  )
}
