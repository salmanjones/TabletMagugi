import React, {useState} from "react";
import {FlatList, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"
import {getImage, ImageQutity, PixelUtil} from "../../../utils";
import {cashierBillingStyle} from "../../../styles";

export default React.memo(({reserveInfo, reserveFlag, customerIndex, checkCustomerEvent}) => {
    // 呈现
    const dataArray = reserveFlag == 'valid' ? reserveInfo['staffNowReseverList']:reserveInfo['staffPassReseverList']

    // 选中事件
    const checkCustomerHandle = React.useCallback((idx)=>{
        checkCustomerEvent(idx)
    })

    // 取消预约
    const cancelReserveHandle = (id) => {
        console.log("reserveId", id)
    }

    const Item = React.memo(({itemInfo, index, clickItem}) => {
        return (
            <View style={ReserveBoardStyles.reserveCustomersWrap}>
                <View style={ReserveBoardStyles.reserveCustomersBox}>
                    {/*时间展示*/}
                    <View style={ReserveBoardStyles.reserveCustomerTimersBox}>
                        {/*时间icon*/}
                        <Image
                            style={itemInfo.reserveStatus == '1' ? ReserveBoardStyles.reserveTimerRecent : ReserveBoardStyles.reserveTimerPass}
                            resizeMethod="resize"
                            source={itemInfo.reserveStatus == '1' ? require('@imgPath/reserve_recent_flag.png') : require('@imgPath/reserve_wait_flag.png')}/>
                        {/*时间*/}
                        <Text style={itemInfo.reserveStatus == '1' ? ReserveBoardStyles.reserveCustomerTimerRecentTxt: ReserveBoardStyles.reserveCustomerTimerWaitTxt}>
                            {itemInfo.reserveTime}
                        </Text>
                        {/*提示*/}
                        {
                            itemInfo.reserveStatus == '1' && (itemInfo.resverInfoList && itemInfo.resverInfoList.length > 0) && (
                                <View style={ReserveBoardStyles.reserveCustomerRecentTips}>
                                    <Text style={ReserveBoardStyles.reserveCustomerRecentTipsTxt}>即将到店</Text>
                                </View>
                            )
                        }
                    </View>
                    {/*预约顾客列表*/}
                    {
                        itemInfo.resverInfoList && itemInfo.resverInfoList.length > 0 && (
                            <View style={itemInfo.reserveStatus == '1' ? ReserveBoardStyles.reserveCustomerListRecentWrap:ReserveBoardStyles.reserveCustomerListWaitWrap}>
                                {
                                    itemInfo.resverInfoList.map((customer, idx)=>{
                                        // 全局索引
                                        const globalIndex = index + '-' + idx

                                        // 样式
                                        const cardStyle = []

                                        // 中间元素
                                        const isMiddleWidget = (idx + 2) % 3 == 0
                                        if(isMiddleWidget){
                                            cardStyle.push(ReserveBoardStyles.reserveCustomerDetailMiddleBox)
                                        }else{
                                            cardStyle.push(ReserveBoardStyles.reserveCustomerDetailBox)
                                        }

                                        if(itemInfo.resverInfoList.length > 3){
                                            cardStyle.push({marginBottom: PixelUtil.size(30)})
                                        }

                                        // 是否选中
                                        const isCheck = customerIndex == globalIndex
                                        if(isCheck){
                                            cardStyle.push({
                                                borderWidth: PixelUtil.size(4),
                                                borderStyle: 'solid',
                                                borderColor: '#FFDA99'
                                            })
                                        }

                                        // 是否过期预约
                                        if(reserveFlag != 'valid'){
                                            cardStyle.push({opacity: 0.8})
                                        }

                                        return (
                                            <TouchableOpacity
                                                style={ReserveBoardStyles.reserveCustomerDetailWrap}
                                                onPress={()=>{clickItem(globalIndex)}}>
                                                {/*预约卡片*/}
                                                <ImageBackground
                                                    resizeMode={"stretch"}
                                                    style={cardStyle}
                                                    source={reserveFlag == 'valid'
                                                        ? customer.isMember == '1' ? require('@imgPath/reserve_customer_detail_bg.png'):require('@imgPath/reserve_customer_detail_person_bg.png') // 有效预约
                                                        : customer.isMember == '1' ? require('@imgPath/reserve_customer_detail_invalid_bg.png'):require('@imgPath/reserve_customer_detail_person_bg.png') // 无效预约
                                                    }>
                                                    {/*取消预约*/}
                                                    <TouchableOpacity
                                                        style={ReserveBoardStyles.reserveCustomerDelIconBox}
                                                        onPress={()=>{cancelReserveHandle(customer.reserveId)}}>
                                                        <Image style={ReserveBoardStyles.reserveCustomerDelIcon}
                                                               resizeMode={'contain'}
                                                               source={customer.isMember == '1'
                                                                   ? require('@imgPath/reserve_customer_detail_del.png') // 有档案
                                                                   : require('@imgPath/reserve_customer_detail_del_bl.png') // 无档案
                                                        }/>
                                                    </TouchableOpacity>
                                                    {/*个人信息*/}
                                                    <Image
                                                        style={ReserveBoardStyles.reserveCustomerAvatar}
                                                        resizeMethod="resize"
                                                        source={getImage(customer.appUserImg, ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                                        defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                                                    <View style={ReserveBoardStyles.reserveCustomerInfo}>
                                                        <View style={
                                                            customer.appUserPhoneShow && customer.appUserPhoneShow.length > 0
                                                            ? ReserveBoardStyles.reserveCustomerNameBox
                                                            : ReserveBoardStyles.reserveCustomerNameNoPhoneBox}>
                                                            {/*姓名*/}
                                                            <Text ellipsizeMode={'tail'} numberOfLines={1}
                                                                  style={customer.isMember == '1'
                                                                      ? ReserveBoardStyles.reserveCustomerNameTxt // 有档案
                                                                      : [ReserveBoardStyles.reserveCustomerNameTxt, ReserveBoardStyles.reserveCustomerBlackTxt]  // 无档案
                                                            }>
                                                                {decodeURIComponent(customer.appUserName)}
                                                            </Text>
                                                            {/*男女*/}
                                                            <Image
                                                                style={ReserveBoardStyles.reserveCustomerSexIcon}
                                                                resizeMode={'contain'}
                                                                source={customer.appUserSex == '1' ? require('@imgPath/reserve_customer_detail_fmale.png') : require('@imgPath/reserve_customer_detail_male.png')}/>
                                                            {/*企微*/}
                                                            {
                                                                customer.isWechatMember == '1' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerSexIcon}
                                                                        resizeMode={'contain'}
                                                                        source={require('@imgPath/reserve_customer_detail_wecom.png')}/>
                                                                )
                                                            }
                                                        </View>
                                                        {/*手机号码*/}
                                                        {
                                                            customer.appUserPhoneShow && customer.appUserPhoneShow.length > 0 && (
                                                                <View style={ReserveBoardStyles.reserveCustomerPhoneBox}>
                                                                    <Text style={customer.isMember == '1'
                                                                        ? ReserveBoardStyles.reserveCustomerPhoneText // 有档案
                                                                        : [ReserveBoardStyles.reserveCustomerPhoneText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                    }>
                                                                        {customer.appUserPhoneShow}
                                                                    </Text>
                                                                </View>
                                                            )
                                                        }
                                                        {/*预约类型*/}
                                                        <View style={customer.appUserPhoneShow && customer.appUserPhoneShow.length > 0
                                                            ? ReserveBoardStyles.reserveCustomerTypeBox
                                                            : ReserveBoardStyles.reserveCustomerTypeNoPhoneBox
                                                        }>
                                                            {/*剪发*/}
                                                            {
                                                                customer.reserveCateName == '剪发' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                                        resizeMode={'contain'}
                                                                        source={customer.isMember == '1'
                                                                            ? require('@imgPath/reserve_customer_type_jianfa_wt.png') // 有档案
                                                                            : require('@imgPath/reserve_customer_type_jianfa_bl.png') // 无档案
                                                                    }/>
                                                                )
                                                            }
                                                            {
                                                                customer.reserveCateName == '剪发' && (
                                                                    <Text
                                                                        style={customer.isMember == '1'
                                                                            ? ReserveBoardStyles.reserveCustomerTypeText // 有档案
                                                                            : [ReserveBoardStyles.reserveCustomerTypeText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                    }>
                                                                        剪发
                                                                    </Text>
                                                                )
                                                            }
                                                            {/*烫发*/}
                                                            {
                                                                customer.reserveCateName == '烫发' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                                        resizeMode={'contain'}
                                                                        source={customer.isMember == '1'
                                                                            ? require('@imgPath/reserve_customer_type_tangfa_wt.png') // 有档案
                                                                            : require('@imgPath/reserve_customer_type_tangfa_bl.png') // 无档案
                                                                        }/>
                                                                )
                                                            }
                                                            {
                                                                customer.reserveCateName == '烫发' && (
                                                                    <Text
                                                                        style={customer.isMember == '1'
                                                                            ? ReserveBoardStyles.reserveCustomerTypeText // 有档案
                                                                            : [ReserveBoardStyles.reserveCustomerTypeText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                        }>
                                                                        烫发
                                                                    </Text>
                                                                )
                                                            }
                                                            {/*染发*/}
                                                            {
                                                                customer.reserveCateName == '染发' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                                        resizeMode={'contain'}
                                                                        source={customer.isMember == '1'
                                                                            ? require('@imgPath/reserve_customer_type_ranfa_wt.png') // 有档案
                                                                            : require('@imgPath/reserve_customer_type_ranfa_bl.png') // 无档案
                                                                        }/>
                                                                )
                                                            }
                                                            {
                                                                customer.reserveCateName == '染发' && (
                                                                    <Text
                                                                        style={customer.isMember == '1'
                                                                            ? ReserveBoardStyles.reserveCustomerTypeText // 有档案
                                                                            : [ReserveBoardStyles.reserveCustomerTypeText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                        }>
                                                                        染发
                                                                    </Text>
                                                                )
                                                            }
                                                            {/*护理*/}
                                                            {
                                                                customer.reserveCateName == '护理' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                                        resizeMode={'contain'}
                                                                        source={customer.isMember == '1'
                                                                            ? require('@imgPath/reserve_customer_type_huli_wt.png') // 有档案
                                                                            : require('@imgPath/reserve_customer_type_huli_bl.png') // 无档案
                                                                        }/>
                                                                )
                                                            }
                                                            {
                                                                customer.reserveCateName == '护理' && (
                                                                    <Text
                                                                        style={customer.isMember == '1'
                                                                            ? ReserveBoardStyles.reserveCustomerTypeText // 有档案
                                                                            : [ReserveBoardStyles.reserveCustomerTypeText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                        }>
                                                                        护理
                                                                    </Text>
                                                                )
                                                            }
                                                            {/*造型*/}
                                                            {
                                                                customer.reserveCateName == '造型' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                                        resizeMode={'contain'}
                                                                        source={customer.isMember == '1'
                                                                            ? require('@imgPath/reserve_customer_type_zaoxing_wt.png') // 有档案
                                                                            : require('@imgPath/reserve_customer_type_zaoxing_bl.png') // 无档案
                                                                        }/>
                                                                )
                                                            }
                                                            {
                                                                customer.reserveCateName == '造型' && (
                                                                    <Text
                                                                        style={customer.isMember == '1'
                                                                            ? ReserveBoardStyles.reserveCustomerTypeText // 有档案
                                                                            : [ReserveBoardStyles.reserveCustomerTypeText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                        }>
                                                                        造型
                                                                    </Text>
                                                                )
                                                            }
                                                            {/*造型*/}
                                                            {
                                                                customer.reserveCateName == '洗吹' && (
                                                                    <Image
                                                                        style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                                        resizeMode={'contain'}
                                                                        source={customer.isMember == '1'
                                                                            ? require('@imgPath/reserve_customer_type_zaoxing_wt.png') // 有档案
                                                                            : require('@imgPath/reserve_customer_type_zaoxing_bl.png') // 无档案
                                                                        }/>
                                                                )
                                                            }
                                                            {
                                                                customer.reserveCateName == '洗吹' && (
                                                                    <Text
                                                                        style={customer.isMember == '1'
                                                                            ? ReserveBoardStyles.reserveCustomerTypeText // 有档案
                                                                            : [ReserveBoardStyles.reserveCustomerTypeText, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                        }>
                                                                        洗吹
                                                                    </Text>
                                                                )
                                                            }
                                                            <View style={customer.isMember == '1'
                                                                    ? ReserveBoardStyles.reserveCustomerTypeSplit // 有档案
                                                                    : ReserveBoardStyles.reserveCustomerTypeSplitBlack // 无档案
                                                            }></View>
                                                            <Text
                                                                style={customer.isMember == '1'
                                                                    ? ReserveBoardStyles.reserveCustomerTypeStaff // 有档案
                                                                    : [ReserveBoardStyles.reserveCustomerTypeStaff, ReserveBoardStyles.reserveCustomerBlackTxt] // 无档案
                                                                }>
                                                                {customer.reserveStaffName}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    }
                </View>
            </View>
        )
    })

    return (
        <FlatList
            data={dataArray}
            renderItem={
                ({item, index}) => {
                    return <Item itemInfo={item} index={index} clickItem={checkCustomerHandle}/>
                }
            }
            keyExtractor={item => item.reserveTime}/>
    )
})
