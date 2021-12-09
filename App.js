import {Provider} from 'react-redux';
import * as React from 'react';
import {SplashScreen} from 'react-native-splash-screen';
import {LayoutAnimation} from 'react-native';
import configureStore from './src/store/store';
import {AppNavigation} from "./src/navigators";
import {NavigationContainer} from '@react-navigation/native';

const {store} = configureStore();

type Props = {};
class App extends React.Component<Props> {
    componentDidMount() {
        SplashScreen&&SplashScreen.hide();
        LayoutAnimation.spring();
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigation/>
            </Provider>
        );
    }
}

export default App;
