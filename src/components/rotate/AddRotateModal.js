// 上牌弹层
import React from 'react';
import {ImageBackground, Modal, ScrollView, Text, TextInput, TouchableOpacity, View,} from 'react-native';

import {CheckBox} from 'react-native-elements';
import {rotateBigModalStyle} from '../../styles';
import {displayError, showMessage} from '../../utils';
import {modifyStoreDutysSetting} from '../../services';

export class RuleItem extends React.PureComponent {
	constructor(props) {
		super(props);
		let val = props.val;

		this.state = {
			val:val?val:props.valTrue,
			title: props.title,
			valTrue: props.valTrue,
			valFalse: props.valFalse,
			titleTrue: props.titleTrue,
			titleFalse: props.titleFalse,
			remark:props.remark
		};
  }
	/*
	*上牌顺序： 正序 倒序  说明：正序时则按添加顺序，依次向后排列；倒序时按添加顺序，依次向前排列
	*服务计时： 是 否   说明：是否计时服务
	*临休计时： 是 否  说明：临休是否计时
	*启用红牌： 是 否   说明：启用红牌时，则两次红牌后自动跳牌
	*/
    render() {
	  let valTrue =  this.props.valTrue;
	  let valFalse =  this.props.valFalse;
	  let that = this;
	  let val = this.props.val;
    return (
      <View style={rotateBigModalStyle.rotateModalRuleRow}>
	  	<Text style={rotateBigModalStyle.rotateModalText}>{this.props.title}</Text>
		  <View style={rotateBigModalStyle.rotateModalRuleRow}>
			<CheckBox
				center
				title={this.props.titleTrue}
				iconType = 'materialdesignicons'
				checkedIcon="radio-button-checked"
				uncheckedIcon="radio-button-unchecked"
				containerStyle={rotateBigModalStyle.rotateModalRuleCheckbox}
				textStyle={rotateBigModalStyle.rotateModalRuleText}
				checkedColor={'#111c3c'}
				uncheckedColor={'#999'}
				checked={val === valTrue}
				onPress={() => {
					           that.setState({ val :  valTrue });
				               that.props.onCheck(valTrue);
			            }}
			/>
			<CheckBox
				center
				title={this.state.titleFalse}
				iconType = 'materialdesignicons'
				checkedIcon="radio-button-checked"
				uncheckedIcon="radio-button-unchecked"
				containerStyle={rotateBigModalStyle.rotateModalRuleCheckbox}
				textStyle={rotateBigModalStyle.rotateModalRuleText}
				checkedColor={'#111c3c'}
				uncheckedColor={'#999'}
				checked={val === valFalse}
				onPress={() => {
					that.setState({ val :  valFalse });
					that.props.onCheck(valFalse);
			   }}
			/>
		</View>
		<Text style={rotateBigModalStyle.rotateModalRuleTip}> {this.props.remark}</Text>
	  </View>
    )
  }
}



export class AddRotateModal extends React.Component {

	constructor(props) {
		super(props);
		let setting = this.props.setting;
		let cardInfo = setting?setting.cardInfo:null;
		this.state = {
				_id:cardInfo?setting._id:"",
				cardName: cardInfo?cardInfo.cardName:"",
				type: cardInfo?cardInfo.type:"0",
				status:cardInfo?cardInfo.status:"0",
				addSort:cardInfo?cardInfo.addSort:"1",
				saveSort:cardInfo ? cardInfo.saveSort:'0',
				lastRotate:cardInfo ? (cardInfo.lastRotate?cardInfo.lastRotate:'1'):'1',
				serviceTiming:cardInfo?cardInfo.serviceTiming:"0",
				restTiming:cardInfo?cardInfo.restTiming:"0",
				redCardSetting: cardInfo?cardInfo.redCardSetting:"0",
				staffInfo:cardInfo && setting.staffInfo?setting.staffInfo:[],
				cardNameBg:require('@imgPath/resetpwd-checkcode.png')
			};
  	}



