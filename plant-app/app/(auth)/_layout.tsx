import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Slot } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled" 
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;