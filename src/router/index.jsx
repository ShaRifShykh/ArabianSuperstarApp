import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from './HomeStack';
import BottomStack from './BottomStack';
import {ArabianSuperStarContext} from '../context/ArabianSuperStarContext';

import NoInternetScreen from '../screens/NoInternetScreen';
import VideoScreen from '../screens/VideoScreen';

const Root = createStackNavigator();

const Router = () => {
  const {connected} = useContext(ArabianSuperStarContext);

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{headerShown: false}}>
        {connected ? (
          <>
            <Root.Screen component={HomeStack} name="HomeStack" />
            <Root.Screen component={BottomStack} name="BottomStack" />
            {/* Extra Route */}
            <Root.Screen component={VideoScreen} name="VideoScreen" />
          </>
        ) : (
          <>
            <Root.Screen component={NoInternetScreen} name="NoInternetScreen" />
          </>
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default Router;
