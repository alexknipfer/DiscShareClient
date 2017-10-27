import React, { Component } from 'react'
import { action, observable } from 'mobx'

import CenterLoader from '../../../../components/CenteredLoader'
import { CenteredGrid } from '../../../../components/CenteredGrid'
import DefaultLayout from '../../../../layouts/DefaultLayout'
import GoogleMapsService from '../../../../lib/services/GoogleMapsService'
import { Grid } from 'semantic-ui-react'
import HomeStore from '../../stores/HomeStore'
import SearchBar from '../SearchBar'
import { observer } from 'mobx-react'
import queryString from 'query-string'

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
        <DefaultLayout>
          {() => (
            <CenteredGrid centered>
              <Grid.Row>
                <Grid.Column mobile={14} tablet={10} computer={8}>
                  <SearchBar selectLocation={this.selectLocation} />
                </Grid.Column>
              </Grid.Row>
            </CenteredGrid>
          )}
        </DefaultLayout>
      )
    }
  }
}
