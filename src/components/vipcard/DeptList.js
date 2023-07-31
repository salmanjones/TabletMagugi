import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';

import {openCardAccountStyle} from '../../styles';
import {PixelUtil} from '../../utils';

class DeptListComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        const {deptList = [], cardInfo} = this.props;
        const categoryId = cardInfo['projectCategroyId']
        const depts = deptList.filter(x => x.categoryId.split(",").indexOf(categoryId) != -1)
        this.state = {
            deptId: depts.length ? depts[0].id : 0,
        };
    }

    onChecked = deptId => {
        this.setState({deptId});
        const {onChecked} = this.props;
        onChecked && onChecked(deptId);
    };

    componentDidMount() {
        const {deptId} = this.state;
        if (deptId) {
            const {onChecked} = this.props;
            onChecked && onChecked(deptId);
        }
    }

    render() {
        const {deptList = [], categoryId} = this.props;
        const {deptId} = this.state;

        return (
            <View style={openCardAccountStyle.chooseCardGenreBox}>
                <Text style={openCardAccountStyle.cardGenreTitleText}>服务部门：</Text>
                <View style={openCardAccountStyle.cardGenreCheckbox}>
                    {deptList.map((x, index) => {
                        return (
                            <CheckBox
                                left
                                key={x.id}
                                iconType='materialdesignicons'
                                checkedIcon="radio-button-checked"
                                uncheckedIcon="radio-button-unchecked"
                                checked={
                                    (deptId === 0 && categoryId == x.categoryId) || deptId === x.id
                                }
                                onPress={() => this.onChecked(x.id)}
                                size={PixelUtil.size(32)}
                                containerStyle={openCardAccountStyle.checkBoxContainer}
                                textStyle={openCardAccountStyle.checkBoxText}
                                checkedColor={'#111c3c'}
                                uncheckedColor={'#111c3c'}
                                title={x.name}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const {auth} = state;
    return {
        deptList: auth.userInfo.deptInfos,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export const DeptList = connect(mapStateToProps, mapDispatchToProps)(
    DeptListComponent
);
