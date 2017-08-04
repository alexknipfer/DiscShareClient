import {
  CenteredColumn,
  CenteredGrid
} from '../../components/CenteredGrid/CenteredGrid'

import DashboardCard from '../../components/Cards/DashboardCard'
import { Grid } from 'semantic-ui-react'
import React from 'react'
import { sampleData } from './sampleData'

const Dashboard = () => {
  return (
    <CenteredGrid>
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
                color="white"
              />
            </CenteredColumn>
          )
        })}
      </Grid.Row>
    </CenteredGrid>
  )
}

export default Dashboard
