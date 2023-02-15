import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import COLORS from '../../constant/Colors';
import {TOKEN} from '../../constant/StorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';

const SplashScreen = ({navigation}) => {
  const {user} = useContext(ArabianSuperStarContext);

  useEffect(() => {
    setTimeout(async () => {
      let isLoggedIn = await AsyncStorage.getItem(TOKEN);

      if (isLoggedIn) {
        if (user != null) {
          if (user.emailVerifiedAt === null) {
            navigation.replace('ConfirmEmailScreen');
          } else if (
            user.country === null ||
            user.gender === null ||
            user.date_of_birth === null
          ) {
            navigation.replace('PersonalDetailFormScreen');
          } else if (user.hobbies === null) {
            navigation.replace('PersonalityDetailFormScreen');
          } else if (user.bio === null) {
            navigation.replace('BioFormScreen');
          } else if (user.profilePhoto === null) {
            navigation.replace('ProfilePictureFormScreen');
          } else {
            navigation.replace('BottomStack');
          }
        }
      } else {
        navigation.replace('LoginScreen');
      }
    }, 5000);
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logos/black-logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
