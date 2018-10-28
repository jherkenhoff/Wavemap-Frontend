import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { AppContainer } from 'react-hot-loader'
import { App } from 'components'
import rootReducer from 'reducers'
import io from 'socket.io-client'
import setupSocket from 'sockets'

import {getDeviceInfo, getDatasets, getSelectedDataset} from "actions"

import 'styling/semantic.less'


var socket = io.connect('http://' + document.domain + ":5000");

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(socket)))

setupSocket(socket, store.dispatch)

store.dispatch(getDeviceInfo())
store.dispatch(getDatasets())
store.dispatch(getSelectedDataset())

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App)
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('components/App', () => { render(App) })
}
