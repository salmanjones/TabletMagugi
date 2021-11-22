import React, { PureComponent } from 'react';
import { Text,  ImageBackground } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { PixelUtil } from 'utils';

import { manageConsumablesStyle } from 'styles';
export class DatepickerBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {date:new Date(),nowDate:new Date()}
	  }

	render() {
		return(
			<ImageBackground source={ require("@imgPath/input.png") } style={manageConsumablesStyle.DatepickerBox}>
				<Text style={manageConsumablesStyle.DatepickerText}>开单日期:</Text>
				<DatePicker
					style={manageConsumablesStyle.DatepickerInpBox}
					date={this.state.date}
					mode="date"
					placeholder="select date"
					format="YYYY-MM-DD"
					minDate="2016-01-01"
					maxDate={this.state.nowDate}
					confirmBtnText="确定"
					cancelBtnText="取消"
					customStyles={{
					dateIcon: {
						display: 'none'
					},
					dateInput: {
						backgroundColor: 'transparent',
						height: PixelUtil.size(66),
						flex: 0,
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
						borderWidth: 0,
						width:'100%',
						fontSize: PixelUtil.size(40),
						color: '#333',
						paddingLeft:PixelUtil.size(12),
					}

					}}
					onDateChange={(date) => {
						this.setState({date: date});
						const { onDateChange } = this.props;

						this.setState({ date: date }, () => {
							onDateChange(date);
						});
				    }}
				/>
			</ImageBackground>
		);
	}
}
