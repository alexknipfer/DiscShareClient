import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { CenteredGrid } from '../../../../components/CenteredGrid'
import { Grid } from 'semantic-ui-react'
import CenterLoader from '../../../../components/CenteredLoader'
import HomeStore from '../../stores/HomeStore'
import SearchBar from '../SearchBar'
import queryString from 'query-string'
import GoogleMapsService from '../../../../lib/services/GoogleMapsService'

@observer
export default class Home extends Component {
  @observable loading = true

  @action
  toggleLoader = () => {
    this.loading = false
  }

  async componentDidMount() {
    await GoogleMapsService.mount()
    this.toggleLoader()
  }

  selectLocation = location => {
    const { location: { lng, lat } } = location
    const { radius } = HomeStore

    const queryValue = queryString.stringify({ lng, lat, radius })
    this.props.history.push(`/discsdashboard/?${queryValue}`)
  }

  render() {
    if (this.loading) {
      return <CenterLoader />
    } else {
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
}
