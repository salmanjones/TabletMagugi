import React, {useState} from "react";
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {PanelConsumeStyles} from "../../../styles/PanelConsume";

export const ConsumeFlatList = React.memo(({consumeArray})=>{
    const ConsumeFlatItem = React.memo(({consumeItem, consumeIndex})=>{
        const [showMore, setShowMore] = useState(false)
        return (
           <View style={PanelConsumeStyles.listItemBox}>
                <View style={PanelConsumeStyles.itemBaseBox}>
                    <View style={PanelConsumeStyles.baseStoreDate}>
                        <View style={PanelConsumeStyles.baseStoreInfo}>
                            <ImageBackground  resizeMode={"contain"} style={PanelConsumeStyles.baseStoreIcon} source={require('@imgPath/reserve_customer_panel_cosume_store.png')}/>
                            <Text style={PanelConsumeStyles.baseStoreName}>{consumeItem.storeName}</Text>
                        </View>
                        <Text style={PanelConsumeStyles.baseConsumeDate}>{consumeItem.billingTime}</Text>
                    </View>
                    <View  style={PanelConsumeStyles.baseProfileFlow}>
                        <Text style={PanelConsumeStyles.baseProfileNo}>档案号：{consumeItem.memberNo}</Text>
                        <Text style={PanelConsumeStyles.baseFlowNo}>水单号：{consumeItem.flowNumber}</Text>
                    </View>
                    <View  style={PanelConsumeStyles.baseServicer}>
                        <Text style={PanelConsumeStyles.baseServicerNames}>{consumeItem.operType ? "销售人：":"服务人："}{consumeItem.servers}</Text>
                        <View style={PanelConsumeStyles.basePriceBox}>
                            <Text style={PanelConsumeStyles.basePricePrefix}>¥</Text>
                            <Text style={PanelConsumeStyles.basePriceValue}>{consumeItem.payPrice}</Text>
                        </View>
                    </View>
                </View>
                {
                    (()=>{
                        if(consumeItem.operType){ // 开卡&充值
                            return (
                                <View style={PanelConsumeStyles.itemCardDetailBox}>
                                    <View style={PanelConsumeStyles.itemCardHeader}>
                                        <View style={PanelConsumeStyles.itemCardHeaderLeft}>
                                            <View style={PanelConsumeStyles.itemCardSaleType}>
                                                <Text style={PanelConsumeStyles.itemCardSaleTypeTxt}>
                                                    {consumeItem.operType == '-1' ? '开卡':'充值'}
                                                </Text>
                                            </View>
                                            <Text style={PanelConsumeStyles.itemCardSaleName} ellipsizeMode={"tail"} numberOfLines={1}>
                                                {consumeItem.cardName}
                                            </Text>
                                        </View>
                                        <View style={PanelConsumeStyles.itemCardHeaderRight}>
                                            <TouchableOpacity style={consumeItem.cardDetils.length > 0 ? PanelConsumeStyles.showMoreBox:PanelConsumeStyles.showMoreBoxHide}
                                                              onPress={()=>{
                                                                  setShowMore(!showMore)
                                                              }}>
                                                <Text style={PanelConsumeStyles.showMoreBoxTitle}>{showMore ? '收起':'次卡项目'}</Text>
                                                <ImageBackground resizeMode={"contain"} style={PanelConsumeStyles.showMoreIcon} source={
                                                    showMore ? require('@imgPath/reserve_customer_panel_cosume_up.png') : require('@imgPath/reserve_customer_panel_cosume_down.png')}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={consumeItem.cardDetils.length > 0 && showMore ? PanelConsumeStyles.itemCardBody:PanelConsumeStyles.itemCardBodyHide}>
                                        {
                                            (()=>{
                                                const showDetailsArray = [...consumeItem.cardDetils]
                                                return showDetailsArray.map(detail=>(
                                                    <View style={PanelConsumeStyles.itemDetailStyle}>
                                                        <View style={PanelConsumeStyles.itemDetailLeft}>
                                                            <View style={PanelConsumeStyles.itemDetailCircle}></View>
                                                            <Text style={PanelConsumeStyles.itemDetailCardName} ellipsizeMode={"tail"} numberOfLines={1}>{detail.projectName}</Text>
                                                        </View>
                                                        <Text style={PanelConsumeStyles.itemDetailRight}>
                                                            {detail.num}
                                                        </Text>
                                                    </View>
                                                ))
                                            })()
                                        }
                                    </View>
                                </View>
                            )
                        }else{ // 开单
                            return (
                                <View style={PanelConsumeStyles.itemDetailBox}>
                                    <View style={PanelConsumeStyles.itemDetailTitle}>
                                        <Text style={PanelConsumeStyles.itemDetailTitleDesc}>消费明细</Text>
                                        <TouchableOpacity style={consumeItem.billingDetils.length > 3 ? PanelConsumeStyles.showMoreBox:PanelConsumeStyles.showMoreBoxHide}
                                            onPress={()=>{
                                                if(consumeItem.billingDetils.length > 3) {
                                                    setShowMore(!showMore)
                                                }
                                            }}>
                                            <Text style={PanelConsumeStyles.showMoreBoxTitle}>查看更多</Text>
                                            <ImageBackground resizeMode={"contain"} style={PanelConsumeStyles.showMoreIcon} source={
                                                showMore ? require('@imgPath/reserve_customer_panel_cosume_up.png') : require('@imgPath/reserve_customer_panel_cosume_down.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        (()=>{
                                            let showDetailsArray = [...consumeItem.billingDetils]
                                            if(consumeItem.billingDetils.length > 3 && showMore == false){
                                                showDetailsArray = showDetailsArray.slice(0, 3)
                                            }

                                            return showDetailsArray.map(detail=>(
                                                <View style={PanelConsumeStyles.itemDetailStyle}>
                                                    <View style={PanelConsumeStyles.itemDetailLeft}>
                                                        <View style={PanelConsumeStyles.itemDetailCircle}></View>
                                                        <Text style={PanelConsumeStyles.itemDetailName} ellipsizeMode={"tail"} numberOfLines={1}>{detail.projectName}</Text>
                                                        <Text style={PanelConsumeStyles.itemDetailNum} ellipsizeMode={"tail"} numberOfLines={1}>{detail.num}</Text>
                                                        <Text style={PanelConsumeStyles.itemDetailPrice} ellipsizeMode={"tail"} numberOfLines={1}>¥{detail.projectPrice}</Text>
                                                    </View>
                                                    <Text style={PanelConsumeStyles.itemDetailRight}>
                                                        ¥{detail.projectPay}
                                                    </Text>
                                                </View>
                                            ))
                                        })()
                                    }
                                </View>
                            )
                        }
                    })()
                }

           </View>
        )
    })

    return (
        <FlatList
            data={consumeArray}
            renderItem={
                ({item, index}) => {
                    return <ConsumeFlatItem consumeItem={item} consumeIndex={index}/>
                }
            }
            ItemSeparatorComponent={()=>{
                return <View style={PanelConsumeStyles.listItemSeparator}></View>
            }}
            keyExtractor={item=>{
                return item.flowNumber
            }}
        />
    )
})
