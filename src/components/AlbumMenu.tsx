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
  Header,
  Divider,
} from 'mypack/basic_components'
import './AlbumMenu.scss'
import { ChildTubeContext } from 'App'
import { ChildSideType } from 'tubeSystem'
import emailIcon from 'assets/email.svg'
import settingIcon from 'assets/setting.svg'

/**
 * 组件的与app通信的子设备
 * TODO：想想怎么能自动推断呢？手写类型很烦的
 * TODO: 这相当于是一个配件，需要一个容纳配件的 “配件库”
 */
let tube: ChildSideType

export default function AlbumMenu(props: {
  menuData: ComponentProps<typeof Menu>['data']
  initSelectedIndex?: number
  userInfo: UserInfo
}) {
  const Tube = useContext(ChildTubeContext)
  useEffect(() => {
    tube = new Tube('AlbumMenu', (payload) => console.log('listen from AlbumMenu: ', payload))
  }, [])
  return (
    <Section className='album-menu'>
      <Menu
        data={props.menuData} //TEMP
        initItemIndex={props.initSelectedIndex}
        onSelectMenuItem={(menuItemInfo) => {
          tube.emitUp({ type: 'change-menuItem', path: menuItemInfo.currentMenuPath })
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
        <Avatar src={props.userInfo.avatar} />
        <Text className='nickname'>{props.userInfo.nickname}</Text>
        <Icon src={emailIcon} iconName='email'>
          <RedDot amount={32} />
        </Icon>
        <Icon src={settingIcon} iconName='setting' />
      </Card>
    </Section>
  )
}
