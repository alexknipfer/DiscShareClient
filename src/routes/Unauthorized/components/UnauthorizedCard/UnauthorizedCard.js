import { Card, Divider, Grid, Icon } from 'semantic-ui-react'

import { CenteredCardGrid } from '../../../../components/CenteredGrid'
import PaddedCard from '../../../../components/PaddedCard/index'
import React from 'react'
import styled from 'styled-components'

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`

const loginRedirect = ({ history }) => history.push('/login')

const formatRoute = path => {
  const strippedPath = path.slice(1)
  return strippedPath.charAt(0).toUpperCase() + strippedPath.substr(1)
}

const UnauthorizedCard = props => {
  const { location: { state } } = props

  const attemptedRoute = formatRoute(state.from.pathname)

  return (
    <CenteredCardGrid>
      <Grid.Column mobile={14} computer={8}>
        <PaddedCard fluid>
          <Card.Header>
            <HeaderContent>
              <Icon name="warning sign" size="large" color="red" />
              <span>Unauthorized</span>
            </HeaderContent>
          </Card.Header>
          <Divider />
          <p style={{ fontSize: '15px' }}>
            Oops! Looks like you attempted to access the <b>{attemptedRoute}</b>{' '}
            page which is an authorized route and requires an account. Click{' '}
            <a
              onClick={() => loginRedirect(props)}
              style={{ cursor: 'pointer' }}
            >
              here
            </a>{' '}
            to login.
          </p>
        </PaddedCard>
      </Grid.Column>
    </CenteredCardGrid>
  )
}

export default UnauthorizedCard
