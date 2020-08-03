import React, { useState } from 'react'
import { myFetch } from 'hooks/useFetch'

export const SongInfoContext = React.createContext({
  songInfo: undefined as MusicInfoWithoutUrl | undefined,
  setSongInfo: (_: MusicInfoWithoutUrl) => {},
  setSongId: (_: ID) => {}
})

export default function SongInfoProvider({ children }) {
  const [songInfo, setSongInfo] = useState<MusicInfoWithoutUrl>()
  function setSongId(id: ID) {
    myFetch('/song/detail', { ids: id }).then((res: any) => {
      setSongInfo(res?.songs[0])
    })
  }
  return (
    <SongInfoContext.Provider value={{ songInfo, setSongInfo, setSongId }}>
      {children}
    </SongInfoContext.Provider>
  )
}
