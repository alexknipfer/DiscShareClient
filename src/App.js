import React, { Component } from 'react'

class App extends Component {
  componentDidMount() {
    fetch('/users').then(res => res.json()).then(users => console.log(users))
  }

  render() {
    return <h3>Home</h3>
  }
}

export default App
