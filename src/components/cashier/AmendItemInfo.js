//libs
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SimulateKeyboard} from '../../components';
//self
import {amendItemInfoStyle} from '../../styles';
import {showMessage} from '../../utils'

export class AmendItemInfo extends React.Component {
    constructor(props){
        super(props);

        let priceValue = props.itemInfo.itemPrice.toString();
        let paidPrice = props.itemInfo.paidPrice.toString();

        let cachePaidPrice = "";

        if(paidPrice != '-1' && paidPrice != ''){
            cachePaidPrice = paidPrice;
        }

        this.roundMode = props.roundMode;

        this.state={
            nameValue: props.itemInfo.itemName,
            cachePaidPrice: cachePaidPrice,
            priceValue: priceValue,
            number: props.itemInfo.itemNum+"",
            isOnePress:true,
            isNum:0,
            isReceived:0,
            changType:0
        };
    }

    onPointPress = value =>{
        this.setState((prevState, props)=>{
            let cachePaidPrice = prevState.cachePaidPrice.toString();
            if(cachePaidPrice == '.'){
                cachePaidPrice = '.';
            }else{
                cachePaidPrice = cachePaidPrice + ".";
            }

            return {...prevState, cachePaidPrice}
        });
    }

    onPress = num => {
        num = num.length<1?'':parseInt(num)
        this.setState((prevState, props)=>{
            let number;
            if(prevState.changType == 0){
                number = prevState.number.toString() + num.toString();
            }else{
                let paidPriceA = prevState.cachePaidPrice;

                if(paidPriceA == 0 && paidPriceA.toString().indexOf('.') == -1){
                    number = num.toString();
                }else{
                    number = paidPriceA.toString() + num.toString();
                }
            }

            //第一次使用键盘
            if(prevState.isOnePress){
                number = num.toString();
                prevState.isOnePress = false;
            }

            //限定最大值
            let itemInfo = props.itemInfo;
            if(itemInfo.itemType=='card'&&itemInfo.projectMirror.consumeMode!='2'){//时间卡不限次数
                let blance = parseInt(itemInfo.projectMirror.blance);
                if(parseInt(number)>blance){
                    number = blance.toString();
                    showMessage('超过最大消费次数', true);
                }
            }else{
                if(prevState.changType == 0){
                    if(number.length>4&&parseInt(number)>99999){
                        return prevState;
                    }
                }else{
                    if(number.length>6){
                        return prevState;
                    }
                }

            }

            let cachePaidPrice = 0.0;
            if(prevState.changType == 1){
                cachePaidPrice = number;
            }

            return prevState.changType == 0 ? {...prevState, number} : {...prevState, cachePaidPrice}
        });
    };

    onBack(){
        this.setState((prevState,  props)=>{
            let number = prevState.number.slice(0, -1);
            number = number.length>0?number:'';

            return {...prevState, number}
        });
    }

    onClear(){
        this.setState((prevState,  props)=>{
            if(prevState.changType == 1){
                let cachePaidPrice = '';
                return {...prevState, cachePaidPrice};
            }else{
                let number = '1';
                return {...prevState, number}
            }
        });
    }

    onAdd(){
        let number = this.state.number;

        number = number.length<1?'0':number;
        number = parseInt(number);

        //限定最大值
        let itemInfo = this.props.itemInfo;
        if(itemInfo.itemType=='card'&&itemInfo.projectMirror.consumeMode!='2'){//时间卡不限次数
            let blance = parseInt(itemInfo.projectMirror.blance);
            if(parseInt(number+1)>blance){
                number = blance.toString();
                showMessage('超过最大消费次数', true);
            }else{
                number = (parseInt(number)+1).toString();
            }
        }else{
            if(number.length>4&&(parseInt(number)+1)>99999){
                return
            }

            number = (parseInt(number)+1).toString();
        }

        this.setState({ number: number, isNum: 1 , isReceived:0});
    }

    onReduce(){
        this.setState((prevState, props)=>{
            let number = prevState.number;
            number = number.length<1?'0':number;
            number = parseInt(number)-1<0?'1':parseInt(number)-1;
            number = number.toString();
            isNum = 1;
            isReceived = 0;
            return {...prevState, number , isNum , isReceived}
        });
    }


    onChangeState(changType){
        isNum = 1;
        isReceived = 0;

        this.setState((preState, props)=>{
            return {...preState, changType ,isNum , isReceived}
        })
    }

    onChangeReceived(changType){
        isNum = 0;
        isReceived = 1;

        this.setState((preState, props)=>{
            return {...preState, changType,isNum , isReceived}
        })
    }

    onConfirm = () => {
        let number = this.state.number;
        number = number.length<1?'1':(parseInt(number)<1?'1':number);

        let cachePaidPrice = this.state.cachePaidPrice;
        if(cachePaidPrice == ''){
            cachePaidPrice = '';
        }else{
            let rule = /^\d+(\.\d+)?$/;

            if(!rule.test(cachePaidPrice)){
                return;
            }
        }

        cachePaidPrice = parseFloat(cachePaidPrice).toFixed(this.roundMode);

        this.props.editConsumeItemInfo && this.props.editConsumeItemInfo(number ,cachePaidPrice);
    };

