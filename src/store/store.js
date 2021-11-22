import { createStore, applyMiddleware } from 'redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/index';
import {navMiddleware} from "../navigators/app-navigator"


const getMiddleware = () => {
  const middlewares = [reduxThunk,navMiddleware];
  if (__DEV__) {
    //middlewares.push(createLogger());
  }
  return applyMiddleware(...middlewares);
};

export default function configureStore() {
  const store = createStore(reducers, getMiddleware());
  let persistor = persistStore(store);
  return {
    persistor,
    store,
  };
}
