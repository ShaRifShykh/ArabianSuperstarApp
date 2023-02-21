import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Image,
  TextInput,
} from 'react-native';
import Colors from '../../constant/Colors';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import MainLoader from '../../components/MainLoader';
import MainButton from '../../components/MainButton';
import PhoneInput from 'react-native-phone-number-input';

const ContactScreen = ({navigation}) => {
  const [value, setValue] = useState(null);
  const phoneInput = useRef(null);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <View style={styles.appBarContainer}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="arrow-back-ios"
            size={moderateScale(25)}
            color={Colors.BLACK}
          />
        </Pressable>
        <Text style={styles.appBarTitle}>Contact Us</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput keyboardType="default" style={styles.input} />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Email Address</Text>
          <TextInput keyboardType="email" style={styles.input} />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Phone No</Text>
          <View style={styles.input}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="AE"
              layout="first"
              textInputStyle={{paddingVertical: 0, color: Colors.BLACK}}
              flagButtonStyle={{paddingVertical: 0}}
              codeTextStyle={{color: Colors.BLACK}}
              containerStyle={{
                paddingVertical: 0,
              }}
              textContainerStyle={{
                paddingVertical: 12,
                backgroundColor: Colors.WHITE,
              }}
              onChangeText={text => {
                setValue(text);
              }}
            />
          </View>
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Message</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            multiline
            numberOfLines={5}
          />
        </View>

        <MainButton
          containerStyle={{marginTop: 10}}
          text={'Submit'}
          onPress={() => {
            const checkValid = phoneInput.current?.isValidNumber(value);
            console.log(checkValid);
          }}
        />
      </View>

      <View style={styles.footerLogoContainer}>
        <Image
          source={require('../../../assets/logos/logo.png')}
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
    backgroundColor: '#fff',
  },
  appBarContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  appBarTitle: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
  },
  mainContainer: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(25),
  },
  textFieldContainer: {
    paddingVertical: 10,
  },
  input: {
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.RED,
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
  text: {
    color: Colors.BLACK,
  },
});

export default ContactScreen;
