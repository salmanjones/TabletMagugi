import React, {useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"

export default React.memo(({reserveInfoArray, checkStylistEvent, reserveFlag}) => {
    const [checkIndex, setCheckIndex] = useState(0)

    const checkItemEvent = (index)=>{
        // 命中颜色
        setCheckIndex(index)
        // 展示预约列表
        checkStylistEvent(index)
    }

    const Item = ({index, title, validCount, invalidCount}) => {
        const showName = title.length > 6 ? title.substring(0,6) : title
        const showText = reserveFlag == 'valid' ? `${showName}(${validCount})`:`${showName}(${invalidCount})`
        return (
            <TouchableOpacity style={ReserveBoardStyles.reserveStylistItemBox} onPress={()=>{checkItemEvent(index)}}>
                <View style={index == checkIndex ? ReserveBoardStyles.reserveStylistItemActive:ReserveBoardStyles.reserveStylistItem}>
                    <Text style={index == checkIndex ? ReserveBoardStyles.reserveStylistItemTextActive:ReserveBoardStyles.reserveStylistItemText}>{showText}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={reserveInfoArray}
            renderItem={
                ({item, index}) => <Item index={index} title={item.staffName} validCount={item.staffNowReseverCount} invalidCount={item.staffPassReseverCount}/>
            }
            keyExtractor={item => item.staffId}/>
    )
})
