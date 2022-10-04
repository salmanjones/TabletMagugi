//轮牌-单牌-底部
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { rotateItemStyles, rotateModalStyle } from '../../styles';
export class PlacardTimer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			time: '00:00:00'
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.interval && clearInterval(this.interval);

		if (nextProps.startTimeL) {
			this.setState({
				time: this.calculate(nextProps.startTimeL)
			});
		}

		if (nextProps.elapse) {
			let that = this;
			this.interval = setInterval(() => {
				that.setState({
					time: that.calculate(this.props.startTimeL)
				});
			}, 1000);
		}
	}
	UNSAFE_componentWillMount() {
		const that = this;
		const { startTimeL, elapse } = this.props;

		if (startTimeL) {
			that.setState({
				time: that.calculate(startTimeL)
			});
		}

		if (elapse) {
			this.interval = setInterval(() => {
				that.setState({
					time: that.calculate(startTimeL)
				});
			}, 1000);
		}
	}

	render() {
		const { startTimeL, elapse, big,color } = this.props;
		const { time } = this.state;
		let styles=[];

		Boolean(big)?styles.push(rotateModalStyle.rotateBodyROText):styles.push(rotateItemStyles.rotateItemText);
		if(color) styles.push(rotateItemStyles.rotateBtmLabelT)

		return <Text style={styles}>{time}</Text>;
	}
	componentWillUnmount() {
		this.interval && clearInterval(this.interval);
		console.log("timer is dispose");
	}

	calculate(startTimeL) {
		let endTime = new Date();
		let timeDiff = endTime.getTime() - startTimeL;

		timeDiff /= 1000;
		let seconds = Math.floor(timeDiff % 60);
		timeDiff = Math.floor(timeDiff / 60);
		let minutes = Math.round(timeDiff % 60);
		timeDiff = Math.floor(timeDiff / 60);
		let hours = timeDiff;

		let hoursStr=hours<10?'0'+hours:hours.toString()
		let minutesStr=minutes<10?'0'+minutes:minutes.toString()
		let secondsStr=seconds<10?'0'+seconds:seconds.toString()

		return hoursStr + ':' + minutesStr + ':' + secondsStr;
	}
}
