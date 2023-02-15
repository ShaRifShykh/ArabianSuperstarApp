import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import COLORS from '../../../../constant/Colors';
import MainButton from '../../../../components/MainButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../../../../constant/Metrics';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {ArabianSuperStarContext} from '../../../../context/ArabianSuperStarContext';
import Loader from '../../../../components/Loader';
import {Dialog, Portal} from 'react-native-paper';

const ProfilePictureFormScreen = ({navigation}) => {
  const {authLoading, addProfilePhoto, getData} = useContext(
    ArabianSuperStarContext,
  );

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [errors, setErrors] = useState({
    profile_photo: null,
  });
  const [showError, setShowError] = useState(false);
  const hideDialog = () => setShowError(false);

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
    const formData = new FormData();
    if (profilePhoto !== null) {
      formData.append('profile_photo', {
        uri: profilePhoto.uri,
        type: profilePhoto.type,
        name: profilePhoto.fileName,
      });
    }

    await addProfilePhoto({
      formData,
    }).then(val => {
      if (val.status === 200) {
        setProfilePhoto(null);
        getData();
        navigation.replace('BottomStack');
      } else if (val.response.status === 400) {
        setShowError(true);
        setErrors(val.response.data.errors);
      } else {
        console.log(val);
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
                display: errors.profile_photo !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.profile_photo}
            </Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={styles.headerLogoContainer}>
        <Image source={require('../../../../../assets/logos/black-logo.png')} />
      </View>

      <View style={styles.content}>
        <Text style={styles.headingText}>Are you the one!</Text>
        {profilePhoto === null ? (
          <TouchableOpacity
            onPress={pickImage}
            style={styles.imagePickerContainer}>
            <MaterialIcons
              name="camera-alt"
              size={moderateScale(28)}
              color={COLORS.BLACK}
            />
            <Text
              style={{fontWeight: '600', color: COLORS.BLACK, fontSize: 16}}>
              Select Image
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            style={styles.imagePickerContainer}>
            <FastImage
              style={{width: 180, height: 180, borderRadius: 100}}
              source={{
                uri: 'data:image/jpeg;base64,' + profilePhoto.base64,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      <MainButton
        style={{paddingVertical: 20}}
        text={"Let's go"}
        onPress={submit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  imagePickerContainer: {
    width: 180,
    height: 180,
    backgroundColor: COLORS.GREY,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoContainer: {
    alignItems: 'center',
  },
  headingText: {
    color: COLORS.WHITE,
    fontSize: 28,
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 50,
  },
});

export default ProfilePictureFormScreen;
