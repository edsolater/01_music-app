const constraint = (
  num: number,
  config: {
    range?: [number, number]
  } = {}
) => {
  const [min, max] = config.range || []
  if (min && num < min) num = min
  if (max && num > max) num = max
  return num
}
export default constraint
