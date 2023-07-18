import React from 'react';
import {ButtonGroup} from 'react-native-elements';
import {RechargeStoredCardStyles, tabGroupStyles} from '../styles';
import {ImageBackground} from "react-native";

export class TabGroup extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selectedIndex != this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex,
            });
        }
    }

    switchTab = selectedIndex => {
        this.setState({selectedIndex});
        this.props.onSelected(selectedIndex);
    };

    render() {
        const {data, displayField, onSelected} = this.props;
        const {selectedIndex} = this.state;

        const bindData = data.map(x => {
            return typeof x === 'string' ? x : x[displayField];
        });

        return (
            <ButtonGroup
                onPress={this.switchTab}
                selectedIndex={selectedIndex}
                buttons={bindData}
                containerStyle={tabGroupStyles.containerStyle}
                buttonStyle={tabGroupStyles.buttonStyle}
                selectedButtonStyle={tabGroupStyles.selectedButtonStyle}
                textStyle={tabGroupStyles.textStyle}
                selectedTextStyle={tabGroupStyles.selectedTextStyle}
                underlayColor={'transparent'}
            />

        );
    }
}
