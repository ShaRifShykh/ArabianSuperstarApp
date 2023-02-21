import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constant/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainButton from '../../components/MainButton';
import PhoneInput from 'react-native-phone-number-input';
import {Dropdown} from 'react-native-element-dropdown';
import {Dialog, Portal} from 'react-native-paper';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import ZodiacSignCalculator from '../../constant/ZodiacSignCalculator';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import Loader from '../../components/Loader';

const EditProfileScreen = ({navigation}) => {
  const {user, countries, countriesToShow, editProfile, authLoading} =
    useContext(ArabianSuperStarContext);

  const phoneInput = useRef(null);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState(null);
  const [country, setCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [bio, setBio] = useState('');
  const [countryCode, setCountryCode] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [showDate, setShowDate] = useState(false);
  const hideDate = () => setShowDate(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const hideSuccessDialog = () => setShowSuccess(false);

  useEffect(() => {
    setFullName(user.fullName);
    setUsername(user.username);
    setEmail(user.email);
    setPhoneNo(user.phoneNo);
    setCountry(user.country);
    setNationality(user.nationality);
    setDateOfBirth(user.dateOfBirth);
    setZodiac(user.zodiac);
    setHobbies(user.hobbies);
    setBio(user.bio);
  }, []);

  const pickImage = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };

    const result = await launchImageLibrary(options);
    setProfilePhoto(result.assets[0]);
  };

  const submit = async () => {
    Keyboard.dismiss();

    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone_no', phoneNo);
    formData.append('country', country);
    formData.append('nationality', nationality);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('zodiac', zodiac);
    formData.append('hobbies', hobbies);
    formData.append('bio', bio);

    if (profilePhoto !== null) {
      formData.append('profile_photo', {
        uri: profilePhoto.uri,
        type: profilePhoto.type,
        name: profilePhoto.fileName,
      });
    }

    await editProfile({
      formData,
    }).then(val => {
      if (val.status === 200) {
        setProfilePhoto(null);
        setShowSuccess(true);
      } else {
        console.log(val);
      }
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <Loader visible={authLoading} />

      <Portal>
        <Dialog
          style={{backgroundColor: Colors.WHITE}}
          visible={showDate}
          onDismiss={hideDate}>
          <Dialog.Content>
            <DatePicker
              options={{
                textHeaderColor: Colors.MAIN1,
                mainColor: Colors.MAIN1,
              }}
              selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
              onDateChange={val => {
                setDateOfBirth(val);

                let month = val.substring(5, 7);
                let date = val.substring(8);
                let zodiacSign = ZodiacSignCalculator(date, month);
                setZodiac(zodiacSign);
              }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{backgroundColor: Colors.WHITE}}
          visible={showSuccess}
          onDismiss={hideSuccessDialog}>
          <Dialog.Content>
            <Text
              style={{
                color: Colors.BLACK,
              }}
              variant="bodyMedium">
              Profile Updated Successfully!
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

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
        <Text style={styles.appBarTitle}>Edit Profile</Text>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={pickImage} style={{alignItems: 'center'}}>
          {profilePhoto === null ? (
            <FastImage
              style={{width: 180, height: 180, borderRadius: 100}}
              source={{
                uri: BASE_IMG_URL + user.profilePhoto,
              }}
            />
          ) : (
            <FastImage
              style={{width: 180, height: 180, borderRadius: 100}}
              source={{
                uri: 'data:image/jpeg;base64,' + profilePhoto.base64,
              }}
            />
          )}
        </TouchableOpacity>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Full Name</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Username</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={username}
            editable={false}
            selectTextOnFocus={false}
            pointerEvents="none"
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Phone No</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNo}
            value={phoneNo}
            defaultCode="AE"
            layout="first"
            textInputStyle={{paddingVertical: 0, color: Colors.BLACK}}
            flagButtonStyle={{paddingVertical: 0}}
            codeTextStyle={{color: Colors.BLACK}}
            containerStyle={[
              {
                paddingVertical: 0,
                width: '100%',
              },
              styles.input,
            ]}
            textContainerStyle={{
              paddingVertical: 12,
              backgroundColor: Colors.WHITE,
            }}
            onChangeText={text => {
              setPhoneNo(text);
            }}
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Country of Residence</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={{color: Colors.INACTIVEGREY}}
            data={countriesToShow}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'Select Country'}
            value={country}
            onChange={item => {
              setCountry(item.name);
            }}
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Nationality</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={{color: Colors.INACTIVEGREY}}
            data={countries}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'Select Nationality'}
            value={nationality}
            onChange={item => {
              setNationality(item.name);
            }}
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Date of Birth</Text>
          <TouchableOpacity
            onPress={() => {
              setShowDate(true);
            }}>
            <TextInput
              keyboardType="default"
              style={styles.input}
              placeholder="Select Date of birth"
              value={dateOfBirth}
              editable={false}
              selectTextOnFocus={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Zodiac</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={zodiac}
            editable={false}
            selectTextOnFocus={false}
            pointerEvents="none"
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>
            Hobbies Example : (Sports, Musics, Reading)
          </Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            multiline
            numberOfLines={5}
            value={hobbies}
            onChangeText={setHobbies}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Bio</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            multiline
            numberOfLines={5}
            value={bio}
            onChangeText={setBio}
            textAlignVertical="top"
          />
        </View>

        <MainButton
          style={{paddingVertical: 20}}
          containerStyle={{marginTop: 10}}
          text={'Edit Gender & Nominations'}
          onPress={() => {
            navigation.navigate('MainStack', {
              screen: 'EditGenderScreen',
            });
          }}
        />

        <MainButton
          style={{paddingVertical: 20}}
          containerStyle={{marginTop: 10}}
          text={'Add Galleries'}
          onPress={() => {
            navigation.navigate('MainStack', {
              screen: 'ProfileUploadGalleryScreen',
            });
          }}
        />

        <MainButton
          style={{paddingVertical: 20}}
          containerStyle={{marginTop: 10}}
          text={'Add Videos'}
          onPress={() => {
            navigation.navigate('MainStack', {
              screen: 'ProfileUploadVideoScreen',
            });
          }}
        />

        <MainButton
          style={{paddingVertical: 20}}
          containerStyle={{marginTop: 10}}
          text={'Add Urls'}
          onPress={() => {
            navigation.navigate('MainStack', {
              screen: 'ProfileUploadUrlScreen',
            });
          }}
        />

        <MainButton
          style={{paddingVertical: 20}}
          containerStyle={{marginTop: 10}}
          text={'Update'}
          onPress={submit}
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
  text: {
    color: Colors.BLACK,
  },
  textFieldContainer: {
    paddingVertical: 10,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  placeholderStyle: {
    color: Colors.INACTIVEGREY,
  },
  selectedTextStyle: {
    color: Colors.BLACK,
  },
  input: {
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    color: Colors.BLACK,
    fontSize: 16,
  },
  appBarTitle: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
  },
  mainContainer: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(25),
  },
  text: {
    fontSize: moderateScale(16),
    color: Colors.INACTIVEGREY,
    letterSpacing: 1,
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default EditProfileScreen;
