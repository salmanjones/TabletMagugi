import React from 'react';
import { MemberIdentify } from '../../components';

export class IdentifyActivity extends React.Component {
  render() {
    const { navigation } = this.props;
    return <MemberIdentify navigation={navigation} />;
  }
}
