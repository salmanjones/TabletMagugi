import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {MemberPanelStyles} from "../../../styles/MemberPanel";
import dayjs from "dayjs";
import RenderHtml from 'react-native-render-html';
import {PixelUtil} from "../../../utils";

export const CouponWidget = React.memo(({couponList})=>{
    const CouponItemWidget = React.memo(({itemInfo, index})=>{
        const [isExpand, setIsExpand] = useState(false)
        const couponStatus = itemInfo.couponStatus
        const activityTime = itemInfo.activityTime

        return (
            <View style={MemberPanelStyles.memberCouponBox}>
                <ImageBackground
                    resizeMode={'contain'}
                    source={couponStatus == '3'
                        ? require('@imgPath/member_panel_coupon_inactive_bg.png')
                        : require('@imgPath/member_panel_coupon_bg.png')}
                    style={MemberPanelStyles.memberCouponBg}>
                    <View style={MemberPanelStyles.memberCouponPriceBox}>
                        {/*券金额*/}
                        {
                            itemInfo.couponType == '0' && ( // 现金券
                                <View style={MemberPanelStyles.memberCouponPriceWrap}>
                                    <Text style={MemberPanelStyles.memberCouponPriceUnit}>¥</Text>
                                    <Text style={MemberPanelStyles.memberCouponPrice}>{itemInfo.couponPrice}</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.couponType == '6' && ( // 折扣券
                                <View style={MemberPanelStyles.memberCouponPriceWrap}>
                                    <Text style={MemberPanelStyles.memberCouponPrice}>{itemInfo.couponPrice}</Text>
                                    <Text style={MemberPanelStyles.memberCouponPriceUnit}>折</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.couponType == '7' && ( // 抵扣券
                                <View style={MemberPanelStyles.memberCouponPriceWrap}>
                                    <Text style={MemberPanelStyles.memberCouponPrice}>{itemInfo.couponPrice}</Text>
                                    <Text style={MemberPanelStyles.memberCouponPriceUnit}>次</Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={MemberPanelStyles.memberCouponDetailBox}>
                        {/*券名称*/}
                        {
                            itemInfo.couponType == '0' && (
                            <View style={MemberPanelStyles.memberCouponDetailNameBox}>
                                <Text style={MemberPanelStyles.memberCouponDetailNameTypeXJ}>现金券</Text>
                                <Text
                                    ellipsizeMode={'tail'} numberOfLines={2}
                                    style={MemberPanelStyles.memberCouponDetailNameText}>
                                    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{itemInfo.couponName}
                                </Text>
                            </View>)
                        }
                        {
                            itemInfo.couponType == '6' && (
                                <View style={MemberPanelStyles.memberCouponDetailNameBox}>
                                    <Text style={MemberPanelStyles.memberCouponDetailNameTypeZK}>折扣券</Text>
                                    <Text
                                        ellipsizeMode={'tail'} numberOfLines={2}
                                        style={MemberPanelStyles.memberCouponDetailNameText}>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{itemInfo.couponName}
                                    </Text>
                                </View>)
                        }
                        {
                            itemInfo.couponType == '7' && (
                                <View style={MemberPanelStyles.memberCouponDetailNameBox}>
                                    <Text style={MemberPanelStyles.memberCouponDetailNameTypeDK}>抵扣券</Text>
                                    <Text
                                        ellipsizeMode={'tail'} numberOfLines={2}
                                        style={MemberPanelStyles.memberCouponDetailNameText}>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{itemInfo.couponName}
                                    </Text>
                                </View>)
                        }

                        {/*有效期*/}
                        <Text style={MemberPanelStyles.memberCouponDetailValidDateTxt}>
                            {
                                (()=>{
                                    if(couponStatus == '3'){
                                        if(activityTime){
                                            return `激活后${activityTime}天内有效`
                                        }else{
                                            return `有效期：${dayjs(itemInfo.activityStart).format("YYYY-MM-DD")}至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                        }
                                    }else{
                                        return `有效期：${dayjs(itemInfo.activityStart).format("YYYY-MM-DD")}至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                    }
                                })()
                            }

                        </Text>

                        {/*使用说明*/}
                        <View style={MemberPanelStyles.memberCouponDetailDescBox}>
                            <View style={MemberPanelStyles.memberCouponDetailDescLeftBox}>
                                {
                                    itemInfo.couponUsedLimitRule &&
                                    (<View style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                        <Image resizeMethod="resize"
                                                  source={require('@imgPath/member_panel_coupon_tips.png')}
                                                  style={MemberPanelStyles.memberCouponDetailDescLeftIcon}/>
                                        <Text style={MemberPanelStyles.memberCouponDetailDescLeftText} ellipsizeMode={'tail'} numberOfLines={1}>
                                            {itemInfo.couponUsedLimitRule}
                                        </Text>
                                    </View>
                                    )
                                }
                            </View>
                            <TouchableOpacity
                                onPress={()=>{setIsExpand(!isExpand)}}
                                style={MemberPanelStyles.memberCouponDetailDescRightBox}>
                                <Text style={MemberPanelStyles.memberCouponDetailDescRightText}>
                                    {isExpand ? '收起':'查看详情'}
                                </Text>
                                <Image resizeMode={"contain"}
                                       style={MemberPanelStyles.memberCouponDetailDescRightIcon}
                                       source={isExpand ? require('@imgPath/member_panel_coupon_up.png') : require('@imgPath/member_panel_coupon_dw.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                {/*展开说明*/}
                {isExpand && (
                    <View style={MemberPanelStyles.memberCouponRuleBox}>
                        <View style={[MemberPanelStyles.memberCouponSourceBox]}>
                            <Text style={MemberPanelStyles.memberCouponSourceTitle}>优惠券码：</Text>
                            <Text style={MemberPanelStyles.memberCouponSourceValue}>{itemInfo.couponNo.substring(0, 3) + '****'}</Text>
                        </View>
                        {
                            itemInfo.couponResourceName && (
                                <View style={[MemberPanelStyles.memberCouponSourceBox, MemberPanelStyles.memberCouponRuleMargin]}>
                                    <Text style={MemberPanelStyles.memberCouponSourceTitle}>获得来源：</Text>
                                    <Text style={MemberPanelStyles.memberCouponSourceValue}>{itemInfo.couponResourceName}</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.couponRule && (
                                <View style={MemberPanelStyles.memberCouponRuleDetailWrap}>
                                    <Text style={MemberPanelStyles.memberCouponSourceTitle}>使用规则：</Text>
                                    <View style={MemberPanelStyles.memberCouponRuleDetailValue}>
                                        <RenderHtml
                                            contentWidth={PixelUtil.size(704)}
                                            source={{html: itemInfo.couponRule}}/>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                )}

            </View>
        )
    })

    return (
        <FlatList
            data={couponList}
            renderItem={
                ({item, index}) => {
                    return <CouponItemWidget itemInfo={item} index={index}/>
                }
            }
            keyExtractor={item=>{
                return item.couponId
            }}
        />
    )
})
