import { CenteredGrid } from '../../components/CenteredGrid/CenteredGrid'
import GoogleMap from './components/GoogleMap'
import { Grid } from 'semantic-ui-react'
import React from 'react'
import SearchBar from './components/SearchBar'

const Home = () => {
  return (
    <CenteredGrid centered>
      <Grid.Row>
        <Grid.Column mobile={14} tablet={10} computer={8}>
          <SearchBar />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column mobile={14} tablet={14} computer={12}>
          <GoogleMap />
        </Grid.Column>
      </Grid.Row>
    </CenteredGrid>
  )
}

export default Home
