import DashboardGrid from './DashboardGrid'
import DiscsQuery from '../../queries/discs'
import { graphql } from 'react-apollo'

export default graphql(DiscsQuery, {
  props: ({ data: { loading, discs } }) => ({
    loading,
    discs
  }),
  options: props => ({
    variables: { userId: props.user.id }
  })
})(DashboardGrid)
