import React, { ComponentProps, useState, useRef, useMemo, useEffect } from 'react'
import View from './View'
import './Input.scss'

type IProps = ComponentProps<typeof View> & {
  /**
   * 除className,style,onClick外的原生属性的
   */
  html?: JSX.IntrinsicElements['input']
  /**
   * 它的value要特殊处理
   */
  value?: JSX.IntrinsicElements['input']['value']
  /**
   * 它的value要特殊处理
   */
  defaultValue?: JSX.IntrinsicElements['input']['defaultValue']
}

// IDEA：将 controlled component 结合 uncontrolled component
const Input = React.forwardRef((props: IProps, ref) => {
  const inputElement = useRef<HTMLInputElement>()
  const [valueInData, setValue] = useState(props.defaultValue ?? props.value ?? '')
  useEffect(() => {
    setTimeout(() => {
      setValue('world')
    }, 1800)
  }, [])
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.value = String(valueInData)
    }
  }, [valueInData])
  const changeValue = e => setValue((e.target as HTMLInputElement).value)

  return useMemo(
    () => (
      <View
        as='input'
        ref={inputElement}
        _className='Input'
        _html={{
          onInput: changeValue
        }}
      />
    ),
    []
  )
})
Input.displayName = 'Input'
export default Input
