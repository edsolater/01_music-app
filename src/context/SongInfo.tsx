import React, { useState } from 'react'
import { myFetch } from 'hooks/useFetch'

export const SongInfoContext = React.createContext([
  undefined as MusicInfoWithoutUrl | undefined,
  (_: MusicInfoWithoutUrl) => {},
  (_: ID) => {}
] as const)

export default function SongInfoProvider({ children }) {
  const [resource, setResource] = useState<MusicInfoWithoutUrl>()
  function setId(id: ID) {
    myFetch('/song/detail', { ids: id }).then((res: any) => {
      setResource(res?.songs[0])
    })
  }
  return (
    <SongInfoContext.Provider value={[resource, setResource, setId]}>
      {children}
    </SongInfoContext.Provider>
  )
}
