// 预约看板
import React, {useEffect, useState, useRef} from 'react';
import {Button, Image, Text, View} from 'react-native';
import dayjs from "dayjs";
import {useNavigation, useRoute} from '@react-navigation/native';
import reduxStore from "../../store/store"
import MemberPanel from "../../components/MemberPanel";

export const ReserveBoardActivity = props => {
    // 路由
    const route = useRoute()
    // 导航
    const navigation = useNavigation();
    // redux状态
    const reduxState = reduxStore.getState()
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

    return (
        <View style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image
                source={{
                    uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
                }}
                style={{width: 200, height: 200}}
            />
            <Text>Hello, I am your cat!, now: {reserveInfo.currentTime},
                age:{reserveInfo.age},
                store: {reduxState['auth'].userInfo.storeName}
            </Text>
            <Button
                title={'Thank you!'}
                onPress={() => {
                    handleAge(false);
                }}
            />

            <Button
                title={'Go Back!'}
                onPress={() => {
                    handleBack(false);
                }}
            />

            <Button
                title={'Show Panel!'}
                onPress={() => {
                    memberPanelRef.current.showRightPanel()
                }}
            />

            <MemberPanel ref={memberPanelRef} memberInfo={memberState}></MemberPanel>
        </View>
    );
}
