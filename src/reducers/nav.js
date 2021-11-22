//self
import {AppNavigator} from 'navigators';
import {NavigationActions} from 'react-navigation';

const defaultGetStateForAction = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === 'backToRoute') {
        let index = state.routes.findIndex(item => {
            return item.routeName === action.routeName;
        });
        const routes = state.routes.slice(0, index + 1);
        return {
            routes,
            index,
        };
    } else if (state && action.type === NavigationActions.BACK) {
        let params = state.routes[state.index].params;
        if (params && params.back) {
            params.back();
            return null;
        }
    }
    return defaultGetStateForAction(action, state);
};

const startActivity = AppNavigator.router.getActionForPathAndParams(
    'LoginActivity'
);
const initialNavState = AppNavigator.router.getStateForAction(startActivity);

const navReducer = (state = initialNavState, action) => {
    let nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

module.exports = navReducer;
