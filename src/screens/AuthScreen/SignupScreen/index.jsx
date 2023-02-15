import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MainButton from '../../../components/MainButton';
import COLORS from '../../../constant/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SignupScreen = ({navigation}) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <View style={styles.imgContainer}>
        <Image source={require('../../../../assets/logos/black-logo.png')} />
      </View>

      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <Text style={{marginVertical: 20, color: COLORS.BLACK}}>
          Or Sign up with{' '}
        </Text>

        <MainButton
          text={'Sign Up'}
          onPress={() => {
            navigation.navigate('SignUpFormScreen');
          }}
        />

        <View style={styles.socialLoginContainer}>
          <View style={styles.socialContainer}>
            <AntDesign name={'google'} size={24} color={'red'} />
          </View>
          <View style={styles.socialContainer}>
            <EvilIcons name={'sc-facebook'} size={38} color={'blue'} />
          </View>
          <View style={styles.socialContainer}>
            <AntDesign name={'twitter'} size={24} color={'skyblue'} />
          </View>
        </View>

        <Text
          style={{
            textAlign: 'center',
            marginVertical: 10,
            color: COLORS.BLACK,
          }}>
          Already have an Account?{' '}
          <Text
            style={{color: COLORS.RED, fontWeight: 'bold'}}
            onPress={() => {
              navigation.replace('LoginScreen');
            }}>
            Login Now
          </Text>
        </Text>

        <View style={styles.footerLogoContainer}>
          <Image source={require('../../../../assets/logos/logo.png')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  imgContainer: {
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 22,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'right',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
  socialContainer: {
    width: 60,
    height: 60,
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLogoContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
});

export default SignupScreen;
