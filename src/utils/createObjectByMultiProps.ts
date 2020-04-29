export default function createObjectByMultiProps({
  properties,
  value,
}: {
  properties: string | string[]
  value: (prop: string) => any
}) {
  return [properties].flat().reduce((acc, prop) => {
    acc[prop] = value(prop)
    return acc
  }, {})
}
