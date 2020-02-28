const numberGard = (
  num: number,
  config: {
    range?: [number, number]
  } = {},
) => {
  const [min, max] = config.range || []
  if (min !== undefined && num < min) num = min
  if (max !== undefined && num > max) num = max
  return num
}

export class UGuard {
  static number = numberGard
}
