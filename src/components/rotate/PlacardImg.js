//轮牌-单牌-顶部图片
import React, { PureComponent } from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { getImage, ImageQutity } from 'utils';
import { rotateItemStyles } from 'styles';
export class PlacardImg extends PureComponent {
	render() {
		const { staffImg, orderAmt, isRed, setting } = this.props;
		let showRed=isRed ===1 && setting.redCardSetting === '0';
		return (
			<View style={rotateItemStyles.rotateItemImgBox}>
				{showRed ? (
					// 红牌
					<Image resizeMethod="resize"  source={require('@imgPath/rotate-warn-right.png')} style={rotateItemStyles.rotateImgWarn} />
				) : (
					false
				)}
				{orderAmt > 0 && (
					// 点客数
					<ImageBackground
						source={require('@imgPath/rotate-num.png')}
						style={rotateItemStyles.rotateImgNum}
					>
						<Text style={rotateItemStyles.rotateNumText}>{orderAmt}</Text>
					</ImageBackground>
				)}
				<Image resizeMethod="resize"
					// 头像
					source={getImage(staffImg, ImageQutity.staff, require('@imgPath/rotate-portrait.png'))}
					style={rotateItemStyles.rotateItemImg}
				/>
			</View>
		);
	}
}
