import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {MemberPanelStyles} from "../../../styles/MemberPanel";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

export const CardWidget = React.memo(({cardArray})=>{
    const CardItemWidget = React.memo(({itemInfo, index})=>{
        return (
            <View style={MemberPanelStyles.memberCouponBox}>
            </View>
        )
    })

    return (
        <FlatList
            data={cardArray}
            renderItem={
                ({item, index}) => {
                    return <CardItemWidget itemInfo={item} index={index}/>
                }
            }
            keyExtractor={item=>{
                return item.id
            }}
        />
    )
})
