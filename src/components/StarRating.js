import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {PixelUtil} from "../utils";

const StarStyles = StyleSheet.create({
    starWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    starTitle:{
        width: PixelUtil.size(43,2048),
        height: PixelUtil.size(22,2048),
        backgroundColor: '#ff770f',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    startTitleText:{
        color: '#fff',
        fontSize: PixelUtil.size(15, 2048)
    },
    starBox:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: PixelUtil.size(10, 2048)
    },
    starImg:{
        width: PixelUtil.size(15, 2048),
        height: PixelUtil.size(15, 2048),
        marginRight: PixelUtil.size(7, 2048)
    },
    starScore:{
        fontSize: PixelUtil.size(19, 2048),
        letterSpacing: PixelUtil.size(0.02, 2048),
        color: '#ff770f',
        marginLeft: PixelUtil.size(3, 2048)
    }
})

export class StarRating extends React.PureComponent {
    render() {
        let self = this
        let {score} = self.props
        score = score == undefined || score.length < 1 ?  10 : parseInt(score) // 默认1满星

        // 计算星星个数
        const maxStar = 5
        const fullStar = new Array(parseInt(score / 2)).fill("")
        const halfStar = new Array(score % 2).fill("")
        const emptyStar = new Array(maxStar - fullStar.length - halfStar.length).fill("")

        return (
            <View style={StarStyles.starWrap}>
                <View style={StarStyles.starTitle}>
                    <Text style={StarStyles.startTitleText}>评分</Text>
                </View>
                <View style={StarStyles.starBox}>
                    {
                        fullStar.map((item, idx)=>{
                            return <Image key={idx} style={StarStyles.starImg} resizeMethod="resize" resizeMode={'contain'} source={require('@imgPath/star-full.png')}/>
                        })
                    }
                    {
                        halfStar.map((item, idx)=>{
                            return (<Image key={idx} style={StarStyles.starImg} resizeMethod="resize" resizeMode={'contain'} source={require('@imgPath/star-half.png')}/>)
                        })
                    }
                    {
                        emptyStar.map((item, idx)=>{
                            return (<Image key={idx} style={StarStyles.starImg} resizeMethod="resize" resizeMode={'contain'} source={require('@imgPath/star-gray.png')}/>)
                        })
                    }
                </View>
                <Text style={StarStyles.starScore}>
                    {score}分
                </Text>
            </View>

        );
    }
}
