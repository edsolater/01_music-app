import React from 'react'
import * as ReactDOM from 'react-dom'
import './iconfont/iconfont.css'
import './App.scss'
import { AlbumMenu, MainAppContent, AudioPlayer } from 'components'
import { View } from 'mypack/components/lower'
import { Provider } from 'react-redux'
import { store } from 'store'

function App() {
  return (
    <Provider store={store}>
      <View className='app'>
        <AlbumMenu />
        <MainAppContent />
        <AudioPlayer />
      </View>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
