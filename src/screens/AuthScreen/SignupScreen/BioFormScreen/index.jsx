import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import COLORS from '../../../../constant/Colors';
import MainButton from '../../../../components/MainButton';
import {ArabianSuperStarContext} from '../../../../context/ArabianSuperStarContext';
import Loader from '../../../../components/Loader';
import {Dialog, Portal} from 'react-native-paper';
import {verticalScale} from '../../../../constant/Metrics';

const BioFormScreen = ({navigation}) => {
  const {authLoading, addBio} = useContext(ArabianSuperStarContext);

  const [bio, setBio] = useState('');

  const [errors, setErrors] = useState({
    bio: null,
    error: null,
  });
  const [showError, setShowError] = useState(false);
  const hideDialog = () => setShowError(false);

  const submit = async () => {
    Keyboard.dismiss();

    await addBio({
      bio: bio,
    }).then(val => {
      if (val.status === 200) {
        navigation.navigate('ProfilePictureFormScreen');
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
                display: errors.bio !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.bio}
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

      <View style={styles.textFieldContainer}>
        <Text style={styles.text}>About Me</Text>
        <TextInput
          keyboardType="default"
          style={styles.input}
          value={bio}
          textAlignVertical="top"
          multiline
          numberOfLines={5}
          onChangeText={setBio}
        />
      </View>

      <MainButton
        style={{paddingVertical: 20, marginTop: 10}}
        text={'Add Galleries'}
        onPress={() => {
          navigation.navigate('UploadGalleryScreen');
        }}
      />

      <MainButton
        style={{paddingVertical: 20, marginTop: 10}}
        text={'Add Videos'}
        onPress={() => {
          navigation.navigate('UploadVideoScreen');
        }}
      />

      <MainButton
        style={{paddingVertical: 20, marginTop: 10}}
        text={'Add URLs'}
        onPress={() => {
          navigation.navigate('UploadUrlScreen');
        }}
      />

      <MainButton
        style={{paddingVertical: 20, marginTop: 40}}
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
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default BioFormScreen;
