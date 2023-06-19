import React, {useState} from "react";
import {FlatList, Image, Text, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"
import CustomerFlatItem from "./CustomerFlatItem";
import Spinner from "react-native-loading-spinner-overlay";

export default React.memo(({reserveInfo, reserveFlag, customerCardEvent}) => {
    // 呈现数据
    const [isLoading, setIsLoading] = useState(false)
    const [customerFlatData, setCustomerFlatData] = useState([])

    // 模拟分页加载
    const pageSize = 5
    const loadMoreData = ()=>{
        let customerReserveList = []
        if(reserveFlag == 'valid'){
            customerReserveList = reserveInfo['staffNowReseverList'] || []
        }else{
            customerReserveList = reserveInfo['staffPassReseverList'] || []
        }

        if(customerReserveList.length !=0 && customerFlatData.length  == customerReserveList.length){
            return
        }

        setIsLoading(true)
        setTimeout(()=>{
            const start = customerFlatData.length
            const end = start + pageSize
            const customerFlatArray = customerFlatData
            customerReserveList.slice(start, end).forEach(item=>{
                customerFlatArray.push(item)
            })
            setCustomerFlatData(customerFlatArray)
            setIsLoading(false)
        }, 500)
    }

    React.useEffect(()=>{
        let customerReserveList = []
        if(reserveFlag == 'valid'){
            customerReserveList = reserveInfo['staffNowReseverList'] || []
        }else{
            customerReserveList = reserveInfo['staffPassReseverList'] || []
        }

        setCustomerFlatData(customerReserveList.slice(0, pageSize))
    }, [reserveInfo, reserveFlag])

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
                    <CustomerFlatItem
                        reserveInfoArray={itemInfo.resverInfoList || []}
                        reserveStatus={itemInfo.reserveStatus}
                        timeIndex={index}
                        reserveFlag={reserveFlag}
                        customerCardEvent={customerCardEvent}/>
                </View>
            </View>
        )
    })

    return (
        <View style={{flex: 1}}>
            {/*加载中*/}
            <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}} />
            <FlatList
                data={customerFlatData}
                initialNumToRender={5}
                renderItem={
                    ({item, index}) => {
                        return <TimerPanel itemInfo={item} index={index}/>
                    }
                }
                keyExtractor={(item, index) => {
                    return item['reserveTime']
                }}
                onEndReachedThreshold = {0.1}
                onEndReached={loadMoreData}/>
        </View>
    )
})
