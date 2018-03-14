import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
