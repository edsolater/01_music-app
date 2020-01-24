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
} from 'mypack/basic_components'
import './AlbumMenu.scss'
import { AppDataContext } from 'App'
import emailIcon from 'assets/email.svg'
import settingIcon from 'assets/setting.svg'

export default function AlbumMenu() {
  const appData = useContext(AppDataContext)
  return (
    <Section className='album-menu'>
      <Menu
        data={appData.menu.collections} //TEMP
        initItemIndex={appData.menu.initIndex}
        onSelectMenuItem={() => {
          //TODO
        }}
        __MenuHeader={() => (
          <Card
            style={{
              position: 'sticky',
              zIndex: 1,
              top: 0,
              height: 40,
            }}
          >
            <Title>Header hear!</Title>
          </Card>
        )}
        //TODO: MenuGroup 与 MenuItem 能不能合并成一个？
        __MenuGroup={({ group: menuGroup }) => (
          <Title style={{ fontSize: 14, color: 'gray' }} /* TEMP：以后要把样式从逻辑中踢出去 */>
            {menuGroup.title}
          </Title>
        )}
        __MenuItem={({ item: menuItem }) => (
          <Item>
            <Text>
              <RedDot onlyDot />
              <Text>{menuItem.itemPathLabel}</Text>
            </Text>
          </Item>
        )}
        __BetweenItems={() => <Divider />}
      />
      <Card>
        <Avatar src={appData.userProfile.avatar} />
        <Text className='nickname'>{appData.userProfile.nickname}</Text>
        <Icon src={emailIcon} iconName='email'>
          <RedDot amount={32} />
        </Icon>
        <Icon src={settingIcon} iconName='setting' />
      </Card>
    </Section>
  )
}
