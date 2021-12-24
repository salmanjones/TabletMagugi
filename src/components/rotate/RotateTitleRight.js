//轮牌首页-右标题
import React from 'react';
import { View, Text, TouchableHighlight, InteractionManager ,Alert} from 'react-native';

import { rotateItemStyles } from '../../styles';
import { resetDutyStaffs, checkResource } from '../../services';
import { RotateSmallTipModal } from '../../components';
export class RotateTitleRight extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			hasResource: false,
			showTips:false
		};
		this.tips = null;
	}

	componentDidMount() {
		let that = this;
		checkResource()
			.then((backData) => {
				if (backData.data == '0') {
					that.setState({
						hasResource: true
					});
				}
			})
			.catch(() => {});
	}

	hasRight = () => {
		return this.state.hasResource;
	};

	settingCard = () => {
		this.props.navigation.navigate('RotateSettingActivity');
	};

	resetCard = () => {
		let that=this;
		this.setState({showTips:false});

		InteractionManager.runAfterInteractions(() => {
			resetDutyStaffs()
			.then((backData) => {
				that.props.navigation.replace('RotatePlacardActivity');
			}).catch(() => {});

		});

	};

	render() {
		let that = this;
		const {showTips}=this.state;
		return (
			<View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
				{/* {that.state.hasResource ? (
					// <TouchableHighlight
					// 	onPress={() => {
					// 		this.setState({showTips:true})
					// 		// Alert.alert(
					// 		// 	null,
					// 		// 	'确定要将全部轮牌洗牌吗？',
					// 		// 	[								  {
					// 		// 		text: '取消',
					// 		// 		style: 'cancel',
					// 		// 	  },
					// 		// 	  {
					// 		// 		text: '确定',
					// 		// 		onPress: () => {
					// 		// 			resetDutyStaffs()
					// 		// 			.then((backData) => {
					// 		// 				that.props.navigation.replace('RotatePlacardActivity');
					// 		// 			}).catch(() => {});
					// 		// 		},
					// 		// 	  },
					// 		// 	],
					// 		// 	{
					// 		// 	  cancelable: false,
					// 		// 	}
					// 		//   );
					// 	}}
					// 	underlayColor="transparent"
					// >
					// 	<Text style={rotateItemStyles.rotateText}>一键洗牌</Text>
					// </TouchableHighlight>
				) : null} */}
				{that.state.hasResource ? (
					<TouchableHighlight underlayColor="transparent" onPress={this.settingCard}>
						<Text style={rotateItemStyles.rotateText}>设置</Text>
					</TouchableHighlight>
				) : null}
				{showTips && <RotateSmallTipModal
					ref={(ref) => (this.tips = ref)}
					type={1}
					showTxt={''}
					//visible={false}
					onCanel={() => {
						this.setState({showTips:false})
					}}
					onSure={this.resetCard}
				/>}
			</View>
		);
	}
}
