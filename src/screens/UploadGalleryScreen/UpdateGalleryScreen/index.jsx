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
import MainLoader from '../../../components/MainLoader';
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
import {BASE_IMG_URL} from '../../../constant/BaseUrl';

const UpdateGalleryScreen = ({navigation, route}) => {
  const {user, updateImage, authLoading} = useContext(ArabianSuperStarContext);

  const {gallery} = route.params;

  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    setDescription(gallery.description);
  }, []);

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

    await updateImage({
      formData: formData,
      id: gallery.id,
    }).then(val => {
      if (val.status === 200) {
        navigation.goBack();
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
            Update Gallery
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
        {image === null ? (
          <TouchableOpacity onPress={pickImage}>
            <FastImage
              style={{width: '100%', height: 250, borderRadius: 20}}
              source={{
                uri: gallery.image
                  ? BASE_IMG_URL + gallery.image
                  : 'https://i.pravatar.cc/360',
              }}
            />
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

        <MainButton text={'Update Gallery'} onPress={submit} />
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

export default UpdateGalleryScreen;
