import { CommonActions} from '@react-navigation/native'

const navigatorReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return undefined;
    }

    if (state && action.type === 'backToRoute') {

    }else if (state && action.type === 'GO_BACK') {

    }

    return state;
};

module.exports = navigatorReducer
