import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import UserProfileScreen from '../screens/UserProfileScreen';
import CommentScreen from '../screens/CommentScreen';
import VotePackagesScreen from '../screens/VotePackagesScreen';
import CardDetailScreen from '../screens/CheckoutScreen/CardDetailScreen';
import CardInfoScreen from '../screens/CheckoutScreen/CardInfoScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import FAQScreen from '../screens/FAQScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ContactScreen from '../screens/ContactScreen';
import HowItWorkScreen from '../screens/HowItWorkScreen';
import VideoScreen from '../screens/VideoScreen';
import EditGenderScreen from '../screens/EditProfileScreen/EditGenderScreen';

const Main = createStackNavigator();

const MainStack = () => {
  return (
    <Main.Navigator screenOptions={{headerShown: false}}>
      <Main.Screen component={UserProfileScreen} name="UserProfileScreen" />
      <Main.Screen component={CommentScreen} name="CommentScreen" />
      <Main.Screen component={EditProfileScreen} name="EditProfileScreen" />
      <Main.Screen component={EditGenderScreen} name="EditGenderScreen" />
      <Main.Screen component={HowItWorkScreen} name="HowItWorkScreen" />
      <Main.Screen component={ContactScreen} name="ContactScreen" />
      <Main.Screen component={FAQScreen} name="FAQScreen" />
      <Main.Screen
        component={TermsAndConditionScreen}
        name="TermsAndConditionScreen"
      />

      {/* Votes Route */}
      <Main.Screen component={VotePackagesScreen} name="VotePackagesScreen" />
      <Main.Screen component={CardDetailScreen} name="CardDetailScreen" />
      <Main.Screen component={CardInfoScreen} name="CardInfoScreen" />
    </Main.Navigator>
  );
};

export default MainStack;
