import React, {
  ComponentProps,
  useState,
  useRef,
  useMemo,
  useEffect,
  InputHTMLAttributes
} from 'react'
import View from './View'
import './Input.scss'
import { mergeRefs, mergeCallbacks } from 'functions/reactComponent'
import { omit } from 'functions/object'

type IProps = ComponentProps<typeof View> & InputHTMLAttributes<unknown>

// IDEA：将 controlled component 结合 uncontrolled component
const Input = React.forwardRef((props: IProps, ref) => {
  const inputElement = useRef<HTMLInputElement>()
  const [valueInData, setValue] = useState(props.value ?? '')
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.value = String(valueInData)
    }
  }, [valueInData])
  const changeValue = e => setValue((e.target as HTMLInputElement).value)

  // 一旦创造，这个节点就托管到浏览器中
  return useMemo(
    () => (
      <View
        as='input'
        ref={mergeRefs(inputElement, ref)}
        _className='Input'
        _originProps={{
          ...omit(props, 'value', 'ref'),
          onInput: mergeCallbacks([changeValue, props.onInput, props.originProps?.onInput])
        }}
      />
    ),
    []
  )
})
Input.displayName = 'Input'
export default Input
