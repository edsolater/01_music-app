export default function asyncDo(syncFunction: (...anys: any[]) => any) {
  return Promise.resolve().then(syncFunction)
}
