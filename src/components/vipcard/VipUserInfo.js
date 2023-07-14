import React from 'react';
import {RechargeStoredCardStyles} from '../../styles';
import {connect} from "react-redux";
import {View, Text, Image, TouchableOpacity, InteractionManager, ImageBackground} from "react-native";
import {PixelUtil} from "../../utils";
import {AppNavigate} from "../../navigators";
import {getCustomerDetail} from '../../services/reserve'
const pageCache = {
    checkReserveId: '', // 选中的预约id
    checkAppUserId: '' // 选中的app表用户Id
}

 export class VipUserInfoComponent extends React.PureComponent{

     constructor(props) {
         super(props);
         const paramsprop = props.showMember
         this.state={
             ckCount:0,
             czkCount:0,
             czkPriceSum:0,
             name:paramsprop.params.member.name,
             sex:paramsprop.params.member.sex,
             phone:paramsprop.params.member.phone,
             memberCardNo:paramsprop.params.member.memberCardNo
         }
     }

     componentDidMount(){
         const memberid = this.props.showMember.params.member.id
         console.log(memberid,'men')
         if(memberid){
             getCustomerDetail({
                 memberId:memberid,
             }).then(res=>{
                 console.log(res)
                 const {code,data}=res
                 if(code === '6000'){
                     const datasource = res.data
                     this.setState({ckCount:datasource.ckCount,czkCount:datasource.czkCount,czkPriceSum:datasource.czkPriceSum,name:datasource.nickName,sex:datasource.sex,phone:datasource.isWechatMember})
                 }

             })
         }
     }

     bankcard=(member)=>{
         AppNavigate.navigate('VipcardActivity', {
             type: 'vip',
             member: member,
         })
     }

    render() {
         const {ckCount,czkCount,czkPriceSum,name,sex,phone,memberCardNo} =this.state
        return(

            <View style={{width:'100%'}}>
                <ImageBackground resizeMethod="resize" source={require('@imgPath/userinfo_bg.png')} style={RechargeStoredCardStyles.userbg}>
                    <Text style={RechargeStoredCardStyles.cardNo}>{memberCardNo}</Text>
                    {/*nav中间个人信息*/}
                    <View style={RechargeStoredCardStyles.carduserInfo}>
                        <View style={RechargeStoredCardStyles.cardUserLeft}>
                            <Image resizeMethod="resize" source={require('@imgPath/avater.jpg')} style={RechargeStoredCardStyles.avaterIamge}></Image>
                            <View style={RechargeStoredCardStyles.avaterInfo}>
                                <View style={RechargeStoredCardStyles.avaterInfotop}>
                                    <Text style={RechargeStoredCardStyles.usertitleText} numberOfLines={1}
                                          ellipsizeMode={'tail'}>{decodeURIComponent(name)}</Text>
                                    <Image resizeMethod="resize" style={RechargeStoredCardStyles.avaterlogo} source={require('@imgPath/vipavater.png')}></Image>
                                    <Text style={RechargeStoredCardStyles.sexText}>{sex == 0?'女':'男'}</Text>
                                    <Image resizeMethod="resize" source={require('@imgPath/vipqiye.png')} style={RechargeStoredCardStyles.avaterlogo}></Image>
                                </View>
                                <Text style={RechargeStoredCardStyles.phoneText}>{phone}</Text>
                            </View>
                        </View>
                        <View style={RechargeStoredCardStyles.storeInfo}>
                            <View style={RechargeStoredCardStyles.storeCard}>
                                <Text style={RechargeStoredCardStyles.storeNameCard}>储值卡</Text>
                                <Text style={RechargeStoredCardStyles.storeNumberCard}>{czkCount}张</Text>
                            </View>
                            <View style={RechargeStoredCardStyles.secondCard}>
                                <Text style={RechargeStoredCardStyles.storeNameCard}>次卡</Text>
                                <Text style={RechargeStoredCardStyles.storeNumberCard}>{ckCount}张</Text>
                            </View>
                            <View style={RechargeStoredCardStyles.secondCard}>
                                <Text style={RechargeStoredCardStyles.storeNameCard}>储值卡余额</Text>
                                <Text style={RechargeStoredCardStyles.storeNumberCard}>¥{czkPriceSum}</Text>
                            </View>
                        </View>
                    </View>
                    {
                        this.props.showBtn && (
                            <TouchableOpacity  onPress={()=>{this.bankcard()}}>
                                <Text style={RechargeStoredCardStyles.application}>
                                    <Image resizeMethod="resize" source={require('@imgPath/application.png')}
                                           style={RechargeStoredCardStyles.appliimg}></Image>
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                </ImageBackground>

            </View>
        )
    }
}


