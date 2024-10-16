import { createRoot } from 'react-dom/client'

//Redux
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import allReducers from './reducers/index.js'

import App from './App.jsx'

const store = configureStore({
  reducer : allReducers 
}) 
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
