import React from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import { homeStyles, commonStyles } from '../styles';

export class BottomCopyModule extends React.PureComponent {
  render() {
    return (
      <View style={homeStyles.logoContent}>
        <Text style={homeStyles.copyText}>由</Text>
        <Image resizeMethod="resize"
          source={require('@imgPath/magugi.png')}
          style={commonStyles.magugiLogo}
        />
        <Text style={homeStyles.copyText}>美聚集提供技术支持</Text>
      </View>
    );
  }
}
