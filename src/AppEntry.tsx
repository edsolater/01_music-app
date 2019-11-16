import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './AppEntry.css'
import { Popover } from './components'
import { GetWidgetHandler } from 'type_helper'

const App: React.FC = () => {
  const popoverHandler = { musk: undefined } as GetWidgetHandler<typeof Popover>
  return (
    <Popover widgetHandler={popoverHandler}>
      <button className="hello">world</button>
    </Popover>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
