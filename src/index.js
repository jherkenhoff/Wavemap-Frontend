import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { AppContainer } from 'react-hot-loader'
import { App } from 'components'
import rootReducer from 'reducers'

import 'styling/semantic.less'

const store = createStore(rootReducer, applyMiddleware(thunk))

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
