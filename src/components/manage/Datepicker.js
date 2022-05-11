import React from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import {manageConsumablesStyle} from '../../styles';

export class DatepickerBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            date:new Date(),
            nowDate:new Date(),
            showDatePicker: false,
        }
    }

	render() {
        let showDate = moment(this.state.date).format('YYYY-MM-DD')
		return(
			<ImageBackground source={ require("@imgPath/input.png") } style={manageConsumablesStyle.DatepickerBox}>
				<Text style={manageConsumablesStyle.DatepickerText}>开单日期:</Text>
                <TouchableOpacity style={manageConsumablesStyle.DatepickerInput}
                    onPress={() => {
                        this.setState({showDatePicker: true});
                    }}
                >
                    <Text style={manageConsumablesStyle.DatepickerInputTxt}>
                        {showDate}
                    </Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    title="选择开单日期"
                    open={this.state.showDatePicker}
                    date={this.state.date}
                    minimumDate={new Date("2016-06-01")}
                    maximumDate={new Date()}
                    format="YYYY-MM-DD"
                    mode="date"
                    locale="zh-Hans"
                    confirmText="确定"
                    cancelText="取消"
                    onConfirm={(date) => {
                        const { onDateChange } = this.props;
                        this.setState({ date: date , showDatePicker: false}, () => {
                            onDateChange(moment(date).format('YYYY-MM-DD'));
                        });
                    }}
                    onCancel={() => {
                        this.setState({showDatePicker: false})
                    }}
                />
			</ImageBackground>
		);
	}
}
