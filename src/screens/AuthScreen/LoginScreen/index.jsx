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
import MainButton from '../../../components/MainButton';
import COLORS from '../../../constant/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../../components/Loader';
import {ArabianSuperStarContext} from '../../../context/ArabianSuperStarContext';
import {Dialog, Portal} from 'react-native-paper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../constant/Metrics';
import Colors from '../../../constant/Colors';

const LoginScreen = ({navigation}) => {
  const {login, authLoading} = useContext(ArabianSuperStarContext);

  const [inputs, setInputs] = useState({email: '', password: ''});

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    error: null,
  });
  const [showError, setShowError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const hideDialog = () => setShowError(false);

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const submit = async () => {
    Keyboard.dismiss();
    await login({
      email: inputs.email,
      password: inputs.password,
    }).then(val => {
      if (val.status === 200) {
        navigation.replace('BottomStack');
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
            {errors.email !== null ? (
              <>
                <Text style={{color: Colors.BLACK}} variant="bodyMedium">
                  {errors.email}
                </Text>
              </>
            ) : null}
            {errors.password !== null ? (
              <>
                <Text style={{color: Colors.BLACK}} variant="bodyMedium">
                  {errors.password}
                </Text>
              </>
            ) : null}
            {errors.error !== null ? (
              <>
                <Text style={{color: Colors.BLACK}} variant="bodyMedium">
                  {errors.error}
                </Text>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={styles.imgContainer}>
        <Image source={require('../../../../assets/logos/black-logo.png')} />
      </View>

      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.heading}>Login</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="email-address"
            placeholderTextColor={COLORS.INACTIVEGREY}
            style={styles.input}
            placeholder="Email"
            value={inputs.email}
            onChangeText={text => handleOnchange(text, 'email')}
          />

          <View style={styles.inputPasswordContainer}>
            <TextInput
              secureTextEntry={hidePassword}
              style={styles.inputWithoutBorder}
              placeholder="Password"
              placeholderTextColor={COLORS.INACTIVEGREY}
              value={inputs.password}
              onChangeText={text => handleOnchange(text, 'password')}
            />

            <TouchableOpacity
              onPress={() => {
                setHidePassword(!hidePassword);
              }}>
              <FontAwesome5
                name={hidePassword ? 'eye-slash' : 'eye'}
                size={moderateScale(18)}
                color={'grey'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ResetPasswordScreen');
          }}
          style={{marginBottom: verticalScale(30)}}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <MainButton text={'Login'} onPress={submit} />

        <Text style={{textAlign: 'center', marginTop: 10, color: COLORS.BLACK}}>
          or login with
        </Text>

        <View style={styles.socialLoginContainer}>
          <View style={styles.socialContainer}>
            <AntDesign name={'google'} size={moderateScale(24)} color={'red'} />
          </View>
          <View style={styles.socialContainer}>
            <FontAwesome
              name={'facebook-f'}
              size={moderateScale(26)}
              color={'#3b5998'}
            />
          </View>
          <View style={styles.socialContainer}>
            <AntDesign
              name={'twitter'}
              size={moderateScale(24)}
              color={'skyblue'}
            />
          </View>
        </View>

        <Text
          style={{
            textAlign: 'center',
            marginVertical: verticalScale(10),
            color: COLORS.BLACK,
          }}>
          Don’t have an account?{' '}
          <Text
            style={{color: COLORS.RED, fontWeight: 'bold'}}
            onPress={() => {
              navigation.replace('SignupScreen');
            }}>
            Sign Up Now
          </Text>
        </Text>

        <View style={styles.footerLogoContainer}>
          <Image
            source={require('../../../../assets/logos/logo.png')}
            style={{width: '80%', height: 80}}
            resizeMode="contain"
          />
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
  inputPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
    marginVertical: verticalScale(10),
  },
  input: {
    color: COLORS.BLACK,
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 1,
    marginVertical: verticalScale(10),
    color: COLORS.BLACK,
  },
  inputWithoutBorder: {
    color: COLORS.BLACK,
    flex: 1,
  },
  linkText: {
    textAlign: 'right',
    color: COLORS.BLACK,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(30),
  },
  socialContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLogoContainer: {
    marginTop: verticalScale(30),
    alignItems: 'center',
  },
});

export default LoginScreen;
