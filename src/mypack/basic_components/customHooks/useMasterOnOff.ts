import useMaster from './useMaster'

const useMasterOnOff = (initValue: boolean) => useMaster({ type: 'on-off', init: initValue })
export default useMasterOnOff
