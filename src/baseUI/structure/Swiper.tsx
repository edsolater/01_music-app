import React, { ComponentProps } from 'react'
import './Swiper.scss'
import View from 'baseUI/UI/View'

function Swiper(props: ComponentProps<typeof View>) {
  return (
    <View {...props} className={[props.className, 'Swiper']}>
      I'm Swiper
    </View>
  )
}

export default React.memo(Swiper) as typeof Swiper
