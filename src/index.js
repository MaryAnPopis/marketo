import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { StripeProvider } from 'react-stripe-elements'

import './style/index.scss'
import 'react-toastify/dist/ReactToastify.css'

const store = configureStore()

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: 'rgb(23, 105, 170)',
      dark: '#000',
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <StripeProvider apiKey="pk_test_5j4Xji3WgvvmCij2LfnQQdle">
          <App />
        </StripeProvider>
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
