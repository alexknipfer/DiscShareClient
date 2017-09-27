import React, { Component } from 'react'

import { CenteredGrid } from '../../../../components/CenteredGrid'
import { Grid } from 'semantic-ui-react'
import HomeStore from '../../stores/HomeStore'
import SearchBar from '../SearchBar'
import queryString from 'query-string'

export default class Home extends Component {
  selectLocation = location => {
    const { location: { lng, lat } } = location
    const { radius } = HomeStore

    const queryValue = queryString.stringify({ lng, lat, radius })
    this.props.history.push(`/discsdashboard/?${queryValue}`)
  }

  render() {
    return (
      <CenteredGrid centered>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={10} computer={8}>
            <SearchBar selectLocation={this.selectLocation} />
          </Grid.Column>
        </Grid.Row>
      </CenteredGrid>
    )
  }
}
