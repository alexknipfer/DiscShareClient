import GoogleMap from './components/GoogleMap'
import React from 'react'
import SearchBar from './components/SearchBar'
import styled from 'styled-components'

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => {
  return (
    <CenterContent>
      <SearchBar />
      <GoogleMap />
    </CenterContent>
  )
}

export default Home
