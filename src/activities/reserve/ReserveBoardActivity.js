// 预约看板
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import dayjs from "dayjs";
import {useNavigation, useRoute} from '@react-navigation/native';
import ReduxStore from "../../store/store"
import MemberPanel from "../../components/MemberPanel";
import {ReserveBoardStyles} from "../../styles/ReserveBoard";


export const ReserveBoardActivity = props => {
    // 路由
    const route = useRoute()
    // 导航
    const navigation = useNavigation();
    // redux状态
    const reduxState = ReduxStore.getState()
    // 预约信息
    const [reserveInfo, setReserveInfo] = useState({
        currentTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        age: 16
    })
    // 会员子组件
    const memberPanelRef = useRef(null);
    const [memberState, setMemberState] = useState({
        age: -1
    })

    // 初次加载处理
    useEffect(()=>{
        // getData


    }, [])

    const handleAge = () => {
        setReserveInfo({
            ...reserveInfo,
            age: reserveInfo.age + 1
        })

        setMemberState({
            age: reserveInfo.age
        })
    }

    const handleBack = () => {
        navigation.goBack()
    }

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d73',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d74',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d75',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d76',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d77',
            title: 'Third Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d78',
            title: 'Third Item',
        },
    ];

    const styles = StyleSheet.create({
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 32,
        },
    });


    const Item = ({title}) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={ReserveBoardStyles.boardWrapBox}>
            {/*预约状态切换*/}
            <View style={ReserveBoardStyles.reserveFlagBox}></View>
            {/*预约信息展示*/}
            <View style={ReserveBoardStyles.reserveInfoBox}>
                <View style={ReserveBoardStyles.reserveDetailWrap}>
                    {/*发型师列表*/}
                    <View style={ReserveBoardStyles.reserveStylistBox}>
                        <FlatList
                            data={DATA}
                            renderItem={({item}) => <Item title={item.title} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    {/*顾客预约列表*/}
                    <View style={ReserveBoardStyles.reserveCustomerBox}>
                        <FlatList
                            data={DATA}
                            renderItem={({item}) => <Item title={item.title} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
            <MemberPanel ref={memberPanelRef} memberInfo={memberState}></MemberPanel>
        </View>
    )
}
