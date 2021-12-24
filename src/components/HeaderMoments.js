import React from 'react';
import { View, Text } from 'react-native';
import Moment from 'react-moment';

import { homeStyles } from "../styles";

export class HeaderMoments extends React.Component{
    render(){
      return(
          <View style={homeStyles.logoutWrapper }>
              <Moment format="YYYY-MM-DD HH:mm" element={ Text } style={ homeStyles.logoutText }></Moment>
          </View>
      );
    }
}
