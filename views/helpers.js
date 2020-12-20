import React from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

const SuperSafeView = ({safeStyle, kbdStyle, children}) => {
  return (
    <SafeAreaView style={safeStyle}>
      <KeyboardAvoidingView
        style={kbdStyle}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export {SuperSafeView};
