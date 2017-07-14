import App from './routes/index'
import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'

//eslint-disable-next-line
injectGlobal`
  body {
    background-color: #c2dfe3;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
