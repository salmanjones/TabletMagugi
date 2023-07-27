import {Provider} from 'react-redux';
import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {LayoutAnimation} from 'react-native';
import store from './src/store/store';
import {AppNavigation} from './src/navigators';

export default function App() {
    React.useEffect(() => {
        SplashScreen && SplashScreen.hide();
        LayoutAnimation.spring();
    }, []);

    return (
        <Provider store={store}>
            <AppNavigation/>
        </Provider>
    );
}
