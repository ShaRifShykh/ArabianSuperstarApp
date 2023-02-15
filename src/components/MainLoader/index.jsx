import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../constant/Colors';

const MainLoader = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={Colors.MAIN1} />
    </View>
  );
};

export default MainLoader;
