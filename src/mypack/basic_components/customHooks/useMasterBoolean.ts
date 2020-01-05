import useMaster from './useMaster'

const useMasterBoolean = (initValue: boolean) =>
  useMaster({ type: 'boolean', init: initValue ?? false })
export default useMasterBoolean
