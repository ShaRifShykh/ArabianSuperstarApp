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

const UpdateVideoScreen = ({navigation, route}) => {
  const {updateVideo, authLoading} = useContext(ArabianSuperStarContext);

  const {videoParam} = route.params;

  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const hideDialogSuccess = () => setShowSuccess(false);

  const pickVideo = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'image/video',
      includeBase64: true,
    };

    const result = await launchImageLibrary(options);

    setVideo(result.assets[0]);
    if (video != null) {
      setShowSuccess(true);
    }
  };

  useEffect(() => {
    setDescription(videoParam.description);
  }, []);

  const submit = async () => {
    Keyboard.dismiss();

    const formData = new FormData();

    formData.append('description', description);
    if (video !== null) {
      formData.append('video', {
        uri: video.uri,
        type: video.type,
        name: video.fileName,
      });
    }

    await updateVideo({
      formData: formData,
      id: videoParam.id,
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

      <Portal>
        <Dialog
          style={{backgroundColor: Colors.WHITE}}
          visible={showSuccess}
          onDismiss={hideDialogSuccess}>
          <Dialog.Content>
            <Text
              style={{
                color: Colors.BLACK,
              }}
              variant="bodyMedium">
              Video Selected!
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
            Update Video
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
        {
          <TouchableOpacity
            onPress={pickVideo}
            style={styles.imagePickerContainer}>
            <MaterialIcons
              name="videocam"
              size={moderateScale(28)}
              color={Colors.BLACK}
            />
            <Text
              style={{fontWeight: '600', color: Colors.BLACK, fontSize: 18}}>
              Select Video
            </Text>
          </TouchableOpacity>
        }

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

        <MainButton text={'Update Video'} onPress={submit} />
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

export default UpdateVideoScreen;
