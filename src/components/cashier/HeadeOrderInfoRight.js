import React from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';

import {commonStyles} from '../../styles';

export class HeadeOrderInfoRight extends React.PureComponent {

  onSaleCard=()=>{
    this.props.navigation.navigate('VipcardActivity', {
      type: 'vip',
      member: this.props.route.params.memberInfo,
    });
  }

  render() {
    let showMemberInfo = this.props.route.params.showMemberIcon;
    let prevPage = this.props.route.params.prevPage;
    let currMemberInfo = this.props.route.params.memberInfo;
    let iconType = (this.props.from || '') == 'recharge' ? '0' : '1';

    let ShowCmpt = <View />;
    if (showMemberInfo) {
      ShowCmpt = () => (
        <View style={commonStyles.HeadClientBox}>
          <TouchableHighlight
            // onPress={this.props.route.params.showRightCardPanel}
            underlayColor="transparent"
            style={
              showMemberInfo
                ? commonStyles.HeadClientImgBox
                : commonStyles.hidden
            }
          >
            <View style={commonStyles.HeadClientImgBox}>
              <Image resizeMethod="resize"
                source={require('@imgPath/rotate-portrait.png')}
                style={commonStyles.HeadClientImg}
                resizeMode={'contain'}
              />
            </View>
          </TouchableHighlight>
          {/* <TouchableOpacity style={commonStyles.HeadClientOtherInfo}
            onPress={(iconType!=='recharge'&&prevPage!='pendingOrder')? this.props.route.params.showMemberModal:null}> */}

          <View style={commonStyles.HeadClientOtherInfo}>
            <View style={commonStyles.HeadClientInfo}>
              <View style={commonStyles.HeadClientOtherNameBox}>
                <Text
                  style={commonStyles.HeadClientOtherInfoText}
                  numberOfLines={1} ellipsizeMode={'tail'}
                >
                  {currMemberInfo.name}
                </Text>
              </View>
              <View style={commonStyles.HeadClientOtherSexBox}>
                <Text
                  style={commonStyles.HeadClientOtherInfoText}
                  numberOfLines={1}  ellipsizeMode={'tail'}
                >
                  {currMemberInfo.sex == '0' ? '女' : '男'}
                </Text>
              </View>
            </View>
            <Text style={commonStyles.HeadClientOtherInfoText}>
              {currMemberInfo.phone}
            </Text>
          </View>
          {iconType == '0' ? (
            <TouchableHighlight onPress={this.onSaleCard} >
              <View style={commonStyles.HeadClientCardInfo}>
                <View style={commonStyles.HeadClientCardImgBox}>
                  <Image resizeMethod="resize"
                    source={require('@imgPath/new-card.png')}
                    style={commonStyles.HeadClientCardImg}
                  />
                </View>
                <Text style={commonStyles.HeadClientOtherInfoText}>
                  购买新卡
                </Text>
              </View>
            </TouchableHighlight>
          ) : (
            <TouchableOpacity  onPress={this.props.route.params.showRightCardPanel}>
              <View style={commonStyles.HeadClientCardInfo}>
                <View style={commonStyles.HeadClientCardImgBox}>
                  <Image resizeMethod="resize"
                    source={require('@imgPath/card.png')}
                    style={commonStyles.HeadClientCardImg}
                  />
                </View>
                <Text style={commonStyles.HeadClientOtherInfoText}>
                  会员卡 {currMemberInfo.vipStorageCardList?currMemberInfo.vipStorageCardList.length:'0'} 张
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* 预约信息 */}
          {currMemberInfo.reserveStatus==='0' &&
            <View style={commonStyles.appointmentInfoBox}>
                <Image resizeMethod="resize"
                  source={require('@imgPath/left-dashed.png')}
                  resizeMode={'contain'}
                  style={commonStyles.titleLeftDashed}
                />
                <View style={commonStyles.appointmentInfoBoxO}>
                  <Image resizeMethod="resize"
                    source={require('@imgPath/appointment_img.png')}
                    resizeMode={'contain'}
                    style={commonStyles.titleAppointmentImg}
                  />
                  <Text style={commonStyles.titleAppointmentText}>{currMemberInfo.reserveStaffName} {currMemberInfo.reserveTrueTime}</Text>
                </View>
            </View>
          }
        </View>
      );
    } else {
      ShowCmpt = () => (
        <View style={commonStyles.HeadClientBox}>
          <View style={commonStyles.HeadClientSearchContent}>
            <TouchableOpacity
              onPress={this.props.route.params.showMemberModal}
              style={commonStyles.HeadClientSearchIBox}
            >
              <Image resizeMethod="resize"
                source={require('@imgPath/discern.png')}
                resizeMode={'contain'}
                style={commonStyles.HeadClientSearchIBox}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return <ShowCmpt />;
  }
}
