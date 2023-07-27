import React, {useRef, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {ReserveBoardStyles} from "../../../styles/ReserveBoard"
import CustomerFlatItem from "./CustomerFlatItem";
import Spinner from "react-native-loading-spinner-overlay";
import {getRefreshState} from "../../../services/reserve";
import ReduxStore from "../../../store/store"

export default React.memo(({customerCardEvent}) => {
    /// 浮动按钮
    const FloatButtons = React.memo(()=>{
        const [needRefresh, setNeedRefresh] = useState(false)

        return (
            <View style={ReserveBoardStyles.floatButtonBox}>
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
                {/*刷新列表*/}
                <TouchableOpacity
                    style={ReserveBoardStyles.reserveButtonRefresh}
                    onPress={()=>{
                        customerCardEvent("reloadData", {}, ()=>{
                            setNeedRefresh(false)
                        })
                    }}>
                    <Image
                        style={ReserveBoardStyles.reserveButtonSankeIcon}
                        resizeMode={'contain'}
                        source={needRefresh
                            ? require('@imgPath/reserve_customer_button_refresh_new.png')
                            : require('@imgPath/reserve_customer_button_refresh.png')
                        }/>
                </TouchableOpacity>
            </View>
        )
    })

    return (
        <View style={ReserveBoardStyles.noReserveEmptyBox}>
            <FloatButtons/>
            <Image style={ReserveBoardStyles.noReserveSet}
                   resizeMode={'contain'}
                   source={require('@imgPath/reserve_staff_unset.png')}></Image>
        </View>
    )
})
