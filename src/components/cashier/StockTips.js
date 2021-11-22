//libs
import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { TimeCard } from 'components';
import { CheckBox } from 'react-native-elements';
import { PixelUtil } from 'utils';
//self
import { inventoryTableStyle } from 'styles';
export class StockTips extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { stockData, caption } = this.props;

    return (
      <View style={inventoryTableStyle.modalBackground}>
        <View style={inventoryTableStyle.cashierBillInfoWrapper}>
          <View style={inventoryTableStyle.MemberQueryTitle}>
            <Text style={inventoryTableStyle.MemberQueryTitleText}>
              {caption ? caption : '以下产品的库存数量不足，无法结账！'}
            </Text>
          </View>
          <View style={inventoryTableStyle.billInfoBox}>
            <View style={inventoryTableStyle.inventoryTable}>
              <View style={inventoryTableStyle.inventoryTableTh}>
                <View style={inventoryTableStyle.inventoryTableTr}>
                  <View style={inventoryTableStyle.inventoryTableTdL}>
                    <Text
                      style={inventoryTableStyle.inventoryTableTdText}
                      numberOfLines={1}
                    >
                      名称
                    </Text>
                  </View>
                  <View style={inventoryTableStyle.inventoryTableTdR}>
                    <Text
                      style={inventoryTableStyle.inventoryTableTdText}
                      numberOfLines={1}
                    >
                      当前库存量
                    </Text>
                  </View>
                </View>
              </View>
              <View style={inventoryTableStyle.inventoryTableTbody}>
                <ScrollView>
                  {stockData.map((item, index) => {
                    return (
                      <View
                        style={inventoryTableStyle.inventoryTableTr}
                        key={index}
                      >
                        <View style={inventoryTableStyle.inventoryTableTdL}>
                          <Text
                            style={inventoryTableStyle.inventoryTableTdText}
                            numberOfLines={1} ellipsizeMode={'tail'}
                          >
                            {item.productName}
                          </Text>
                        </View>
                        <View style={inventoryTableStyle.inventoryTableTdR}>
                          <Text
                            style={inventoryTableStyle.inventoryTableTdText}
                            numberOfLines={1} ellipsizeMode={'tail'}
                          >
                            {item.count}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
          <View style={inventoryTableStyle.MemberQueryBtnBox}>
            <TouchableOpacity
              style={inventoryTableStyle.MemberQueryCancelBtn}
              onPress={this.props.onClose}
            >
              <Text style={inventoryTableStyle.MemberQueryCancelText}>
                关闭
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
