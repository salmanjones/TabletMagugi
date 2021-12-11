import {Provider} from 'react-redux';
import * as React from 'react';
import {SplashScreen} from 'react-native-splash-screen';
import {LayoutAnimation} from 'react-native';
import store from './src/store/store';
import {AppNavigation} from "./src/navigators";

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
