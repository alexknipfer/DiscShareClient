import AddDiscModal from './AddDiscModal'
import AddDiscMutation from '../../mutations/addDisc'
import DiscsQuery from '../../queries/discs'
import { graphql } from 'react-apollo'

export default graphql(AddDiscMutation, {
  props: ({ mutate }) => ({
    addDisc: (
      discName,
      locationDescription,
      longitude,
      latitude,
      nameOnDisc,
      userId
    ) => {
      return mutate({
        variables: {
          discName,
          locationDescription,
          longitude,
          latitude,
          nameOnDisc,
          userId
        }
      })
    }
  }),
  options: props => ({
    refetchQueries: [
      {
        query: DiscsQuery,
        variables: {
          userId: props.userId
        }
      }
    ]
  })
})(AddDiscModal)
