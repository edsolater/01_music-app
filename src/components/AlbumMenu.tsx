import React, { ComponentProps, useEffect, useContext } from 'react'
import { Menu, Title, Item, Section, Card, Footer } from 'mypack/basic_components'
import './AlbumMenu.scss'
import { ChildTubeContext } from 'App'
import { ChildSideType } from 'tubeSystem'

/**
 * 组件的与app通信的子设备
 * TODO：想想怎么能自动推断呢？手写类型很烦的
 * TODO: 这相当于是一个配件，需要一个容纳配件的 “配件库”
 */
let tube: ChildSideType

export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
}: {
  data: ComponentProps<typeof Menu>['data']
  initSelectedIndex?: number
}) {
  const Tube = useContext(ChildTubeContext)
  useEffect(() => {
    tube = new Tube('AlbumMenu', (payload) => console.log('listen from AlbumMenu: ', payload))
  }, [])
  return (
    <Section className='album-menu'>
      <Menu
        data={data} //TEMP
        initItemIndex={initSelectedIndex}
        onSelectMenuItem={(menuItemInfo) => {
          console.log('3: ', 3)
          tube.emitUp({ type: 'change-menuItem', newIndex: menuItemInfo.itemIndex })
        }}
        __Header_node={
          <Card
            style={{
              height: 40,
            }}
          >
            <Title>Header hear!</Title>
          </Card>
        }
        __Header_props={{
          style: {
            position: 'sticky',
            zIndex: 1,
            top: 0,
          },
        }}
        __MenuGroup_node={({ group: menuGroup }) => (
          <Title style={{ fontSize: 14, color: 'gray' }} /* TEMP：以后要把样式从逻辑中踢出去 */>
            {menuGroup.title}
          </Title>
        )}
        __MenuItems_node={({ item: menuItem }) => (
          <Item>
            <Title>{menuItem.title}</Title>
          </Item>
        )}
      />
      <Footer
        style={{
          position: 'sticky',
          zIndex: 1,
          bottom: 0,
        }}
      >
        <Card
          style={{
            height: 80,
          }}
        >
          <Title>I'm Footer</Title>
        </Card>
      </Footer>
    </Section>
  )
}