    onCanel = () => {
        this.props.hideEditConsumeItemModal && this.props.hideEditConsumeItemModal();
    };

    render() {
        const {itemInfo} = this.props;

        return (
                <View style={amendItemInfoStyle.modalBackground}>
                    <View style={amendItemInfoStyle.activityIndicatorWrapper}>
                        <View style={amendItemInfoStyle.bodybox}>
                            <View style={amendItemInfoStyle.bodytop}>
                                <Text style={amendItemInfoStyle.bodytopTitle}>
                                    项目/产品
                                </Text>
                            </View>
                            <View style={amendItemInfoStyle.bodyContent}>
                                <View style={amendItemInfoStyle.iteminfoBox}>
                                    <View style={itemInfo.itemType=='card'?amendItemInfoStyle.iteminfoBoxItemOther:amendItemInfoStyle.iteminfoBoxItem}>
                                        <View>
                                            <Text style={amendItemInfoStyle.AmendCardItemNameText} numberOfLines={1} ellipsizeMode={'tail'}>
                                                名称：{this.state.nameValue}
                                            </Text>
                                        </View>
                                        <View style={amendItemInfoStyle.iteminfoBoxItemLi}>
                                            {
                                                itemInfo.itemType=='card'?
                                                (
                                                    <Text style={amendItemInfoStyle.AmendCardItemNameTextCK} numberOfLines={1} ellipsizeMode={'tail'}>
                                                        次卡：{itemInfo.projectMirror.cardName}
                                                    </Text>
                                                )
                                                :
                                                (
                                                    <View style={amendItemInfoStyle.AmendCardItemPrice}>
                                                        <Text style={amendItemInfoStyle.AmendCardItemPriceText}>价格：</Text>
                                                        <View style={amendItemInfoStyle.AmendCardItemPriceBox}>
                                                            <Text style={amendItemInfoStyle.AmendCardItemPriceInp}>{this.state.priceValue}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>
                                    <View style={amendItemInfoStyle.iteminfoBoxItem}>
                                        <View style={amendItemInfoStyle.AmendCardItemCount}>
                                            <Text style={amendItemInfoStyle.AmendCardItemCountText}>
                                                {
                                                    itemInfo.itemType=='card'?
                                                    '次数：':'数量：'
                                                }

                                            </Text>
                                            <TouchableOpacity style={amendItemInfoStyle.AmendCardItemCountAdd} onPress={this.onReduce.bind(this)}>
                                                <Text style={amendItemInfoStyle.AmendCardItemCountAddText}>-</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} style={this.state.isNum == 0? amendItemInfoStyle.AmendCardItemCountTextBox:amendItemInfoStyle.AmendCardItemCountTextBoxActive} onPress={this.onChangeState.bind(this,0)}>
                                                <View style={amendItemInfoStyle.AmendCardItemCountTextInp}>
                                                    <Text style={amendItemInfoStyle.AmendCardItemCountT}>{this.state.number}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={amendItemInfoStyle.AmendCardItemCountMin} onPress={this.onAdd.bind(this)}>
                                                <Text style={amendItemInfoStyle.AmendCardItemCountMinText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            this.props.itemInfo.itemType != 'card' && this.props.moduleCode == '1' && (
                                                <View style={amendItemInfoStyle.iteminfoBoxItemLi}>
                                                    <Text style={amendItemInfoStyle.AmendCardItemCountText}>
                                                    实收：
                                                    </Text>
                                                    <TouchableOpacity activeOpacity={1} style={this.state.isReceived == 0? amendItemInfoStyle.AmendCardItemCountInpBox:amendItemInfoStyle.AmendCardItemCountInpBoxActive} onPress={this.onChangeReceived.bind(this ,1)}>
                                                        <Text style={amendItemInfoStyle.AmendCardItemCountT}>{this.state.cachePaidPrice}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }

                                    </View>
                                </View>
                                <View style={amendItemInfoStyle.AmendCardItemKeyboard}>
                                    <SimulateKeyboard
                                        changType = {this.state.changType}
                                        onPress={this.onPress.bind(this)}
                                        onPointPress={this.onPointPress.bind(this)}
                                        onBack={this.onBack.bind(this)}
                                        onClear={this.onClear.bind(this)}/>
                                </View>
                            </View>
                            <View style={amendItemInfoStyle.bodyBottom}>
                                <TouchableOpacity style={amendItemInfoStyle.bodyCanelBtn}
                                    onPress={this.onCanel.bind(this)}>
                                    <Text style={amendItemInfoStyle.bodyCanelBtnText}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={amendItemInfoStyle.bodyConfirmBtn}
                                    onPress={this.onConfirm.bind(this)}>
                                    <Text style={amendItemInfoStyle.bodyConfirmText}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

        )
    }
}
