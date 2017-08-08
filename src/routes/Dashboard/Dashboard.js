import {
  CenteredColumn,
  CenteredGrid
} from '../../components/CenteredGrid/CenteredGrid'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import AddButton from '../../components/AddButton/AddButton'
import AddDiscModal from './components/AddDiscModal/AddDiscModal'
import DashboardCard from '../../components/Cards/DashboardCard'
import { Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { sampleData } from './sampleData'

@observer
class Dashboard extends Component {
  @observable displayModal = false

  @action
  toggleModal = () => {
    this.displayModal = !this.displayModal
  }

  render() {
    return (
      <CenteredGrid>
        <AddButton toggleModal={this.toggleModal} />
        <AddDiscModal
          toggleModal={this.toggleModal}
          modalOpen={this.displayModal}
        />
        <Grid.Row>
          {sampleData.map((disc, key) => {
            return (
              <CenteredColumn
                key={key}
                mobile={16}
                computer={4}
                style={{ marginBottom: 20 }}
              >
                <DashboardCard
                  image="/images/elliot.jpg"
                  header={disc.discName}
                  meta={disc.location}
                  description={disc.description}
                />
              </CenteredColumn>
            )
          })}
        </Grid.Row>
      </CenteredGrid>
    )
  }
}

export default Dashboard
