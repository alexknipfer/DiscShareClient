import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

export const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`

export const CenteredColumn = styled(Grid.Column)`
  display: flex;
  justify-content: center;
  @media (max-width: 800px) {
    display: flex !important;
    justify-content: center !important;
  }
`
