import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constant/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../constant/Metrics';
import {ArabianSuperStarContext} from '../../../context/ArabianSuperStarContext';
import MainButton from '../../../components/MainButton';
import {Dialog, Portal} from 'react-native-paper';
import Loader from '../../../components/Loader';
import LinearGradient from 'react-native-linear-gradient';

const EditGenderScreen = ({navigation}) => {
  const {
    user,
    editGender,
    authLoading,
    maleNominations,
    femaleNominations,
    getUserSelectedNominations,
    userSelectedNominations,
  } = useContext(ArabianSuperStarContext);

  const [gender, setGender] = useState(null);
  const [selectedNominations, setSelectedNominations] = useState([1]);
  const [backupSelectedNominations, setBackupSelectedNominations] = useState([
    1,
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const hideSuccessDialog = () => setShowSuccess(false);

  useEffect(() => {
    setGender(user.gender);
    getUserSelectedNominations();
    setSelectedNominations(userSelectedNominations);
    setBackupSelectedNominations(userSelectedNominations);
  }, []);

  const submit = async () => {
    Keyboard.dismiss();

    await editGender({
      gender: gender,
      nominations: selectedNominations,
    }).then(val => {
      if (val.status === 200) {
        setSelectedNominations([]);
        setShowSuccess(true);
      } else {
        console.log(val.response);
      }
    });
  };

  const renderNomination = ({item, index}) => {
    const {name, id} = item;
    const isSelected = selectedNominations.filter(i => i === id).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelectedNominations(prev => prev.filter(i => i !== id));
          } else {
            setSelectedNominations(prev => [...prev, id]);
          }
        }}
        style={{marginTop: 6}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            isSelected ? Colors.MAIN1 : Colors.WHITE,
            isSelected ? Colors.MAIN2 : Colors.WHITE,
          ]}
          style={[
            {
              paddingHorizontal: horizontalScale(22),
              borderRadius: 8,
              paddingVertical: verticalScale(8),
              marginRight: 5,
            },
            isSelected ? null : styles.selectedItem,
          ]}>
          <Text
            style={{
              fontSize: moderateScale(11),
              color: isSelected ? Colors.WHITE : Colors.BLACK,
            }}>
            {name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Loader visible={authLoading} />

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
              Gender Updated Successfully!
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
        <Text style={styles.appBarTitle}>Edit Gender & Nominations</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Gender</Text>
          <View style={styles.gender}>
            <TouchableOpacity
              style={{width: '45%'}}
              onPress={() => {
                if (user.gender === 'Male') {
                  setSelectedNominations(backupSelectedNominations);
                } else {
                  setSelectedNominations([1]);
                }
                setGender('Male');
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={[
                  gender === 'Male' ? Colors.MAIN1 : Colors.WHITE,
                  gender === 'Male' ? Colors.MAIN2 : Colors.WHITE,
                ]}
                style={[
                  gender === 'Male'
                    ? styles.genderSelected
                    : styles.genderNonSelected,
                ]}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: gender === 'Male' ? Colors.WHITE : Colors.BLACK,
                  }}>
                  Male
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{width: '45%'}}
              onPress={() => {
                if (user.gender === 'Female') {
                  setSelectedNominations(backupSelectedNominations);
                } else {
                  setSelectedNominations([1]);
                }
                setGender('Female');
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={[
                  gender === 'Female' ? Colors.MAIN1 : Colors.WHITE,
                  gender === 'Female' ? Colors.MAIN2 : Colors.WHITE,
                ]}
                style={[
                  gender === 'Female'
                    ? styles.genderSelected
                    : styles.genderNonSelected,
                ]}>
                <Text
                  style={{
                    fontSize: 16,
                    color: gender === 'Female' ? Colors.WHITE : Colors.BLACK,
                  }}>
                  Female
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Nominations</Text>
          {gender === 'Male' ? (
            <FlatList
              data={maleNominations}
              renderItem={renderNomination}
              numColumns={2}
              scrollEnabled={false}
            />
          ) : (
            <FlatList
              data={femaleNominations}
              renderItem={renderNomination}
              numColumns={2}
              scrollEnabled={false}
            />
          )}
        </View>

        <MainButton
          style={{paddingVertical: 20}}
          containerStyle={{marginTop: 10}}
          text={'Update'}
          onPress={submit}
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  genderNonSelected: {
    borderColor: Colors.RED,
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
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    margin: 2,
    width: 80,
    height: 40,
  },
  selectedItem: {
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 8,
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

  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default EditGenderScreen;
