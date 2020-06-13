import React, { ComponentProps } from 'react'

import './Home.scss'
import View from 'baseUI/UI/View'
import Swiper from 'baseUI/structure/Swiper'

// type State = {
//   selectedIndex: number
// }
// type Action = { type: 'set selected list index'; index: State['selectedIndex'] }

// const initState: State = {
//   selectedIndex: NaN
// }
// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'set selected list index':
//       return { ...state, selectedIndex: action.index }
//     default:
//       return state
//   }
// }

export default function Home(props: ComponentProps<typeof View>) {
  // const [state, dispatch] = useReducer(reducer, initState)
  return (
    <View as='section' {...props} className={['home', props.className]}>
      this is home
      <Swiper>hello world</Swiper>
    </View>
  )
}
