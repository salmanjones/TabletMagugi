import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import {pendingStyles} from '../../styles';

export class BillingOrderSummary extends PureComponent {
  render() {
    return (
      <View style={pendingStyles.statisticsTextBox}>
        <Text style={pendingStyles.statisticsText}>共</Text>
        <Text style={pendingStyles.statisticsTextRed}>
          {this.props.count}张
        </Text>
        <Text style={pendingStyles.statisticsText}>已结单</Text>
      </View>
    );
  }
}
