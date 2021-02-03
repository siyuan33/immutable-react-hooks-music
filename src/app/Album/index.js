import React, { memo } from "react"
import styled from "styled-components"
export const AlbumWrapper = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
`

function Album(props) {
  return (
    <>
      <AlbumWrapper>Album</AlbumWrapper>
    </>
  )
}
export default memo(Album)
