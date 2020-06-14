import React, { ComponentProps } from 'react'

import './Home.scss'
import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'

const Home = (props: ComponentProps<typeof View>) => {
  return (
    <View as='section' {...props} className={[props.className, 'home']}>
      this is home
      <Swiper
        renderList={[
          <View
            style={{
              height: '200px',
              backgroundColor: 'dodgerblue',
              color: 'white',
              textAlign: 'center'
            }}
          >
            helloWorld
          </View>,
          <View
            style={{
              height: '200px',
              backgroundColor: 'dodgerblue',
              color: 'white',
              textAlign: 'center'
            }}
          >
            helloWorld222
          </View>
        ]}
      />
    </View>
  )
}
export default Home
