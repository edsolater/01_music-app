import { useState } from 'react'
//FIXME
export default function useNumber(init: unknown, options = {}) {
  const callbackPool = { onChange: <Array<(newNumber: number, oldNumber: number) => unknown>>[] }

  const [currentNumber, setNumber] = useState(Number(init))
  return {
    value: currentNumber,
  }
}
