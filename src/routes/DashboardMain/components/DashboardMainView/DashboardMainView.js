import {
  CenteredColumn,
  CenteredGrid
} from '../../../../components/CenteredGrid'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import AddButton from '../../../../components/AddButton'
import AddDiscModal from '../../components/AddDiscModal'
import CenteredLoader from '../../../../components/CenteredLoader'
import DashboardCard from '../../../../components/DashboardCard'
import DiscsQuery from '../../queries/discs'
import { Grid } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

@observer
class DashboardMain extends Component {
  @observable displayModal = false

  @action
  toggleModal = () => {
    this.displayModal = !this.displayModal
  }

  render() {
    const { loading, discs } = this.props

    if (loading) {
      return <CenteredLoader />
    }

    return (
      <CenteredGrid>
        <AddButton toggleModal={this.toggleModal} />
        <AddDiscModal
          toggleModal={this.toggleModal}
          modalOpen={this.displayModal}
        />
        <Grid.Row>
          {discs.length === 0 && <h3>No Discs Found</h3>}
          {discs.map((disc, key) => {
            return (
              <CenteredColumn
                key={key}
                mobile={16}
                tablet={4}
                computer={4}
                style={{ marginBottom: 20 }}
              >
                <DashboardCard
                  image="/images/elliot.jpg"
                  header={disc.discName}
                  meta={disc.locationDescription}
                  description={`The name found on the disc was ${disc.nameOnDisc ||
                    'unknown'}.`}
                />
              </CenteredColumn>
            )
          })}
        </Grid.Row>
      </CenteredGrid>
    )
  }
}

export default graphql(DiscsQuery, {
  props: ({ data: { loading, discs } }) => ({
    loading,
    discs
  })
})(DashboardMain)
