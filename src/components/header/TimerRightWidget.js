import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {timerRightWidgetStyles} from "../../styles/timerRightWidget";
import dayjs from "dayjs";

/**
 * 多档案单项展示组件
 * @type {React.NamedExoticComponent<{readonly size?: *, readonly customerClickEvent?: *, readonly index?: *, readonly profileItem?: *}>}
 */
export const TimerRightWidget = React.memo(() => {
    const [dateTime, setDateTime] = useState('')

    useEffect(()=>{
        const timerId = setInterval(()=>{
            setDateTime(dayjs().format("YYYY-MM-DD HH:mm:ss"))
        }, 1000)

        return ()=>{
            timerId && clearInterval(timerId)
        }
    }, [])

    return (
        <View style={timerRightWidgetStyles.timeBox}>
            <Text style={timerRightWidgetStyles.timeTxt}>
                {dateTime}
            </Text>
        </View>
    )
})
