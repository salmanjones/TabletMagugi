import React, {useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"

export default React.memo(({reserveInfoArray, checkStylistEvent, reserveFlag}) => {
    const [checkIndex, setCheckIndex] = useState(0)
    const [checkStaffId, setCheckStaffId] = useState('')

    const checkItemEvent = React.useCallback((index, staffId)=>{
        // 命中颜色
        setCheckIndex(index)
        setCheckStaffId(staffId)
        // 展示预约列表
        checkStylistEvent(index)
    }, [reserveFlag])

    const Item = React.memo(({index, title, validCount, invalidCount, staffId}) => {
        const showName = title.length > 6 ? title.substring(0,6) : title
        const showText = reserveFlag == 'valid' ? `${showName}(${validCount})`:`${showName}(${invalidCount})`

        if(checkStaffId && checkStaffId.length > 0){
            return (
                <TouchableOpacity style={ReserveBoardStyles.reserveStylistItemBox} onPress={()=>{checkItemEvent(index, staffId)}}>
                    <View style={staffId == checkStaffId ? ReserveBoardStyles.reserveStylistItemActive:ReserveBoardStyles.reserveStylistItem}>
                        <Text style={staffId == checkStaffId ? ReserveBoardStyles.reserveStylistItemTextActive:ReserveBoardStyles.reserveStylistItemText}>{showText}</Text>
                    </View>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={ReserveBoardStyles.reserveStylistItemBox} onPress={()=>{checkItemEvent(index, staffId)}}>
                    <View style={index == checkIndex ? ReserveBoardStyles.reserveStylistItemActive:ReserveBoardStyles.reserveStylistItem}>
                        <Text style={index == checkIndex ? ReserveBoardStyles.reserveStylistItemTextActive:ReserveBoardStyles.reserveStylistItemText}>{showText}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    })

    return (
        <FlatList
            data={reserveInfoArray}
            initialNumToRender={4}
            renderItem={
                ({item, index}) => <Item staffId={item.staffId} index={index} title={item.staffName} validCount={item.staffNowReseverCount} invalidCount={item.staffPassReseverCount}/>
            }
            keyExtractor={item => item.staffId}/>
    )
})
