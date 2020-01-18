import React, { ComponentProps, useEffect, useContext } from 'react'
import { Menu, Title, Item, Section, Card } from 'mypack/basic_components'
import './AlbumMenu.scss'
import { ChildSideTube } from 'App'
import { ChildSide } from 'TubeSystem'

/**
 * 组件的与app通信的子设备
 * TODO：想想怎么能自动推断呢？手写类型很烦的
 * TODO: 这相当于是一个配件，需要一个容纳配件的 “配件库” 
 */
let tube: ChildSide

export default function AlbumMenu({
  data,
  initSelectedIndex = 0,
  onSelectMenuItem,
}: {
  data: ComponentProps<typeof Menu>['data']
  initSelectedIndex?: number
  onSelectMenuItem?: ComponentProps<typeof Menu>['onSelectMenuItem']
}) {
  const Tube = useContext(ChildSideTube)
  useEffect(() => {
    tube = new Tube('AlbumMenu', (payload) => console.log('listen from AlbumMenu: ', payload))
  }, [])
  return (
    <Section
      className='album-menu'
      __Footer_node={
        <Card
          style={{
            height: 80,
          }}
        >
          <Title>I'm Footer</Title>
        </Card>
      }
      __Footer_props={{
        style: {
          position: 'sticky',
          zIndex: 1,
          bottom: 0,
        },
      }}
    >
      <Menu
        data={data} //TEMP
        initItemIndex={initSelectedIndex}
        onSelectMenuItem={onSelectMenuItem}
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
    </Section>
  )
}
