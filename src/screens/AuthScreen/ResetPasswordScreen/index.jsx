import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TextInput} from 'react-native';
import MainButton from '../../../components/MainButton';
import COLORS from '../../../constant/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../constant/Metrics';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={{paddingTop: verticalScale(70)}}>
        <Text
          style={[
            styles.text,
            {fontSize: moderateScale(28), fontWeight: 'bold'},
          ]}>
          Reset Password
        </Text>
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Enter your registered email</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.footer}>
        <View>
          <MainButton
            style={styles.btnContainer}
            text={'Send'}
            onPress={() => {
              console.log('Asdas');
            }}
          />
        </View>

        <View style={styles.footerLogoContainer}>
          <Image
            source={require('../../../../assets/logos/logo.png')}
            style={{width: '80%', height: 80}}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(30),
  },
  text: {
    color: COLORS.BLACK,
  },
  textFieldContainer: {
    paddingVertical: verticalScale(10),
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderColor: COLORS.RED,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
  },
  footerLogoContainer: {
    marginTop: verticalScale(30),
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ResetPasswordScreen;
