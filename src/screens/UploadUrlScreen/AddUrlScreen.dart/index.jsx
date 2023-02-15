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

const AddUrlScreen = ({navigation}) => {
  const {user, addUrl, authLoading} = useContext(ArabianSuperStarContext);

  const [url, setUrl] = useState('');

  const [errors, setErrors] = useState({
    url: null,
  });
  const [showError, setShowError] = useState(false);
  const hideDialog = () => setShowError(false);

  const submit = async () => {
    Keyboard.dismiss();

    await addUrl({
      url: url,
    }).then(val => {
      if (val.status === 200) {
        setUrl('');
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
                display: errors.url !== null ? 'flex' : 'none',
              }}
              variant="bodyMedium">
              {errors.url}
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
            Add Url
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
        <View style={styles.textFieldContainer}>
          <Text style={styles.text}>URL</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            value={url}
            onChangeText={setUrl}
          />
        </View>

        <MainButton text={'Add Url'} onPress={submit} />
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

export default AddUrlScreen;
