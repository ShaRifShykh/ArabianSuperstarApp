import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {verticalScale} from '../../constant/Metrics';

const NoInternetScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/vector/noInternet.png')}
        style={{
          width: '100%',
          height: verticalScale(400),
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default NoInternetScreen;
