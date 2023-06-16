import React, {useState} from "react";
import {FlatList, Image, Text, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"
import CustomerFlatItem from "./CustomerFlatItem";

export default React.memo(({reserveInfo, reserveFlag}) => {
    // 呈现数据
    const dataArray = reserveFlag == 'valid' ? reserveInfo['staffNowReseverList']:reserveInfo['staffPassReseverList']
    // 顾客选中
    const [customerIndex, setCustomerIndex] = useState('')
    const checkCustomerEvent = (idx)=>{
        setCustomerIndex(idx)
    }

    const TimerPanel = React.memo(({itemInfo, index}) => {
        return (
            // 时间轴面板
            <View style={ReserveBoardStyles.reserveCustomersWrap}>
                <View style={ReserveBoardStyles.reserveCustomersBox}>
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
                        {/*即将到店提示*/}
                        {
                            itemInfo.reserveStatus == '1' && (itemInfo.resverInfoList && itemInfo.resverInfoList.length > 0) && (
                                <View style={ReserveBoardStyles.reserveCustomerRecentTips}>
                                    <Text style={ReserveBoardStyles.reserveCustomerRecentTipsTxt}>即将到店</Text>
                                </View>
                            )
                        }
                    </View>
                    {/*预约顾客列表*/}
                    <CustomerFlatItem reserveInfoArray={itemInfo.resverInfoList || []} reserveStatus={itemInfo.reserveStatus} timeIndex={index} reserveFlag={reserveFlag}></CustomerFlatItem>
                </View>
            </View>
        )
    })

    return (
        <FlatList
            data={dataArray}
            renderItem={
                ({item, index}) => {
                    return <TimerPanel itemInfo={item} index={index}/>
                }
            }
            keyExtractor={item => item.reserveTime}/>
    )
})
