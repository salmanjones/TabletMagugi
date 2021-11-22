import React from 'react';
import {WebView} from 'react-native';

//通用Web浏览器
export class GenWebViewActivity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    render (){
        let urlParams = this.props.navigation.state.params;
        return (
            <WebView source={{uri: urlParams.url}}/>
        );
    }
}
