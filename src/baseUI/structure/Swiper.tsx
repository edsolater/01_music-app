import React, { ComponentProps, useReducer, ReactNode, useEffect, useMemo } from 'react'
import './Swiper.scss'
import View from 'baseUI/UI/View'
import Button from 'baseUI/UI/Button'
import { loop, loopBackward } from 'functions/loop'
import { createIndexArray } from 'functions/create'

type State = {
  activeIndex: number
  total: number
}
type Action =
  | { type: 'go forward' }
  | { type: 'go back' }
  | { type: 'set'; activeIndex?: number; total?: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'go forward': {
      return { ...state, activeIndex: loop(state.activeIndex, createIndexArray(state.total)) }
    }
    case 'go back':
      return {
        ...state,
        activeIndex: loopBackward(state.activeIndex, createIndexArray(state.total))
      }
    case 'set':
      return {
        activeIndex: action.activeIndex ?? state.activeIndex,
        total: action.total ?? state.total
      }
    default:
      return state
  }
}
export default function Swiper(
  props: ComponentProps<typeof View> & {
    renderList: ReactNode[]
    activeIndex?: number
    /**
     * 自动播放
     */
    autoPlay?: boolean
    /**
     * 自动播放时间间隔（单位：毫秒）
     * 只在autoPlay为true时生效
     * 默认5000
     */
    autoPlayInterval?: number
  }
) {
  const [state, dispatch] = useReducer(reducer, {
    activeIndex: props.activeIndex ?? 0,
    total: props.renderList.length
  })

  useEffect(() => {
    dispatch({ type: 'set', total: props.renderList.length })
  }, [props.renderList.length])

  useEffect(() => {
    dispatch({ type: 'set', activeIndex: props.activeIndex })
  }, [props.activeIndex])

  // 自动播放
  useEffect(() => {
    if (props.autoPlay) {
      const timeoutId = window.setTimeout(() => {
        dispatch({ type: 'go forward' })
      }, props.autoPlayInterval ?? 5000)
      return () => {
        window.clearTimeout(timeoutId)
      }
    }
  })

  return useMemo(
    () => (
      <View {...props} className={[props.className, 'Swiper']}>
        {props.renderList[state.activeIndex]}
        {/* TODO 异想天开： 写一个分页器组件跟这个结合使用 */}
        <View className='pagination'>
          {props.renderList.map((_item, idx) => (
            <Button
              key={idx}
              onClick={() => {
                dispatch({ type: 'set', activeIndex: idx })
              }}
            >
              {idx}
            </Button>
          ))}
        </View>
        <View className='back'>
          <Button onClick={() => dispatch({ type: 'go back' })}>◀</Button>
        </View>
        <View className='forward'>
          <Button onClick={() => dispatch({ type: 'go forward' })}>▶</Button>
        </View>
      </View>
    ),
    [state]
  )
}
