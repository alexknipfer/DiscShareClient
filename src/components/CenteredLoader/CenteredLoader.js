import { Loader } from 'semantic-ui-react'
import React from 'react'
import styled from 'styled-components'

const Center = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const CenteredLoader = ({ loading }) =>
  <Center>
    <Loader active={loading} inline="centered" />
  </Center>

export default CenteredLoader