  render() {
		let that = this;
		let typeStatus = this.state.type == "1"?true:false;
    return (

			<Modal transparent={true} onRequestClose={() => null} >
					<View style={rotateBigModalStyle.modalBackground}>
									<View style={rotateBigModalStyle.rotateWrapper}>
							<View style={rotateBigModalStyle.rotateModalTitle}>
								<Text style={rotateBigModalStyle.rotateModalText}>添加轮牌</Text>
							</View>
							<ScrollView style={rotateBigModalStyle.rotateModalRule}>
								<View style={rotateBigModalStyle.rotateModalRuleName}>
									<View style={rotateBigModalStyle.rotateModalRuleRow}>
										<Text style={rotateBigModalStyle.rotateModalText}>轮牌名称:</Text>
										<ImageBackground style={rotateBigModalStyle.rotateModalRuleNameTapBg} source={ this.state.cardNameBg}>
											<TextInput style={rotateBigModalStyle.rotateModalRuleNameTap}
												underlineColorAndroid="transparent"
												placeholder=""
												maxLength={ 32 }
												onFocus={() => {
													that.setState({ cardNameBg : require('@imgPath/resetpwd-checkcode-active.png') });
												 }}
												onBlur={() => {
													that.setState({ cardNameBg : require('@imgPath/resetpwd-checkcode.png') });
												 }}
												defaultValue={this.state.cardName}
											    onChangeText={(cardNameTxt) => {
													that.setState({ cardName :  cardNameTxt });
											   }}
												placeholderTextColor="#9C9C9C">
											</TextInput>
										</ImageBackground>
									</View>
									<CheckBox
										center
										title='是否站门牌'
										iconType = 'materialdesignicons'
										checkedIcon="check-box"
										uncheckedIcon="check-box-outline-blank"
										containerStyle={rotateBigModalStyle.rotateModalRuleCheckbox}
										textStyle={rotateBigModalStyle.rotateModalText}
										checkedColor={'#111c3c'}
										uncheckedColor={'#999'}
										onPress={this.typeStatChange.bind(this)}
										checked={typeStatus}
									/>
								</View>
								<RuleItem  val={ this.state.status} title="是否启用:" valTrue ={"0"} valFalse={"-1"}   titleTrue ="启用" titleFalse = "停用" onCheck = {(val) => { that.setState({ status : val});}}  remark= "说明：是否启用当前轮牌"/>
								<RuleItem  val={ this.state.addSort} title="上牌顺序:" valTrue ={"1"} valFalse={"-1"}  titleTrue ="正序" titleFalse = "倒序" onCheck = {(val) => { that.setState({ addSort : val});}}  remark= "说明：正序时则按添加顺序，依次向后排列；倒序时按添加顺序，依次向前排列"  />
								{!typeStatus ?<RuleItem  val={ this.state.lastRotate} title="继续昨日轮牌:" valTrue ={"0"} valFalse={"1"}  titleTrue ="是" titleFalse = "否" onCheck = {(val) => { that.setState({ lastRotate : val});}}  remark= "说明：当继续昨日轮牌时，一键下牌不会对该轮牌执行下牌操作"  />:null}
								{!typeStatus ?<RuleItem  val={ this.state.serviceTiming} title="服务计时:" valTrue ={"0"} valFalse={"-1"}    titleTrue ="是" titleFalse = "否" onCheck = {(val) => { that.setState({ serviceTiming : val});}} remark= "说明：是否计时服务"/> :null}
								{!typeStatus || false ?<RuleItem  val={ this.state.restTiming} title="临休计时:" valTrue ={"0"} valFalse={"-1"}  titleTrue ="是" titleFalse = "否" onCheck = {(val) => { that.setState({ restTiming : val});}} remark= "说明：临休是否计时"/>:null}
								{!typeStatus || false ?<RuleItem  val={ this.state.redCardSetting} title="启用红牌:" valTrue ={"0"} valFalse={"-1"}  titleTrue ="是" titleFalse = "否" onCheck = {(val) => { that.setState({ redCardSetting : val});}} remark= "说明：启用红牌时，则两次红牌后自动跳牌"/>	:null}
							</ScrollView>
							<View style={rotateBigModalStyle.modalBtm}>
								<TouchableOpacity style={[rotateBigModalStyle.modalBtmBtn,rotateBigModalStyle.modalCancelBtn]}  onPress={this.onClose.bind(this)}>
								<Text style={rotateBigModalStyle.modalBtmBtnText}>取消</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[rotateBigModalStyle.modalBtmBtn,rotateBigModalStyle.modalSuccessBtn]} onPress={this.onSure.bind(this)}>
								<Text style={rotateBigModalStyle.modalBtmBtnText} >保存</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
			</Modal>
    );
	}

	onClose = () => {
		this.props.onClose();
	};
	onSure  = () => {
		 let cardSettingInfo = {
			_id : this.state._id,
			cardName : this.state.cardName,
			type : this.state.type,
			status : this.state.status,
			addSort : this.state.addSort,
			saveSort : this.state.saveSort,
			lastRotate: this.state.lastRotate,
			serviceTiming : this.state.serviceTiming,
			restTiming : this.state.restTiming,
			redCardSetting : this.state.redCardSetting
		  };

		  if (cardSettingInfo.status == '-1' && this.state.staffInfo.length>0){
			showMessage('该轮牌正在使用中，不能停用！请在员工下牌后再操作', true);
			return;
		  }

		  if(cardSettingInfo.cardName.length<1){
			showMessage('门牌名称不能为空', true);
			this.setState(()=>{
			    cardNameBg = DefData.inputBgActive;
			})
			return;
		  }

		  modifyStoreDutysSetting(cardSettingInfo).then(backData => {
			this.props.onSure();
		  }).catch(err => {
			displayError(err, '', true);
		  });

	};

	typeStatChange = () => {
		let type = this.state.type;
		this.setState({type : type=="1"?"0":"1"});
	};

}
const DefData = {
	inputBg:require('@imgPath/input.png'),
	inputBgActive:require('@imgPath/input-active.png')
}
