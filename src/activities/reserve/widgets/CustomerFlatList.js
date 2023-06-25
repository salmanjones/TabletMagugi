import React, {useRef, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"
import CustomerFlatItem from "./CustomerFlatItem";
import Spinner from "react-native-loading-spinner-overlay";
import dayjs from "dayjs";

export default React.memo(({stylistReserveInfo, reserveFlag, customerCardEvent}) => {
    // 呈现数据
    const [isLoading, setIsLoading] = useState(false)
    const [customerFlatData, setCustomerFlatData] = useState([])
    // 列表组件
    const flatListRef = useRef(null);
    // 当预约信息刷新与切换Tab时触发
    React.useEffect(() => {
        setIsLoading(true)
        // 视觉loading 防止卡顿
        let loadingTimerId = setTimeout(()=>{
            setIsLoading(false)
            loadingTimerId && clearTimeout(loadingTimerId)
        }, 300)

        // 渲染页面
        let customerReserveList = []
        if (reserveFlag == 'valid') {
            customerReserveList = stylistReserveInfo['staffNowReseverList'] || []
        } else {
            customerReserveList = stylistReserveInfo['staffPassReseverList'] || []
        }
        setCustomerFlatData(customerReserveList)
    }, [stylistReserveInfo, reserveFlag])

    const goToTop = ()=>{
        flatListRef.current?.scrollToIndex({animated: true, index: 0})
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
                        <Text
                            style={itemInfo.reserveStatus == '1' ? ReserveBoardStyles.reserveCustomerTimerRecentTxt : ReserveBoardStyles.reserveCustomerTimerWaitTxt}>
                            {itemInfo.reserveTime}
                        </Text>
                        {/*即将到店提示*/}
                        {
                            itemInfo.reserveStatus == '1' && (
                                <View style={ReserveBoardStyles.reserveCustomerRecentTips}>
                                    <Text style={ReserveBoardStyles.reserveCustomerRecentTipsTxt}>即将到店</Text>
                                </View>
                            )
                        }
                    </View>
                    {/*预约顾客列表*/}
                    <CustomerFlatItem
                        reserveInfoArray={itemInfo.resverInfoList || []}
                        reserveStatus={itemInfo.reserveStatus}
                        reserveFlag={reserveFlag}
                        timeIndex={index}
                        reserveTime={itemInfo.reserveTime}
                        staffId={stylistReserveInfo.staffId}
                        canCancel={itemInfo.isDelete} // 已小于当前时间点是否可进行互动操作 0否，1是
                        customerCardEvent={customerCardEvent}/>
                </View>
            </View>
        )
    })

    if (customerFlatData && customerFlatData.length > 0){
         return (
            <View style={{flex: 1}}>
                {/*加载中*/}
                <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}}/>
                {/*散客预约*/}
                <TouchableOpacity
                    style={ReserveBoardStyles.reserveButtonSanke}
                    onPress={()=>{
                        customerCardEvent("guestReserve", {})
                    }}>
                    <Image
                        style={ReserveBoardStyles.reserveButtonSankeIcon}
                        resizeMode={'contain'}
                        source={require('@imgPath/reserve_customer_button_sanke.png')}/>
                </TouchableOpacity>
                {/*回到当前位置*/}
                <TouchableOpacity
                    style={ReserveBoardStyles.reserveButtonRevert}
                    onPress={()=>{
                        goToTop()
                    }}>
                    <Image
                        style={ReserveBoardStyles.reserveButtonRevertIcon}
                        resizeMode={'contain'}
                        source={require('@imgPath/reserve_customer_button_revert.png')}/>
                </TouchableOpacity>
                <FlatList
                    ref={flatListRef}
                    data={customerFlatData}
                    initialNumToRender={5}
                    renderItem={
                        ({item, index}) => {
                            return <TimerPanel itemInfo={item} index={index} staffId={item.staffId}/>
                        }
                    }
                    keyExtractor={(item, index) => {
                        return item['reserveTime'] + index
                    }}/>
            </View>
        )
    }else{
        return (
            <View style={{flex: 1,width: '100%', height: '100%', alignItems: 'center', justifyContent:'center'}}>
                <Image style={ReserveBoardStyles.noReserveEmpty}
                       resizeMode={'contain'}
                       source={require('@imgPath/reserve_customer_empty.png')}></Image>
            </View>
        )
    }
})
