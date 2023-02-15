import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SignupScreen from '../screens/AuthScreen/SignupScreen';
import SignUpFormScreen from '../screens/AuthScreen/SignupScreen/SignUpFormScreen';
import PersonalDetailFormScreen from '../screens/AuthScreen/SignupScreen/PersonalDetailFormScreen';
import PersonalityDetailFormScreen from '../screens/AuthScreen/SignupScreen/PersonalityDetailFormScreen';
import BioFormScreen from '../screens/AuthScreen/SignupScreen/BioFormScreen';
import ProfilePictureFormScreen from '../screens/AuthScreen/SignupScreen/ProfilePictureFormScreen';
import ResetPasswordScreen from '../screens/AuthScreen/ResetPasswordScreen';
import ConfirmEmailScreen from '../screens/AuthScreen/SignupScreen/ConfirmEmailScreen';
import UploadVideoScreen from '../screens/UploadVideoScreen';
import UploadGalleryScreen from '../screens/UploadGalleryScreen';
import UploadUrlScreen from '../screens/UploadUrlScreen';
import AddGalleryScreen from '../screens/UploadGalleryScreen/AddGalleryScreen';
import UpdateGalleryScreen from '../screens/UploadGalleryScreen/UpdateGalleryScreen';
import AddVideoScreen from '../screens/UploadVideoScreen/AddVideoScreen';
import UpdateVideoScreen from '../screens/UploadVideoScreen/UpdateVideoScreen';
import AddUrlScreen from '../screens/UploadUrlScreen/AddUrlScreen.dart';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={SplashScreen} name="SplashScreen" />
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={SignupScreen} name="SignupScreen" />
      <Stack.Screen component={SignUpFormScreen} name="SignUpFormScreen" />
      <Stack.Screen component={ConfirmEmailScreen} name="ConfirmEmailScreen" />
      <Stack.Screen
        component={PersonalDetailFormScreen}
        name="PersonalDetailFormScreen"
      />
      <Stack.Screen
        component={PersonalityDetailFormScreen}
        name="PersonalityDetailFormScreen"
      />
      <Stack.Screen component={BioFormScreen} name="BioFormScreen" />

      <Stack.Screen component={UploadVideoScreen} name="UploadVideoScreen" />
      <Stack.Screen component={AddVideoScreen} name="AddVideoScreen" />
      <Stack.Screen component={UpdateVideoScreen} name="UpdateVideoScreen" />

      <Stack.Screen
        component={UploadGalleryScreen}
        name="UploadGalleryScreen"
      />
      <Stack.Screen component={AddGalleryScreen} name="AddGalleryScreen" />
      <Stack.Screen
        component={UpdateGalleryScreen}
        name="UpdateGalleryScreen"
      />

      <Stack.Screen component={UploadUrlScreen} name="UploadUrlScreen" />
      <Stack.Screen component={AddUrlScreen} name="AddUrlScreen" />

      <Stack.Screen
        component={ProfilePictureFormScreen}
        name="ProfilePictureFormScreen"
      />
      <Stack.Screen
        component={ResetPasswordScreen}
        name="ResetPasswordScreen"
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
