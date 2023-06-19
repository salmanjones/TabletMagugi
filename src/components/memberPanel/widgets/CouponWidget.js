import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {MemberPanelStyles} from "../../../styles/MemberPanel";

export const CouponWidget = React.memo(({couponArray})=>{

    const CouponItemWidget = React.memo(({itemInfo, index})=>{
        const [isExpand, setIsExpand] = useState(false)
        const mockDesc = `1.该券仅适用于线下门店剪发项目。不可抵用其他项目。
2.该券支持线下门店升级至资深设计师/创意总监剪发，因需升级产生差价部分由用户自行支付。具体详情请到店咨询。
3该券为单次券，自购买日起计算，有效期90天，逾期作废。
4.该券单笔消费限使用一张，不可叠加使用，用券部分不参加其他活动。
5.该券限线下门店一次性消费，不参与打折、不找零、不兑换现金、不可转赠、不开具发票。
6.在法律允许范围内，美界MAGI保留最终解释权`
        return (
            <View style={MemberPanelStyles.memberCouponBox}>
                <ImageBackground
                    resizeMode={'contain'}
                    source={require('@imgPath/member_panel_coupon_bg.png')}
                    style={MemberPanelStyles.memberCouponBg}>
                    <View style={MemberPanelStyles.memberCouponPriceBox}>
                        {/*券金额*/}
                        {
                            itemInfo.type == '1' && (
                                <View style={MemberPanelStyles.memberCouponPriceWrap}>
                                    <Text style={MemberPanelStyles.memberCouponPriceUnit}>¥</Text>
                                    <Text style={MemberPanelStyles.memberCouponPrice}>400.00</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.type == '2' && (
                                <View style={MemberPanelStyles.memberCouponPriceWrap}>
                                    <Text style={MemberPanelStyles.memberCouponPrice}>9.5</Text>
                                    <Text style={MemberPanelStyles.memberCouponPriceUnit}>折</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.type == '3' && (
                                <View style={MemberPanelStyles.memberCouponPriceWrap}>
                                    <Text style={MemberPanelStyles.memberCouponPrice}>5</Text>
                                    <Text style={MemberPanelStyles.memberCouponPriceUnit}>次</Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={MemberPanelStyles.memberCouponDetailBox}>
                        {/*券名称*/}
                        {
                            itemInfo.type == '1' && (
                            <View style={MemberPanelStyles.memberCouponDetailNameBox}>
                                <Text style={MemberPanelStyles.memberCouponDetailNameTypeXJ}>现金券</Text>
                                <Text
                                    ellipsizeMode={'tail'} numberOfLines={2}
                                    style={MemberPanelStyles.memberCouponDetailNameText}>
                                    &emsp;&emsp;&emsp;&emsp;&emsp;{'长江潮音乐节专享长江潮音乐节专享长江潮音乐节专享'}
                                </Text>
                            </View>)
                        }
                        {
                            itemInfo.type == '2' && (
                                <View style={MemberPanelStyles.memberCouponDetailNameBox}>
                                    <Text style={MemberPanelStyles.memberCouponDetailNameTypeZK}>折扣券</Text>
                                    <Text
                                        ellipsizeMode={'tail'} numberOfLines={2}
                                        style={MemberPanelStyles.memberCouponDetailNameText}>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;{'长江潮音乐节专享长江潮音乐节专享长江潮音乐节专享'}
                                    </Text>
                                </View>)
                        }
                        {
                            itemInfo.type == '3' && (
                                <View style={MemberPanelStyles.memberCouponDetailNameBox}>
                                    <Text style={MemberPanelStyles.memberCouponDetailNameTypeDK}>抵扣券</Text>
                                    <Text
                                        ellipsizeMode={'tail'} numberOfLines={2}
                                        style={MemberPanelStyles.memberCouponDetailNameText}>
                                        &emsp;&emsp;&emsp;&emsp;&emsp;{'长江潮音乐节专享长江潮音乐节专享长江潮音乐节专享'}
                                    </Text>
                                </View>)
                        }

                        {/*有效期*/}
                        <Text style={MemberPanelStyles.memberCouponDetailValidDateTxt}>
                            有效期：2022.07.14至2022.08.14
                        </Text>

                        {/*使用说明*/}
                        <View style={MemberPanelStyles.memberCouponDetailDescBox}>
                            <View style={MemberPanelStyles.memberCouponDetailDescLeftBox}>
                                <Image resizeMethod="resize"
                                       source={require('@imgPath/member_panel_coupon_tips.png')}
                                       style={MemberPanelStyles.memberCouponDetailDescLeftIcon}/>
                                <Text style={MemberPanelStyles.memberCouponDetailDescLeftText}>
                                    仅烫染类项目专用仅烫染类项目专用仅烫染类
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{setIsExpand(!isExpand)}}
                                style={MemberPanelStyles.memberCouponDetailDescRightBox}>
                                <Text style={MemberPanelStyles.memberCouponDetailDescRightText}>
                                    查看详情
                                <Image resizeMode={"contain"}
                                       source={isExpand ? require('@imgPath/member_panel_coupon_up.png') : require('@imgPath/member_panel_coupon_dw.png')}
                                       style={MemberPanelStyles.memberCouponDetailDescRightIcon}/>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                {/*展开说明*/}
                {isExpand && (
                    <View style={MemberPanelStyles.memberCouponRuleBox}>
                        <View style={MemberPanelStyles.memberCouponSourceBox}>
                            <Text style={MemberPanelStyles.memberCouponSourceTitle}>获得来源：</Text>
                            <Text style={MemberPanelStyles.memberCouponSourceValue}>兔年升值券</Text>
                        </View>
                        <View style={[MemberPanelStyles.memberCouponSourceBox, MemberPanelStyles.memberCouponRuleMargin]}>
                            <Text style={MemberPanelStyles.memberCouponSourceTitle}>优惠券码：</Text>
                            <Text style={MemberPanelStyles.memberCouponSourceValue}>ZPX VY6 H1L</Text>
                        </View>
                        <View style={MemberPanelStyles.memberCouponRuleDetailWrap}>
                            <Text style={MemberPanelStyles.memberCouponSourceTitle}>使用规则：</Text>
                            <TextInput
                                style={MemberPanelStyles.memberCouponRuleDetailValue}
                                editable={false}
                                multiline={true}
                                textAlignVertical={'top'}
                                textAlign={'left'}
                                value={mockDesc}>
                            </TextInput>
                        </View>
                    </View>
                )}

            </View>
        )
    })

    return (
        <FlatList
            data={couponArray}
            renderItem={
                ({item, index}) => {
                    return <CouponItemWidget itemInfo={item} index={index}/>
                }
            }
            keyExtractor={item=>item.id}
        />
    )
})
