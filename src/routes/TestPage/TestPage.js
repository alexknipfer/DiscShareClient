import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

class TestPage extends Component {
  render() {
    return (
      <div>
        <h3>Test Page</h3>
        <h2>
          {this.props.data.hello}
        </h2>
      </div>
    )
  }
}

const myQuery = gql`
  {
    hello
  }
`

export default graphql(myQuery)(TestPage)
