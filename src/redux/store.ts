import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

//const store = createStore(rootReducer, applyMiddleware(thunk))

let store: any

if (process.env.NODE_ENV === 'development') {
    const Reactotron = require('../config/ReactotronConfig').default;
    store = createStore(
      rootReducer,
      compose(applyMiddleware(thunk), Reactotron.createEnhancer!()),
    );
} else {
    store = createStore(rootReducer, applyMiddleware(thunk));
    // eslint-disable-next-line no-console
}

export { store }