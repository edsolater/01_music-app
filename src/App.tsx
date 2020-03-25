import React from 'react'
import * as ReactDOM from 'react-dom'
import './iconfont/iconfont.css'
import './App.scss'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'components'
import { Provider } from 'react-redux'
import { store } from 'store'
import { View } from 'mypack/components/wrappers'

function App() {
  return (
    <Provider store={store}>
      <View className='app' as='main'>
        <AlbumMenu />
        <MainAppContent />
        <AudioPlayer />
      </View>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
