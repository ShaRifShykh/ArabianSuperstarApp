import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';
import COLORS from '../../../../constant/Colors';
import MainButton from '../../../../components/MainButton';
import {Dropdown} from 'react-native-element-dropdown';
import {ArabianSuperStarContext} from '../../../../context/ArabianSuperStarContext';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {Dialog, Portal} from 'react-native-paper';
import ZodiacSignCalculator from '../../../../constant/ZodiacSignCalculator';
import Loader from '../../../../components/Loader';
import {moderateScale} from '../../../../constant/Metrics';

const PersonalDetailFormScreen = ({navigation}) => {
  const {countries, countriesToShow, authLoading, addPersonalDetails} =
    useContext(ArabianSuperStarContext);

  const [country, setCountry] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [gender, setGender] = useState('Male');
  const [date, setDate] = useState(null);
  const [zodiacSign, setZodiacSign] = useState('');

  const [showDate, setShowDate] = useState(false);
  const hideDate = () => setShowDate(false);

  const [errors, setErrors] = useState({
    country: null,
    nationality: null,
    gender: null,
    date_of_birth: null,
  });
  const [showError, setShowError] = useState(false);
  const hideDialog = () => setShowError(false);

  const submit = async () => {
    Keyboard.dismiss();

    await addPersonalDetails({
      country: country,
      nationality: nationality,
      gender: gender,
      dateOfBirth: date,
      zodiac: zodiacSign,
    }).then(val => {
      if (val.status === 200) {
        navigation.navigate('PersonalityDetailFormScreen');
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
                display: errors.country !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.country}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.nationality !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.nationality}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.gender !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.gender}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.date_of_birth !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.date_of_birth}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{backgroundColor: COLORS.WHITE}}
          visible={showDate}
          onDismiss={hideDate}>
          <Dialog.Content>
            <DatePicker
              options={{
                textHeaderColor: COLORS.MAIN1,
                mainColor: COLORS.MAIN1,
              }}
              selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
              onDateChange={val => {
                setDate(val);

                let month = val.substring(5, 7);
                let date = val.substring(8);
                let zodiacSign = ZodiacSignCalculator(date, month);
                setZodiacSign(zodiacSign);
              }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Country of Residence</Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{color: COLORS.INACTIVEGREY}}
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
          itemTextStyle={{color: COLORS.INACTIVEGREY}}
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
        <Text style={styles.text}>Gender</Text>
        <View style={styles.gender}>
          <TouchableOpacity
            style={{width: '45%'}}
            onPress={() => {
              setGender('Male');
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[
                gender === 'Male' ? COLORS.MAIN1 : COLORS.WHITE,
                gender === 'Male' ? COLORS.MAIN2 : COLORS.WHITE,
              ]}
              style={[
                gender === 'Male'
                  ? styles.genderSelected
                  : styles.genderNonSelected,
              ]}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: gender === 'Male' ? COLORS.WHITE : COLORS.BLACK,
                }}>
                Male
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '45%'}}
            onPress={() => {
              setGender('Female');
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[
                gender === 'Female' ? COLORS.MAIN1 : COLORS.WHITE,
                gender === 'Female' ? COLORS.MAIN2 : COLORS.WHITE,
              ]}
              style={[
                gender === 'Female'
                  ? styles.genderSelected
                  : styles.genderNonSelected,
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  color: gender === 'Female' ? COLORS.WHITE : COLORS.BLACK,
                }}>
                Female
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
            value={date}
            editable={false}
            selectTextOnFocus={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>Zodiac Sign</Text>
        <TouchableOpacity
          onPress={() => {
            setShowDate(true);
          }}>
          <TextInput
            placeholder="Zodiac Sign"
            style={styles.input}
            value={zodiacSign}
            editable={false}
            selectTextOnFocus={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <MainButton
        style={{paddingVertical: 20, marginTop: 20}}
        text={'Next'}
        onPress={submit}
      />

      <View style={styles.footerLogoContainer}>
        <Image source={require('../../../../../assets/logos/logo.png')} />
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
  dropdown: {
    height: 50,
    borderColor: COLORS.RED,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  input: {
    borderColor: COLORS.RED,
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
    color: COLORS.BLACK,
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  genderNonSelected: {
    borderColor: COLORS.RED,
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  genderSelected: {
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  footerLogoContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
});

export default PersonalDetailFormScreen;
