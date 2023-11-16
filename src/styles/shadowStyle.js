import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';
export const ShadowStyle=StyleSheet.create({
    username:{
        color:'red'
    },
    loginForm:{

        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    btnlogin :{
        position:'absolute',
        bottom:PixelUtil.size(20),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:PixelUtil.size(300),
        height:PixelUtil.size((50)),
        lineHeight:PixelUtil.size(50),
        backgroundColor:'skyblue',
        marginTop:PixelUtil.size(20),
        borderRadius:PixelUtil.size(10),
        fontSize:'20px',
    },
    form:{
        position:'relative',
        backgroundColor:'pink',
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        width:PixelUtil.size(500),
        height:PixelUtil.size(400),
        borderColor:'black',
        borderStyle:'solid',
        borderRadius:PixelUtil.size(20),
        borderWidth:PixelUtil.size(1),

    },
    input:{
        width:PixelUtil.size(200),
        height:PixelUtil.size(50),
        backgroundColor:'rgba(70, 70, 70, 0.2)',
        borderRadius:PixelUtil.size(10),
        paddingLeft:PixelUtil.size(10),
        marginTop:PixelUtil.size(15)
    }
})
