import React, { Component } from 'react'
import queryString from 'query-string'
import { Grid } from 'semantic-ui-react'

import { CenteredGrid } from '../../../../components/CenteredGrid'
import SearchBar from '../SearchBar'

export default class Home extends Component {
  selectLocation = location => {
    const { location: { lng, lat } } = location
    const queryValue = queryString.stringify({ lng, lat })
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
