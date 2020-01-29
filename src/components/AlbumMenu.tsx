import React, { useContext } from 'react'
import {
  Menu,
  Title,
  Item,
  Section,
  Card,
  Avatar,
  Icon,
  Text,
  RedDot,
  Divider,
  View,
} from 'mypack/basic_components'
import './AlbumMenu.scss'
import { AppDataContext } from 'App'
import { emailIcon, gearIcon } from 'assets/icons'

export default function AlbumMenu() {
  const appData = useContext(AppDataContext)
  return (
    <Section className='album-menu'>
      <Menu
        data={appData.menu.collections} //TEMP
        initItemIndex={appData.menu.initIndex}
        onSelectMenuItem={() => {
          //TODO 这里还没写
        }}
        __MenuHeader={() => (
          <Card>
            <Title>Header hear!</Title>
          </Card>
        )}
        //TODO: MenuGroup 与 MenuItem 能不能合并成一个？
        __MenuGroup={({ group: menuGroup }) => (
          <Text headline style={{ fontSize: 14, color: 'gray' }} /* TEMP：以后要把样式从逻辑中踢出去 */>
            {menuGroup.title}
          </Text>
        )}
        __MenuItem={({ item: menuItem }) => (
          <Item>
            <View className='textbox'>
              {/* TODO： 这个textbox 专门为了RedDot元素能overflow而存在，应该提取一个名为软性外边框的组件 */}
              <RedDot onlyDot />
              <Text>{menuItem.itemPathLabel}</Text>
            </View>
          </Item>
        )}
        __BetweenItems={() => <Divider />}
      />
      <Card className="user-info">
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
