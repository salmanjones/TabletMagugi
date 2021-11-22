//轮牌设置
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getStoreDutysSetting,changeSortOfDutysSetting,deleteDutyTableSetting} from 'services';
import { ListStatus, PixelUtil ,showMessage} from 'utils';
import {AddRotateModal,RotateSmallTipModal} from 'components';
import {
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { rotateItemStyles } from 'styles';

export class RotateListItem extends React.PureComponent {
    constructor(props) {
      super(props);
    }
    render() {

    return (
      <TouchableOpacity style={this.props.isSelected == true ? rotateItemStyles.rotateListRowActive : rotateItemStyles.rotateListRow} onPress={this.props.onSelect}>
      {/* 页面loading */}
        <View style={rotateItemStyles.rotateListName}>
          <View
            //underlayColor="transparent"
            style={this.props.type == 0 ?  (this.props.isSelected == true ? rotateItemStyles.rotateListNameActiveLabel : rotateItemStyles.rotateListNameLabel ):(this.props.isSelected == true ? rotateItemStyles.rotateListOtherNameLabelActive : rotateItemStyles.rotateListOtherNameLabel )}
            ><Text   numberOfLines={1} style={[rotateItemStyles.rotateItemTitleText,this.props.type == 0?'':rotateItemStyles.textGreen]}>{this.props.cardName}</Text>
        </View>
        </View>
        <Text style={rotateItemStyles.rotateListText}>{this.props.type == 0? "否":"是"}</Text>
        <Text style={[rotateItemStyles.rotateListText,this.props.status == 0?'':rotateItemStyles.textRed]}>{this.props.status == 0? "启用":"停用"}</Text>
        <Text style={[rotateItemStyles.rotateListText,this.props.addSort == 1?rotateItemStyles.textGreen:rotateItemStyles.textPurple]}>{this.props.addSort == 1? "正序":"倒序"}</Text>
        <Text style={rotateItemStyles.rotateListText}>{this.props.type == 0?(this.props.lastRotate == 0? "是":"否"): "--"}</Text>
        <Text style={rotateItemStyles.rotateListText}>{this.props.type == 0?(this.props.serviceTiming == 0? "是":"否"): "--"}</Text>
        <Text style={rotateItemStyles.rotateListText}>{this.props.type == 0?(this.props.restTiming == 0? "是":"否"): "--"}</Text>
        <Text style={[rotateItemStyles.rotateListText,this.props.type == 0?(this.props.redCardSetting == 0?'':rotateItemStyles.textRed):'']}>{this.props.type == 0?(this.props.redCardSetting == 0? "启用":"停用"): "--"}</Text>
      </TouchableOpacity>
    )

  }


}


class RotateSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			datas: [],
			err: null,
			ListStatus: ListStatus.idle,
      showOperateModal: false,
      showDeleteCheckModal:false,
      selectedSetting: null,
      selectIndex:0,
      modifyType:0
		};
  }

  componentDidMount() {
    this.initSettingInfoData();
  }

  onCanel(){
      this.setState((props, preState)=>{
        return {
          showOperateModal: false
        }
      });
  }

  render() {
    let that = this;
    let cardSettingInfo = this.state.datas;
    let selectedSetting = this.state.selectedSetting;
    let showOperateModal = this.state.showOperateModal;
    let showDeleteCheckModal = this.state.showDeleteCheckModal;
    let modifyType = this.state.modifyType;
    return (
     <View style={rotateItemStyles.scrollContent}>
      <View style={rotateItemStyles.rotateListTitle}>
        <Text style={rotateItemStyles.rotateListText}>轮牌名称</Text>
        <Text style={rotateItemStyles.rotateListText}>是否站门牌</Text>
        <Text style={rotateItemStyles.rotateListText}>是否启用</Text>
        <Text style={rotateItemStyles.rotateListText}>上牌顺序</Text>
        <Text style={rotateItemStyles.rotateListText}>继续昨日轮牌</Text>
        <Text style={rotateItemStyles.rotateListText}>服务计时</Text>
        <Text style={rotateItemStyles.rotateListText}>临休计时</Text>
        <Text style={rotateItemStyles.rotateListText}>启用红牌</Text>
      </View>
      <ScrollView style={rotateItemStyles.rotateListBody}>
      { cardSettingInfo.map((item,index)=>{
            return   <RotateListItem key={index} sortOrder={item.sortOrder} storeId={item.storeId}  cardName={item.cardInfo.cardName} addSort= {item.cardInfo.addSort}   type= {item.cardInfo.type}
            redCardSetting= {item.cardInfo.redCardSetting}  lastRotate= {item.cardInfo.lastRotate}  restTiming= {item.cardInfo.restTiming}   serviceTiming= {item.cardInfo.serviceTiming}   status= {item.cardInfo.status}
            isSelected = {index == that.state.selectIndex? true : false}
            onSelect = {() => {
              that.setState({
              selectIndex : index,
              selectedSetting:item
            });
       }}
            ></RotateListItem> ;
        })
      }
      </ScrollView>
      <View style={rotateItemStyles.rotateListBtm}>
        <TouchableOpacity style={rotateItemStyles.rotateListBtmBtn}  onPress={() => {if(selectedSetting) that.setState({showDeleteCheckModal :true});}}>
          <ImageBackground source={require('@imgPath/detele-btn-bor.png')}
           style={rotateItemStyles.rotateTitleBtnSetting}  resizeMode={'cover'}
           >
            <Image resizeMethod="resize"  source={require('@imgPath/delete-icon.png')}
             style={rotateItemStyles.rotateListBtmIcon}   resizeMode={'contain'}></Image>
            <Text style={[rotateItemStyles.rotateItemText,rotateItemStyles.textRed]}>删除</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={rotateItemStyles.rotateListBtmBtn} onPress={that.addSetting.bind(this)}>
          <ImageBackground source={require('@imgPath/add-btn-bor.png')}
           style={rotateItemStyles.rotateTitleBtnSetting}  resizeMode={'cover'}
           >
            <Image resizeMethod="resize"  source={require('@imgPath/add-icon.png')}
             style={rotateItemStyles.rotateListBtmIcon}   resizeMode={'contain'}></Image>
            <Text style={[rotateItemStyles.rotateItemText,rotateItemStyles.textGreen]} >添加</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={rotateItemStyles.rotateListBtmBtnOther} onPress={that.editSetting.bind(this)}>
          <ImageBackground source={require('@imgPath/edit-btn-bor.png')}
           style={rotateItemStyles.rotateTitleBtnSetting}  resizeMode={'cover'}>
            <Image resizeMethod="resize"  source={require('@imgPath/edit-icon.png')}
             style={rotateItemStyles.rotateListBtmIcon}   resizeMode={'contain'}></Image>
            <Text style={[rotateItemStyles.rotateItemText,rotateItemStyles.textYellow]}>编辑</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={rotateItemStyles.rotateListBtmBtn} onPress={that.changeSort.bind(this,"uptotop")}>
          <ImageBackground source={require('@imgPath/btn-border-ddd.png')}
           style={rotateItemStyles.rotateTitleBtnSetting}  resizeMode={'cover'}>
            <Image resizeMethod="resize"  source={require('@imgPath/istop-icon.png')}
             style={rotateItemStyles.rotateListBtmIconToTopOther}   resizeMode={'contain'}></Image>
            <Text style={rotateItemStyles.rotateItemText}>置顶</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={rotateItemStyles.rotateListBtmBtn} onPress={that.changeSort.bind(this,"up")}>
          <ImageBackground source={require('@imgPath/btn-border-ddd.png')}
           style={rotateItemStyles.rotateTitleBtnSetting}  resizeMode={'cover'}>
            <Image resizeMethod="resize"  source={require('@imgPath/up-icon.png')}
             style={rotateItemStyles.rotateListBtmIconOther}   resizeMode={'contain'}></Image>
            <Text style={rotateItemStyles.rotateItemText}>上移</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={rotateItemStyles.rotateListBtmBtn} onPress={that.changeSort.bind(this,"down")}>
          <ImageBackground source={require('@imgPath/btn-border-ddd.png')}
           style={rotateItemStyles.rotateTitleBtnSetting}  resizeMode={'cover'}>
            <Image resizeMethod="resize"  source={require('@imgPath/down-icon.png')}
             style={rotateItemStyles.rotateListBtmIconOther}   resizeMode={'contain'}></Image>
            <Text style={rotateItemStyles.rotateItemText}>下移</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      {
        showOperateModal || false ? <AddRotateModal
          setting={modifyType==0?null:selectedSetting}
          onClose={this.onCanel.bind(this)}
          onSure={() => {
               that.initSettingInfoData();
          }}  /> :null
      }

      {
        showDeleteCheckModal || false ? <RotateSmallTipModal
          type={0}
          showTxt={selectedSetting.cardInfo.cardName}
          onCanel={() => {
            that.setState({showDeleteCheckModal :false});
          }}
          onSure={() => {
              that.deleteSetting();
              that.setState({showDeleteCheckModal :false});
          }}  /> :null
      }
     </View>

    )
  }




  initSettingInfoData() {
    let that = this;
    that.setState({ listState: ListStatus.loading, showOperateModal: false });
    getStoreDutysSetting(null)
      .then((o) => {
        if (!o.data || !o.data.length) {
          that.setState({
            listState: ListStatus.idle
          });
        } else {
          //保存/修改后可能引起数据不一致
          let selectIndex = this.state.selectIndex;
          let selectedSetting = this.state.selectedSetting;
          if(selectIndex<o.data.length){
            selectedSetting = o.data[selectIndex]
          }

          that.setState({
            datas: o.data,
            selectedSetting:selectedSetting,
            listState: ListStatus.idle
          });
        }
      })
      .catch((err) => {
        that.setState({ err: err, listState: ListStatus.error });
      });
  }

  addSetting() {
    this.setState({ showOperateModal: true,modifyType:0 });
  }

  editSetting(){
    this.setState({ showOperateModal: true,modifyType:1 });
  }

  deleteSetting(){
    let that = this;
    let currIndex = that.state.selectIndex;

    if(this.state.selectedSetting != null){
      let params = {
        _id : this.state.selectedSetting._id
      }
      deleteDutyTableSetting(params)
        .then((o) => {
          let realLength = o.data.length;
          if (!o.data || !realLength) {
            that.setState({
              listState: ListStatus.idle,
              datas :[],
              selectIndex:null,
              selectedSetting :null
            });
          } else {
            let resultSelectIndex = null;
            let resultSelectedSetting = null;
            if(realLength == 0){

            }else if (currIndex == realLength){
              resultSelectIndex = currIndex-1;
              resultSelectedSetting = o.data[resultSelectIndex];
            }else if ((currIndex+1) <= realLength){
              resultSelectIndex = currIndex;
              resultSelectedSetting = o.data[resultSelectIndex];
            }

            that.setState({
              datas: o.data,
              selectIndex:resultSelectIndex,
              selectedSetting :resultSelectedSetting,
              listState: ListStatus.idle
            });
          }
        })
        .catch((err) => {
          that.setState({ err: err, listState: ListStatus.error });
        });
    }
  }

  changeSort(type){
    let that = this;
    let checkStatus = true;
    let currIndex = that.state.selectIndex;
    let totalLength = that.state.datas.length;
    if(("up" == type || "uptotop" == type ) && 0 == currIndex){
      checkStatus = false;
    }
    if("down" == type && totalLength == currIndex+1){
      checkStatus = false;
    }

    if(this.state.selectedSetting != null && checkStatus){
      let params = {
        type : type,
        _id : this.state.selectedSetting._id
      }
      changeSortOfDutysSetting(params)
        .then((o) => {
          if (!o.data || !o.data.length) {
            that.setState({
              listState: ListStatus.idle
            });
          } else {
            let resultSelectIndex = that.state.selectIndex;
            if("up" == type){
              resultSelectIndex = resultSelectIndex -1;
            }else if ("down" == type){
              resultSelectIndex = resultSelectIndex +1;
            }else if ("uptotop" == type){
              resultSelectIndex = 0;
            }else if ("delete" == type){
              //resultSelectIndex = resultSelectIndex ;
            }
            let resultSelectedSetting = o.data[resultSelectIndex];
            that.setState({
              datas: o.data,
              selectIndex:resultSelectIndex,
              selectedSetting :resultSelectedSetting,
              listState: ListStatus.idle
            });
          }
        })
        .catch((err) => {
          that.setState({ err: err, listState: ListStatus.error });
        });
    }
  }




}


//mapping props
const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};


export const RotateSettingIndexActivity = connect(mapStateToProps, mapDispatchToProps)(RotateSetting);
