import React, {useState} from "react";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard";
import {decodeContent, getImage, ImageQutity, PixelUtil} from "../../../utils";

/**
 * isReseve 0 占用与预约按钮都可用
 * isReseve 1 有顾客预约
 * isReseve 2 仅可预约按钮
 * isReseve 3 已占用
 */

// 顾客预约列表
export default React.memo(({
                               reserveInfoArray,
                               reserveStatus,
                               timeIndex,
                               canCancel,
                               reserveTime,
                               staffId,
                               reserveFlag,
                               customerCardEvent
                           }) => {
    const [checkCustomerIndex, setCheckCustomerIndex] = useState('')
    const [timerReserveList, setTimerReserveList] = useState(reserveInfoArray)

    // 命中处理
    const checkedCustomerHandle = React.useCallback((idx) => {
            setCheckCustomerIndex(idx)
        }, []
    )

    // 处理点击事件
    const customerClickEvent = (type, extra) => {
        customerCardEvent(type, extra)
    }

    if (reserveInfoArray.length > 0) {
        return (
            <View
                style={reserveStatus == '1' ? ReserveBoardStyles.reserveCustomerListRecentWrap : ReserveBoardStyles.reserveCustomerListWaitWrap}>
                {
                    timerReserveList.map((customer, idx) => {
                        // 顾客是否已到店 0:否 1:是
                        const isStartWork = customer.isStartWork
                        // 全局索引
                        const globalIndex = timeIndex + '-' + idx
                        // 触摸区域样式
                        const touchWrapStyle = []
                        // 样式
                        const cardStyle = [ReserveBoardStyles.reserveCustomerDetailBox]
                        // 中间元素
                        const isMiddleWidget = (idx + 2) % 3 == 0

                        // 是否为中间元素
                        if (isMiddleWidget) {
                            touchWrapStyle.push(ReserveBoardStyles.reserveCustomerDetailMiddleWrap)
                        } else {
                            touchWrapStyle.push(ReserveBoardStyles.reserveCustomerDetailWrap)
                        }

                        console.log("customer", customer)

                        // 是否选中
                        const isCheck = checkCustomerIndex == globalIndex
                        if (customer.isReseve == '3') { // 占用状态
                            cardStyle.push(ReserveBoardStyles.reserveCustomerBusyBox)

                            // 是否过期预约
                            if (reserveFlag != 'valid') {
                                cardStyle.push({opacity: 0.8})
                            }

                            // 选中
                            if (isCheck) {
                                cardStyle.push({
                                    borderWidth: PixelUtil.size(4),
                                    borderStyle: 'solid',
                                    borderColor: '#FFDA99'
                                })
                            }

                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        checkedCustomerHandle(globalIndex)
                                    }}
                                    style={touchWrapStyle}>
                                    <ImageBackground
                                        resizeMode={'contain'}
                                        style={cardStyle}
                                        source={require('@imgPath/reserve_customer_detail_busy_bg.png')}>
                                        {/*取消占用*/}
                                        {reserveFlag == 'valid' && canCancel == '1' && (
                                            <TouchableOpacity
                                                style={ReserveBoardStyles.reserveCustomerDelIconBox}
                                                onPress={() => {
                                                    customerClickEvent('cancelReserve', {
                                                        type: '1',
                                                        recordId: customer.recordId,
                                                        index: idx
                                                    }) // 占用取消
                                                }}>
                                                <Image style={ReserveBoardStyles.reserveCustomerDelIcon}
                                                       resizeMode={'contain'}
                                                       source={require('@imgPath/reserve_customer_detail_del.png')}/>
                                            </TouchableOpacity>
                                        )}


                                        {/*预约占用状态*/}
                                        <View style={ReserveBoardStyles.reserveStylistBusyBox}>
                                            <Image style={ReserveBoardStyles.reserveStylistBusyIcon}
                                                   resizeMode={'contain'}
                                                   source={require('@imgPath/reserve_customer_detail_busy_icon.png')}/>
                                            <Text style={ReserveBoardStyles.reserveStylistBusyText}>已占用</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        } else if (customer.isReseve == '0' || customer.isReseve == '2') { // 0占用｜预约 2仅预约
                            cardStyle.push(ReserveBoardStyles.reserveCustomerReadyBox)

                            // 选中
                            if (isCheck) {
                                cardStyle.push({
                                    borderWidth: PixelUtil.size(4),
                                    borderStyle: 'solid',
                                    borderColor: '#FFDA99'
                                })
                            }

                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        checkedCustomerHandle(globalIndex)
                                    }}
                                    style={touchWrapStyle}>
                                    <View style={cardStyle}>
                                        {/*预约*/}
                                        <TouchableOpacity
                                            style={ReserveBoardStyles.reserveCustomerIconBox}
                                            onPress={() => {
                                                customerClickEvent('memberReserve', {staffId, reserveTime}) // 顾客预约
                                            }}>
                                            <Image style={ReserveBoardStyles.reserveCustomerBtnIcon}
                                                   resizeMode={'contain'}
                                                   source={require('@imgPath/reserve_customer_yuyue.png')}/>
                                        </TouchableOpacity>
                                        {/*占用*/}
                                        {
                                            customer.isReseve == '0' && (
                                                <TouchableOpacity
                                                    style={[ReserveBoardStyles.reserveCustomerIconBox, ReserveBoardStyles.reserveCustomerBtnRight]}
                                                    onPress={() => {
                                                        customerClickEvent('addOccupy', {
                                                            staffId,
                                                            reserveTime: customer.reserveTime,
                                                            index: idx
                                                        }) // 占用
                                                    }}>
                                                    <Image style={ReserveBoardStyles.reserveCustomerBtnIcon}
                                                           resizeMode={'contain'}
                                                           source={require('@imgPath/reserve_customer_zhanyong.png')}/>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>
                            )
                        } else if (customer.isReseve == '1') { // 预约
                            // 预约顾客是否需要换行展示
                            if (reserveInfoArray.length > 3) {
                                cardStyle.push({marginBottom: PixelUtil.size(30)})
                            }

                            // 是否过期预约
                            if (reserveFlag != 'valid') {
                                cardStyle.push({opacity: 0.8})
                            }

                            if (isCheck) {
                                cardStyle.push({
                                    borderWidth: PixelUtil.size(4),
                                    borderStyle: 'solid',
                                    borderColor: '#FFDA99'
                                })
                            }

                            let staffName = customer.reserveStaffName || ""
                            if (staffName && staffName.length > 3) {
                                staffName = staffName.substring(0, 3)
                            }

                            return (
                                // 预约卡片
                                <TouchableOpacity
                                    style={touchWrapStyle}
                                    onPress={() => {
                                        checkedCustomerHandle(globalIndex)
                                        customerClickEvent('showDetail', {customer}) // 查看详情
                                    }}>
                                    {/*已到店判定*/}
                                    {
                                        isStartWork == '1' && (
                                            <Image
                                                resizeMode={"contain"}
                                                style={ReserveBoardStyles.reserveCustomerServing}
                                                source={require('@imgPath/reserve_customer_is_serving.png')}></Image>
                                        )
                                    }
                                    <ImageBackground
                                        resizeMode={'contain'}
                                        style={cardStyle}
                                        source={reserveFlag == 'valid'
                                            ? customer.isMember == '1' ? require('@imgPath/reserve_customer_detail_bg.png') : require('@imgPath/reserve_customer_detail_person_bg.png') // 有效预约
                                            : customer.isMember == '1' ? require('@imgPath/reserve_customer_detail_invalid_bg.png') : require('@imgPath/reserve_customer_detail_person_bg.png') // 无效预约
                                        }>
                                        {/*取消预约*/}
                                        {
                                            isStartWork == '0' && canCancel == '1' && (
                                                <TouchableOpacity
                                                    style={ReserveBoardStyles.reserveCustomerDelIconBox}
                                                    onPress={() => {
                                                        customerClickEvent('cancelReserve', {
                                                            type: '0',
                                                            recordId: customer.recordId,
                                                            index: idx
                                                        }) // 取消预约
                                                    }}>
                                                    <Image style={ReserveBoardStyles.reserveCustomerDelIcon}
                                                           resizeMode={'contain'}
                                                           source={customer.isMember == '1'
                                                               ? require('@imgPath/reserve_customer_detail_del.png') // 有档案
                                                               : require('@imgPath/reserve_customer_detail_del_bl.png') // 无档案
                                                           }/>
                                                </TouchableOpacity>
                                            )
                                        }
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
                                                    {decodeContent(customer.appUserName)}
                                                </Text>
                                                {/*男女*/}
                                                <Image
                                                    style={ReserveBoardStyles.reserveCustomerSexIcon}
                                                    resizeMode={'contain'}
                                                    source={customer.appUserSex == '1' ? require('@imgPath/reserve_customer_multi_profile_man.png') : require('@imgPath/reserve_customer_multi_profile_woman.png')}/>

                                                {/*企微*/}
                                                <Image
                                                    style={ReserveBoardStyles.reserveCustomeriswechatIcon}
                                                    resizeMode={'contain'}
                                                    source={customer.isWechatMember == 1 ? require('@imgPath/vipqiye.png') : (customer.isWechatMember == 2 ? require('@imgPath/noselect.png') : require('@imgPath/quesheng.png'))}/>
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
                                            <View
                                                style={customer.appUserPhoneShow && customer.appUserPhoneShow.length > 0
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
                                                {/*洗吹*/}
                                                {
                                                    customer.reserveCateName == '洗吹' && (
                                                        <Image
                                                            style={ReserveBoardStyles.reserveCustomerTypeIcon}
                                                            resizeMode={'contain'}
                                                            source={customer.isMember == '1'
                                                                ? require('@imgPath/reserve_customer_type_xichui_wt.png') // 有档案
                                                                : require('@imgPath/reserve_customer_type_xichui_bl.png') // 无档案
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
                                                    {staffName}
                                                </Text>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        }
                    })
                }
            </View>
        )
    } else {
        return (<View/>)
    }
})
