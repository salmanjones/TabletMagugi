import React from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { CardItem, ConsumeHistory } from 'components';
import { RechargeStoredCardStyles } from 'styles';

import { ButtonGroup } from 'react-native-elements';
//self
import {
  MemberQueryStyle,
  timeCardInfoStyles,
  cardInfoStyles,
  consumeHistoryStyles,
} from 'styles';

export class ModalCardInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tabIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  onTabChanged = index => {
    let that = this;
    this.setState({ tabIndex: index }, () => {
      //that.consumeHistory.queryData();
    });
  };

  render() {
    const { data, onConfirm } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        animationType={'fade'}
        transparent={false}
        style={MemberQueryStyle.container}
        onRequestClose={() => null}
        visible={visible}
      >
        <View style={cardInfoStyles.modalBackground}>
          <View style={cardInfoStyles.cashierBillInfoWrapper}>
            {this.renderTabs(['基本信息', '消费历史'])}
            {this.renderCard(data)}
            {this.renderConfirmBar(onConfirm)}
          </View>
        </View>
      </Modal>
    );
  }

  renderTabs(tabsData) {
    return (
      <View style={cardInfoStyles.titleBox}>
        <ButtonGroup
          onPress={this.onTabChanged}
          selectedIndex={this.state.tabIndex}
          buttons={tabsData}
          containerStyle={cardInfoStyles.containerStyle}
          buttonStyle={cardInfoStyles.buttonStyle}
          selectedButtonStyle={cardInfoStyles.selectedButtonStyle}
          textStyle={cardInfoStyles.textStyle}
          selectedTextStyle={cardInfoStyles.selectedTextStyle}
          innerBorderStyle={{ color: '#fff' }}
          underlayColor={'transparent'}
        />
      </View>
    );
  }

  renderCard(data) {
    if (this.state.tabIndex == 1) {
      return (
        <ConsumeHistory
          ref={ref => {
            this.consumeHistory = ref;
          }}
          cardId={data.vipCardNo}
        />
      );
    }

    let cardType = data.cardType;
    if (cardType === 2) return <TimeCardInfo data={data} />;
    else return <StoreageCardInfo data={data} />;
  }

  renderConfirmBar(onConfirm) {
    return (
      <View style={cardInfoStyles.MemberQueryBtnBox}>
        <TouchableOpacity
          style={MemberQueryStyle.MemberQueryConfirmBtn}
          onPress={onConfirm}
        >
          <Text style={MemberQueryStyle.MemberQueryConfirmText}>确定</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const TimeCardInfo = ({ data }) => {
  return (
    <View style={timeCardInfoStyles.cardInfoBox}>
      <View style={timeCardInfoStyles.cardInfoItemTitle}>
        <Text style={timeCardInfoStyles.itemTitleText}>次卡项目</Text>
      </View>
      <View style={timeCardInfoStyles.cardInfoBody}>
        <View style={timeCardInfoStyles.timeCardInfoLeft}>
          <View style={timeCardInfoStyles.cardImg}>
            <CardItem data={data} />
          </View>
          <View style={timeCardInfoStyles.cardInfoItemBox}>
            <View style={timeCardInfoStyles.cardInfo}>
              <View style={timeCardInfoStyles.cardInfoItem}>
                <Text style={timeCardInfoStyles.cardInfoText}>卡号</Text>
                <Text style={timeCardInfoStyles.cardInfoText}>
                  {data.vipCardNo}
                </Text>
              </View>
              <View style={timeCardInfoStyles.cardInfoItem}>
                <Text style={timeCardInfoStyles.cardInfoText}>分类</Text>
                <Text style={timeCardInfoStyles.cardInfoText}>
                  {data.projectCategoryName}
                </Text>
              </View>
              <View style={timeCardInfoStyles.cardInfoItem}>
                <Text style={timeCardInfoStyles.cardInfoText}>最低续充</Text>
                <Text style={timeCardInfoStyles.cardInfoText}>
                  ￥{data.initialPrice}
                </Text>
              </View>
            </View>
            <View style={timeCardInfoStyles.cardInfo}>
              <View style={timeCardInfoStyles.cardInfoItem}>
                <Text style={timeCardInfoStyles.cardInfoText}>有效期至</Text>
                <Text style={timeCardInfoStyles.cardInfoText}>
                  {data.validity
                    ? data.validity.length > 9
                      ? data.validity.substring(0, 10)
                      : '无期限'
                    : '无期限'}
                </Text>
              </View>
              <View style={timeCardInfoStyles.cardInfoItemStore}>
                <Text style={timeCardInfoStyles.cardInfoText}>开卡门店</Text>
                <Text style={timeCardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
                  {data.storeName}
                </Text>
              </View>
            </View>
            <View style={timeCardInfoStyles.cardInfoLast}>
              <View style={timeCardInfoStyles.cardInfoNote}>
                <Text style={timeCardInfoStyles.cardInfoText}>备注信息</Text>
                <Text style={timeCardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
                  {data.remark}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={timeCardInfoStyles.timeCardInfoRight}>
          {data.attachProjectList.map((item, index) => {
            return (
              <View key={index} style={timeCardInfoStyles.rightItem}>
                <View style={timeCardInfoStyles.rightItemL}>
                  <Text style={timeCardInfoStyles.rightItemText}>
                    {item.projectName}
                  </Text>
                </View>
                <View style={timeCardInfoStyles.rightItemR}>
                  <Text style={timeCardInfoStyles.rightItemTextR}>
                    剩余:{data.consumeMode === '1' ? item.balance + '次' : '--'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const StoreageCardInfo = ({ data }) => {
  let attachMoney = 0;
  if (data.attachMoneyList)
    attachMoney = data.attachMoneyList.reduce(
      (pre, cur) => pre + cur.balance || 0,
      0
    );

  const cardDetails = data.detailsMap;

  return (
    <View style={cardInfoStyles.cardInfoBox}>
      <View style={cardInfoStyles.cardImg}>
        <CardItem data={data} />
      </View>
      <View style={cardInfoStyles.cardInfoItemBox}>
        <View style={cardInfoStyles.cardInfo}>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>卡号</Text>
            <Text style={cardInfoStyles.cardInfoText}>{data.vipCardNo}</Text>
          </View>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>分类</Text>
            <Text style={cardInfoStyles.cardInfoText}>
              {data.projectCategoryName}
            </Text>
          </View>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>最低续充</Text>
            <Text style={cardInfoStyles.cardInfoText}>
              ￥{data.rechargePrice}
            </Text>
          </View>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>卡内余额</Text>
            <Text style={cardInfoStyles.cardInfoText}>￥{data.balance}</Text>
          </View>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>赠金余额</Text>
            <Text style={cardInfoStyles.cardInfoText}>￥{attachMoney}</Text>
          </View>
        </View>
        <View style={cardInfoStyles.cardInfo}>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>欠款</Text>
            <Text style={cardInfoStyles.cardInfoText}>￥{data.oweMoney}</Text>
          </View>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>有效期至</Text>
            <Text style={cardInfoStyles.cardInfoText}>
              {data.validity
                ? data.validity.length > 9
                  ? data.validity.substring(0, 10)
                  : '无期限'
                : '无期限'}
            </Text>
          </View>
          <View style={cardInfoStyles.cardInfoItem}>
            <Text style={cardInfoStyles.cardInfoText}>开卡门店</Text>
            <Text style={cardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
              {data.storeName}
            </Text>
          </View>
          <View style={cardInfoStyles.cardInfoDiscount}>
            <Text style={cardInfoStyles.cardInfoText}>折扣方案</Text>
            <Text style={cardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
              {cardDetails.discountName}
            </Text>
          </View>
        </View>
        <View style={cardInfoStyles.cardInfoLast}>
          <View style={cardInfoStyles.cardInfoNote}>
            <Text style={cardInfoStyles.cardInfoText}>备注信息</Text>
            <Text style={cardInfoStyles.cardInfoText} numberOfLines={1} ellipsizeMode={'tail'}>
              {data.remark}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
