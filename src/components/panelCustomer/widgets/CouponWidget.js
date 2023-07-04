import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";
import dayjs from "dayjs";
import RenderHtml from 'react-native-render-html';
import {PixelUtil} from "../../../utils";

export const CouponWidget = React.memo(({couponList})=>{
    const CouponItemWidget = React.memo(({itemInfo, index})=>{
        const [isExpand, setIsExpand] = useState(false)
        const couponStatus = itemInfo.couponStatus
        const activityTime = itemInfo.activityTime
        const isActivity = itemInfo.isActivity
        const activityCouponType = itemInfo.activityCouponType
        const activityGiveCouponStatus = itemInfo.activityGiveCouponStatus

        return (
            <View style={PanelCustomerStyles.memberCouponBox}>
                <ImageBackground
                    resizeMode={'contain'}
                    source={couponStatus == '3'
                        ? require('@imgPath/member_panel_coupon_inactive_bg.png')
                        : require('@imgPath/member_panel_coupon_bg.png')}
                    style={PanelCustomerStyles.memberCouponBg}>
                    <View style={PanelCustomerStyles.memberCouponPriceBox}>
                        {/*券金额*/}
                        {
                            itemInfo.couponType == '0' && ( // 现金券
                                <View style={PanelCustomerStyles.memberCouponPriceWrap}>
                                    <Text style={PanelCustomerStyles.memberCouponPriceUnit}>¥</Text>
                                    <Text style={PanelCustomerStyles.memberCouponPrice}>{itemInfo.couponPrice}</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.couponType == '6' && ( // 折扣券
                                <View style={PanelCustomerStyles.memberCouponPriceWrap}>
                                    <Text style={PanelCustomerStyles.memberCouponPrice}>{itemInfo.couponPrice}</Text>
                                    <Text style={PanelCustomerStyles.memberCouponPriceUnit}>折</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.couponType == '7' && ( // 抵扣券
                                <View style={PanelCustomerStyles.memberCouponPriceWrap}>
                                    <Text style={PanelCustomerStyles.memberCouponPrice}>{itemInfo.couponPrice}</Text>
                                    <Text style={PanelCustomerStyles.memberCouponPriceUnit}>次</Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={PanelCustomerStyles.memberCouponDetailBox}>
                        {/*券名称*/}
                        {
                            itemInfo.couponType == '0' && (
                            <View style={PanelCustomerStyles.memberCouponDetailNameBox}>
                                <Text style={PanelCustomerStyles.memberCouponDetailNameTypeXJ}>现金券</Text>
                                <Text
                                    ellipsizeMode={'tail'} numberOfLines={2}
                                    style={PanelCustomerStyles.memberCouponDetailNameText}>
                                    &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{itemInfo.couponName}
                                </Text>
                            </View>)
                        }
                        {
                            itemInfo.couponType == '6' && (
                                <View style={PanelCustomerStyles.memberCouponDetailNameBox}>
                                    <Text style={PanelCustomerStyles.memberCouponDetailNameTypeZK}>折扣券</Text>
                                    <Text
                                        ellipsizeMode={'tail'} numberOfLines={2}
                                        style={PanelCustomerStyles.memberCouponDetailNameText}>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{itemInfo.couponName}
                                    </Text>
                                </View>)
                        }
                        {
                            itemInfo.couponType == '7' && (
                                <View style={PanelCustomerStyles.memberCouponDetailNameBox}>
                                    <Text style={PanelCustomerStyles.memberCouponDetailNameTypeDK}>抵扣券</Text>
                                    <Text
                                        ellipsizeMode={'tail'} numberOfLines={2}
                                        style={PanelCustomerStyles.memberCouponDetailNameText}>
                                        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{itemInfo.couponName}
                                    </Text>
                                </View>)
                        }

                        {/*有效期*/}
                        <Text style={PanelCustomerStyles.memberCouponDetailValidDateTxt}>
                            {
                                (()=>{
                                    if(couponStatus == '3'){ // 优惠券未激活
                                        if(activityTime){
                                            return `激活后${activityTime}天内有效`
                                        }else{
                                            return `有效期：${dayjs(itemInfo.activityStart).format("YYYY-MM-DD")}至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                        }
                                    }else{
                                        if(activityTime){ // 激活后的优惠券
                                            if(isActivity == '1'){ // 是否活动购买优惠券 0否 1是
                                                if(activityCouponType == '0'){ // 0自购 1赠送
                                                    return `有效期：${dayjs(itemInfo.activityStart).format("YYYY-MM-DD")}至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                                }else{
                                                    if(activityGiveCouponStatus == '1'){ //  活动激活状态：0未激活 1激活
                                                        return `有效期至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                                    }else{
                                                        return `激活后${activityTime}天内有效`
                                                    }
                                                }
                                            }else {
                                                return `有效期至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                            }
                                        }else{
                                            return `有效期：${dayjs(itemInfo.activityStart).format("YYYY-MM-DD")}至${dayjs(itemInfo.activityEnd).format("YYYY-MM-DD")}`
                                        }

                                    }
                                })()
                            }

                        </Text>

                        {/*使用说明*/}
                        <View style={PanelCustomerStyles.memberCouponDetailDescBox}>
                            <View style={PanelCustomerStyles.memberCouponDetailDescLeftBox}>
                                {
                                    itemInfo.couponUsedLimitRule &&
                                    (<View style={{display: 'flex', flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                        <Image resizeMethod="resize"
                                                  source={require('@imgPath/member_panel_coupon_tips.png')}
                                                  style={PanelCustomerStyles.memberCouponDetailDescLeftIcon}/>
                                        <Text style={PanelCustomerStyles.memberCouponDetailDescLeftText} ellipsizeMode={'tail'} numberOfLines={1}>
                                            {itemInfo.couponUsedLimitRule}
                                        </Text>
                                    </View>
                                    )
                                }
                            </View>
                            <TouchableOpacity
                                onPress={()=>{setIsExpand(!isExpand)}}
                                style={PanelCustomerStyles.memberCouponDetailDescRightBox}>
                                <Text style={PanelCustomerStyles.memberCouponDetailDescRightText}>
                                    {isExpand ? '收起':'查看详情'}
                                </Text>
                                <Image resizeMode={"contain"}
                                       style={PanelCustomerStyles.memberCouponDetailDescRightIcon}
                                       source={isExpand ? require('@imgPath/member_panel_coupon_up.png') : require('@imgPath/member_panel_coupon_dw.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                {/*展开说明*/}
                {isExpand && (
                    <View style={PanelCustomerStyles.memberCouponRuleBox}>
                        <View style={[PanelCustomerStyles.memberCouponSourceBox]}>
                            <Text style={PanelCustomerStyles.memberCouponSourceTitle}>优惠券码：</Text>
                            <Text style={PanelCustomerStyles.memberCouponSourceValue}>{itemInfo.couponNo.substring(0, 3) + '****'}</Text>
                        </View>
                        {
                            itemInfo.couponResourceName && (
                                <View style={[PanelCustomerStyles.memberCouponSourceBox, PanelCustomerStyles.memberCouponRuleMargin]}>
                                    <Text style={PanelCustomerStyles.memberCouponSourceTitle}>获得来源：</Text>
                                    <Text style={PanelCustomerStyles.memberCouponSourceValue}>{itemInfo.couponResourceName}</Text>
                                </View>
                            )
                        }
                        {
                            itemInfo.couponRule && (
                                <View style={PanelCustomerStyles.memberCouponRuleDetailWrap}>
                                    <Text style={PanelCustomerStyles.memberCouponSourceTitle}>使用规则：</Text>
                                    <View style={PanelCustomerStyles.memberCouponRuleDetailValue}>
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
