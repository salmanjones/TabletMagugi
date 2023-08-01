import React from 'react';
import {RechargeStoredCardStyles} from '../../styles';
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {AppNavigate} from "../../navigators";
import {getMemberDetail} from '../../services/reserve'
import {decodeContent, getImage, ImageQutity} from "../../utils";

export class VipUserInfoComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        const paramsprop = props.showMember
        this.state = {
            ckCount: 0,
            czkCount: 0,
            czkPriceSum: 0,
            name: paramsprop.params.member.name,
            sex: paramsprop.params.member.sex,
            phone: paramsprop.params.member.phone,
            memberCardNo: paramsprop.params.member.memberCardNo,
            isWechatMember: '',
            member: '',
        }
    }

    componentDidMount() {
        const memberid = this.props.showMember.params.member.id
        if (memberid) {
            getMemberDetail({
                memberId: memberid,
            }).then(res => {
                const {code, data} = res
                if (code === '6000') {
                    const datasource = res.data
                    this.setState({
                        ckCount: datasource.ckCount,
                        czkCount: datasource.czkCount,
                        czkPriceSum: datasource.czkPriceSum,
                        name: datasource.nickName,
                        sex: datasource.sex,
                        phone: datasource.phoneShow,
                        isWechatMember: data.isWechatMember
                    })
                }

            })
        }
    }

    bankcard = (data) => {
        AppNavigate.navigate('VipcardActivity', {
            type: 'vip',
            member: data,
        })
    }

    render() {
        const {ckCount, czkCount, czkPriceSum, name, sex, phone, memberCardNo, imgUrl, isWechatMember} = this.state
        return (
            <View style={{width: '100%'}}>
                <ImageBackground resizeMethod="resize" source={require('@imgPath/store_bg.png')} style={RechargeStoredCardStyles.userbg}>
                    {/*会员编号*/}
                    <ImageBackground
                        resizeMethod="resize" source={require('@imgPath/cardNo_bg.png')}
                        style={RechargeStoredCardStyles.cardNoImg}>
                        <Text style={RechargeStoredCardStyles.cardNo}>·{memberCardNo}</Text>
                    </ImageBackground>
                    {/*个人信息*/}
                    <View style={RechargeStoredCardStyles.carduserInfo}>
                        {/*左侧用户信息*/}
                        <View style={RechargeStoredCardStyles.cardUserLeft}>
                            <Image
                                style={RechargeStoredCardStyles.avaterIamge}
                                resizeMethod="resize"
                                source={getImage(imgUrl, ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                            <View style={RechargeStoredCardStyles.avaterInfo}>
                                <View style={RechargeStoredCardStyles.avaterInfotop}>
                                    <Text style={RechargeStoredCardStyles.usertitleText} numberOfLines={1} ß
                                          ellipsizeMode={'tail'}>{decodeContent(name == '' ? '未填写姓名' : name)}</Text>
                                    <Image resizeMethod="resize" style={RechargeStoredCardStyles.avaterlogo}
                                           source={sex == 0 ? require('@imgPath/female.png') : require('@imgPath/vipavater.png')}></Image>
                                    {/*<Text style={RechargeStoredCardStyles.sexText}>{sex == 0 ? '女' : '男'}</Text>*/}
                                    <Image resizeMethod="resize"
                                           source={isWechatMember == 1 ? require('@imgPath/vipqiye.png') : (isWechatMember == 2 ? require('@imgPath/noselect.png') : require('@imgPath/quesheng.png'))}
                                           style={RechargeStoredCardStyles.avaterlogo}></Image>
                                </View>
                                <Text style={RechargeStoredCardStyles.phoneText}>{phone || '暂无'}</Text>
                            </View>
                        </View>
                        {/*nav*/}
                        <View style={RechargeStoredCardStyles.storeInfo}>
                            <View
                                style={this.props.showBtn == false ? RechargeStoredCardStyles.threeCard : RechargeStoredCardStyles.secondCard}>
                                <Text style={RechargeStoredCardStyles.storeNameCard}>储值卡</Text>
                                <Text style={RechargeStoredCardStyles.storeNumberCard}>{czkCount}张</Text>
                            </View>
                            <View
                                style={this.props.showBtn == false ? RechargeStoredCardStyles.threeCard : RechargeStoredCardStyles.secondCard}>
                                <Text style={RechargeStoredCardStyles.storeNameCard}>次卡</Text>
                                <Text style={RechargeStoredCardStyles.storeNumberCard}>{ckCount}张</Text>
                            </View>
                            <View
                                style={this.props.showBtn == false ? RechargeStoredCardStyles.threeCard : RechargeStoredCardStyles.secondCard}>
                                <Text style={RechargeStoredCardStyles.storeNameCard}>储值卡余额</Text>
                                <Text style={RechargeStoredCardStyles.storeNumberCard}>¥{czkPriceSum}</Text>
                            </View>
                            {
                                this.props.showBtn && (
                                    <TouchableOpacity
                                        style={RechargeStoredCardStyles.application}
                                        onPress={() => {
                                            this.bankcard(this.props.showMember.params.member)
                                        }}
                                    >
                                        <Image resizeMethod="resize" source={require('@imgPath/application.png')}
                                               style={RechargeStoredCardStyles.appliimg}></Image>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        {/*<View style={RechargeStoredCardStyles.reservation}>*/}
                        {/*    <Text style={RechargeStoredCardStyles.reservationText}>预约</Text>*/}
                        {/*    <Text style={RechargeStoredCardStyles.reservationText}>王泽</Text>*/}
                        {/*</View>*/}
                    </View>
                </ImageBackground>

            </View>
        )
    }
}


