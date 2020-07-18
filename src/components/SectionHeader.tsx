import React, { ComponentProps } from 'react'
import './style.scss'

import View from 'baseUI/UI/View'
import Text from 'baseUI/UI/Text'
import Button from 'baseUI/UI/Button'

export default function SectionHeader(
  props: ComponentProps<typeof View> & {
    /**标题名称 */
    sectionName: string
    onClickDetail?: Callback
  }
) {
  return (
    <View className='SectionHeader'>
      <Text h2>{props.sectionName}</Text>
      <Button className='detail' onClick={props.onClickDetail}>
        更多
      </Button>
    </View>
  )
}
