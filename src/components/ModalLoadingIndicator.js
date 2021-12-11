import React from 'react';
import {Modal} from 'react-native';

//self
import {LoadingIndicator} from "components";

export const ModalLoadingIndicator = ({
  text = '加载中...',
  showText = true,
  loading = true,
  size = 'large',
  color = '#cccccc',
}) => (
  <Modal
    transparent={true}
    animationType='none'
    visible={loading}
    onRequestClose={() => null}
  >
    <LoadingIndicator text = {text} showText={showText} loading={loading} size={size} color={color}/>
  </Modal>
);
