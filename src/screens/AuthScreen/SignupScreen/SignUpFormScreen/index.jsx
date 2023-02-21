import React, {useContext, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import COLORS from '../../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainButton from '../../../../components/MainButton';
import PhoneInput from 'react-native-phone-number-input';
import {ArabianSuperStarContext} from '../../../../context/ArabianSuperStarContext';
import Loader from '../../../../components/Loader';
import {Dialog, Portal} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {moderateScale, verticalScale} from '../../../../constant/Metrics';

const SignUpFormScreen = ({navigation}) => {
  const {signUp, authLoading} = useContext(ArabianSuperStarContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const phoneInput = useRef(null);

  const [errors, setErrors] = useState({
    full_name: null,
    username: null,
    email: null,
    phone_no: null,
    password: null,
    error: null,
  });
  const [showError, setShowError] = useState(false);
  const [valid, setValid] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const hideDialog = () => setShowError(false);

  const hideValidDialog = () => setValid(false);

  const submit = async () => {
    Keyboard.dismiss();

    const checkValid = phoneInput.current?.isValidNumber(phoneNo);

    if (checkValid) {
      await signUp({
        fullName: name,
        username: username,
        email: email,
        phoneNo: phoneNo,
        password: password,
        confirmPassword: confirmPassword,
      }).then(val => {
        if (val.status === 200) {
          navigation.navigate('ConfirmEmailScreen');
        } else if (val.response.status === 400) {
          setShowError(true);
          setErrors(val.response.data.errors);
        } else {
          console.log(val.response);
        }
      });
    } else {
      setValid(!valid);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{paddingBottom: 30}}>
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
                color: COLORS.RED,
                display: errors.full_name !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.full_name}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.username !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.username}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.email !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.email}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.phone_no !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.phone_no}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.password !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.password}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
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
          visible={valid}
          onDismiss={hideValidDialog}>
          <Dialog.Title style={{textAlign: 'center'}}>Error!</Dialog.Title>
          <Dialog.Content>
            <Text style={{color: COLORS.RED}} variant="bodyMedium">
              Invalid Phone Number!
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <TouchableOpacity
        style={styles.appBar}
        onPress={() => {
          navigation.goBack();
        }}>
        <MaterialIcons name="arrow-back-ios" size={25} />
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          keyboardType="default"
          style={styles.input}
          value={name}
          onChangeText={val => {
            setName(val);
            if (val != '') {
              let range = Math.floor(Math.random() * 99999).toString();
              setUsername(val.replace(/\s/g, '') + range);
            } else {
              setUsername('');
            }
          }}
        />
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          keyboardType="default"
          editable={false}
          selectTextOnFocus={false}
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Mobile Number</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNo}
          defaultCode="AE"
          layout="first"
          textInputStyle={{paddingVertical: 0, color: COLORS.BLACK}}
          flagButtonStyle={{paddingVertical: 0}}
          codeTextStyle={{color: COLORS.BLACK}}
          containerStyle={[
            {
              paddingVertical: 0,
              width: '100%',
            },
            styles.input,
          ]}
          textContainerStyle={{
            paddingVertical: 12,
            backgroundColor: COLORS.WHITE,
          }}
          onChangeText={text => {
            setPhoneNo(text);
          }}
        />
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Password</Text>

        <View
          style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
          <TextInput
            secureTextEntry={hidePassword}
            keyboardType="default"
            style={{flex: 1, color: COLORS.BLACK}}
            value={password}
            onChangeText={setPassword}
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

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Re-type Password</Text>
        <View
          style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
          <TextInput
            secureTextEntry={hideConfirmPassword}
            style={{flex: 1, color: COLORS.BLACK}}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            onPress={() => {
              setHideConfirmPassword(!hideConfirmPassword);
            }}>
            <FontAwesome5
              name={hideConfirmPassword ? 'eye-slash' : 'eye'}
              size={moderateScale(18)}
              color={'grey'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <MainButton
        style={{paddingVertical: 20}}
        text={'Next'}
        onPress={submit}
      />

      <View style={styles.footerLogoContainer}>
        <Image
          source={require('../../../../../assets/logos/logo.png')}
          style={{width: '80%', height: 80}}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: COLORS.BLACK,
  },
  textFieldContainer: {
    paddingVertical: 10,
  },
  input: {
    borderColor: COLORS.RED,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    color: COLORS.BLACK,
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default SignUpFormScreen;
