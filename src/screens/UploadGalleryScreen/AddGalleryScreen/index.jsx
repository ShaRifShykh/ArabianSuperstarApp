import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArabianSuperStarContext} from '../../../context/ArabianSuperStarContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../constant/Metrics';
import MainButton from '../../../components/MainButton';
import {launchImageLibrary} from 'react-native-image-picker';
import Loader from '../../../components/Loader';
import {Dialog, Portal} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

const AddGalleryScreen = ({navigation}) => {
  const {user, addImage, authLoading} = useContext(ArabianSuperStarContext);

  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({
    description: null,
    image: null,
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
    setImage(result.assets[0]);
  };

  const submit = async () => {
    Keyboard.dismiss();

    const formData = new FormData();

    formData.append('description', description);
    if (image !== null) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });
    }

    await addImage({
      formData,
    }).then(val => {
      if (val.status === 200) {
        setDescription('');
        setImage(null);
        navigation.goBack();
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
      nestedScrollEnabled={true}>
      <Loader visible={authLoading} />

      <Portal>
        <Dialog
          style={{backgroundColor: Colors.WHITE}}
          visible={showError}
          onDismiss={hideDialog}>
          <Dialog.Title style={{textAlign: 'center'}}>Error!</Dialog.Title>
          <Dialog.Content>
            <Text
              style={{
                color: Colors.RED,
                display: errors.image !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.image}
            </Text>

            <Text
              style={{
                color: Colors.RED,
                display: errors.description !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.description}
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
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.BLACK,
              fontSize: moderateScale(16),
            }}>
            Add Gallery
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
        {image === null ? (
          <TouchableOpacity
            onPress={pickImage}
            style={styles.imagePickerContainer}>
            <MaterialIcons
              name="camera-alt"
              size={moderateScale(28)}
              color={Colors.BLACK}
            />
            <Text
              style={{fontWeight: '600', color: Colors.BLACK, fontSize: 18}}>
              Select Image
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <FastImage
              style={{width: '100%', height: 250, borderRadius: 20}}
              source={{
                uri: 'data:image/jpeg;base64,' + image.base64,
              }}
            />
          </TouchableOpacity>
        )}

        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>Description (max 30 characters)</Text>
          <TextInput
            keyboardType="default"
            maxLength={30}
            style={styles.input}
            value={description}
            textAlignVertical="top"
            multiline
            numberOfLines={5}
            onChangeText={setDescription}
          />
        </View>

        <MainButton text={'Add  Gallery'} onPress={submit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagePickerContainer: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.GREY,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFieldContainer: {
    paddingVertical: 30,
  },
  input: {
    color: Colors.BLACK,
    borderColor: Colors.RED,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  text: {
    color: Colors.BLACK,
  },
  appBarContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
});

export default AddGalleryScreen;
