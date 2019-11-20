import React from 'react'
export const Popover = (props) => (
  <div
    className="volume-panel"
    ref={props.volumnPanelRef}
    onClick={() => console.log(`I'm clicked sd`)}
    style={{
      opacity: props.volumePanel.exist ? 1 : 0,
      pointerEvents: props.volumePanel.exist ? 'unset' : 'none',
    }}
    onPointerEnter={props.volumePanel.dismissDeferHide}
    onPointerLeave={props.volumePanel.deferHide}
  >
    hello
  </div>
)
