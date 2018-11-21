import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { AppContainer as ReactAppContainer } from 'react-hot-loader'
import { AppContainer } from 'containers'
import rootReducer from 'reducers'
import io from 'socket.io-client'
import setupSocket from 'sockets'

import 'styling/semantic.less'


//var socket = io.connect('http://' + document.domain + ":5000");

//const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(socket)))
const store = createStore(rootReducer, applyMiddleware(thunk))

//setupSocket(socket, store.dispatch)

const render = (Component) => {
    ReactDOM.render(
        <ReactAppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </ReactAppContainer>,
        document.getElementById('root'),
    )
}

render(AppContainer)
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('containers/AppContainer', () => { render(AppContainer) })
}
