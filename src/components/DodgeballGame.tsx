import React, { useRef, useEffect } from 'react'
import './DodgeballGame.less'

export function DodgeballGame() {
  const canvasRef = useRef(null)

  // 初始化
  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    // 画个球
    ctx.fillStyle = "rgb(200, 0, 0)"
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
    ctx.fill()
    
    console.log('4: ', 4)
    // 绑定键盘事件
    document.addEventListener('keypress',(e) => {
      console.log('e: ', e)
    })
  },[])

  return (
    <canvas ref={canvasRef} className='dodgeball-game' height='400' width='800'>
      gammmmm
    </canvas>
  )
}
