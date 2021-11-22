import React from 'react';
import { View, Modal, ActivityIndicator, Text } from 'react-native';

//self
import { modalLoadingStyles } from 'styles';

export const LoadingIndicator = ({
  text = '加载中...',
  showText = true,
  loading = true,
  size = 'large',
  color = '#cccccc',
}) => (
  
  <View style={modalLoadingStyles.modalBackground}>
    <View style={modalLoadingStyles.activityIndicatorWrapper}>
      <ActivityIndicator animating={loading} color={color} size={size} />
      {showText && <Text style={modalLoadingStyles.loadingText}>{text}</Text>}
    </View>
  </View>
  
);
