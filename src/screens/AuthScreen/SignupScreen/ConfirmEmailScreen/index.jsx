import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import MainButton from '../../../../components/MainButton';
import COLORS from '../../../../constant/Colors';
import Loader from '../../../../components/Loader';
import {ArabianSuperStarContext} from '../../../../context/ArabianSuperStarContext';
import {Dialog, Portal} from 'react-native-paper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../constant/Metrics';
import Colors from '../../../../constant/Colors';

const ConfirmEmailScreen = ({navigation}) => {
  const {authLoading, resendEmailVerificationCode, verifyEmail} = useContext(
    ArabianSuperStarContext,
  );

  const [code, setCode] = useState(null);
  const [errors, setErrors] = useState({
    error: null,
  });
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hideDialog = () => setShowError(false);
  const hideSuccess = () => setShowSuccess(false);

  const onResend = async () => {
    await resendEmailVerificationCode().then(val => {
      if (val.status === 200) {
        setShowSuccess(!showSuccess);
      }
    });
  };

  const submit = async () => {
    Keyboard.dismiss();

    await verifyEmail({
      code: code,
    }).then(val => {
      if (val.status === 200) {
        navigation.navigate('PersonalDetailFormScreen');
      } else if (val.response.status === 400) {
        setShowError(true);
        setErrors(val.response.data.errors);
      } else {
        console.log(val.response);
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: verticalScale(20)}}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <Loader visible={authLoading} />

      <Portal>
        <Dialog
          style={{backgroundColor: COLORS.WHITE}}
          visible={showError}
          onDismiss={hideDialog}>
          <Dialog.Title style={{textAlign: 'center'}}>Error!</Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                color: Colors.RED,
                display: errors.error !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.error}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{backgroundColor: COLORS.WHITE}}
          visible={showSuccess}
          onDismiss={hideSuccess}>
          <Dialog.Content>
            <Text
              style={{
                color: Colors.BLACK,
              }}
              variant="bodyMedium">
              Verification code send successfully!
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={styles.imgContainer}>
        <Image source={require('../../../../../assets/logos/black-logo.png')} />
      </View>

      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.heading}>Confirm Email</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="numeric"
            placeholderTextColor={COLORS.INACTIVEGREY}
            style={styles.input}
            placeholder="Code"
            value={code}
            onChangeText={setCode}
          />
        </View>

        <TouchableOpacity
          onPress={onResend}
          style={{marginBottom: verticalScale(30)}}>
          <Text style={styles.linkText}>Resend Verification Code!</Text>
        </TouchableOpacity>

        <MainButton text={'Verify Email'} onPress={submit} />

        <View style={styles.footerLogoContainer}>
          <Image source={require('../../../../../assets/logos/logo.png')} />
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
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(30),
  },
  heading: {
    fontSize: moderateScale(22),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingVertical: verticalScale(20),
  },
  input: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
    marginVertical: verticalScale(10),
    color: COLORS.BLACK,
  },
  linkText: {
    textAlign: 'right',
    color: COLORS.BLACK,
  },

  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default ConfirmEmailScreen;
