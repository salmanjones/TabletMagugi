import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import { pendingStyles } from '../../styles';

export class PendingOrderSummary extends PureComponent {
  render() {
    return (
      <View style={pendingStyles.statisticsTextBox}>
        <Text style={pendingStyles.statisticsText}>共</Text>
        <Text style={pendingStyles.statisticsTextRed}>
          {this.props.count}张
        </Text>
        <Text style={pendingStyles.statisticsText}>待付水单</Text>
      </View>
    );
  }
}
