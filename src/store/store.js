import {applyMiddleware, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/index';

function createLogger({getState}) {
    return (next) => (action) => {
        console.log('will dispatch', action)

        // 调用 middleware 链中下一个 middleware 的 dispatch。
        let returnValue = next(action)
        console.log('state after dispatch', getState())

        return returnValue
    }
}

const getMiddleware = () => {
    const middlewares = [reduxThunk];
    if (__DEV__) {
        middlewares.push(createLogger);
    }
    return applyMiddleware(...middlewares);
};

export default function configureStore() {
    const middleware = getMiddleware();
    const store = createStore(reducers, middleware)

    return {
        store
    }
}
