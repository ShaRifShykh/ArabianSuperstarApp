import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import COLORS from '../../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainButton from '../../../../components/MainButton';
import {ArabianSuperStarContext} from '../../../../context/ArabianSuperStarContext';
import MainLoader from '../../../../components/MainLoader';
import LinearGradient from 'react-native-linear-gradient';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../constant/Metrics';
import {Dialog, Portal} from 'react-native-paper';
import Loader from '../../../../components/Loader';

const PersonalityDetailFormScreen = ({navigation}) => {
  const {
    authLoading,
    getNominations,
    nominations,
    nominationLoading,
    addPersonalityDetails,
  } = useContext(ArabianSuperStarContext);

  const [hobbies, setHobbies] = useState('');
  const [selectedNominations, setSelectedNominations] = React.useState([1]);

  const [errors, setErrors] = useState({
    hobbies: null,
    nominations: null,
  });
  const [showError, setShowError] = useState(false);
  const hideDialog = () => setShowError(false);

  const submit = async () => {
    Keyboard.dismiss();

    await addPersonalityDetails({
      hobbies: hobbies,
      nominations: selectedNominations,
    }).then(val => {
      if (val.status === 200) {
        navigation.navigate('BioFormScreen');
      } else if (val.response.status === 400) {
        setShowError(true);
        setErrors(val.response.data.errors);
      } else {
        console.log(val.response);
      }
    });
  };

  useEffect(() => {
    getNominations();
  }, []);

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
            isSelected ? COLORS.MAIN1 : COLORS.WHITE,
            isSelected ? COLORS.MAIN2 : COLORS.WHITE,
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
              color: isSelected ? COLORS.WHITE : COLORS.BLACK,
            }}>
            {name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return nominationLoading ? (
    <MainLoader />
  ) : (
    <View style={styles.container}>
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
                display: errors.hobbies !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.hobbies}
            </Text>

            <Text
              style={{
                color: COLORS.RED,
                display: errors.nominations !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.nominations}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>
          Hobbies{' '}
          <Text style={{color: COLORS.GREY, fontSize: 12}}>
            (e.g, Football, Music, Reading, Dancing, etc.)
          </Text>
        </Text>
        <TextInput
          keyboardType="default"
          style={styles.input}
          value={hobbies}
          textAlignVertical="top"
          multiline
          numberOfLines={5}
          onChangeText={setHobbies}
        />
      </View>

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>
          You’re now nominated to be the Arabian Superstar enroll yourself for
          more titles!
        </Text>

        <View style={{marginTop: 10}}>
          <FlatList
            data={nominations}
            renderItem={renderNomination}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      </View>

      <MainButton
        style={{paddingVertical: 20, marginTop: 10}}
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
    </View>
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
    borderColor: COLORS.RED,
    borderWidth: 1,
    borderRadius: 8,
  },
  footerLogoContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
});

export default PersonalityDetailFormScreen;
