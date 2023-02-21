import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Keyboard,
} from 'react-native';
import Colors from '../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainLoader from '../../components/MainLoader';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import MainButton from '../../components/MainButton';
import FastImage from 'react-native-fast-image';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import Loader from '../../components/Loader';

const UploadGalleryScreen = ({navigation}) => {
  const {user, deleteImage, authLoading} = useContext(ArabianSuperStarContext);

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
            Upload Gallery
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
        {user.galleries.length < 21 ? (
          <MainButton
            text={'Add a new Gallery'}
            onPress={() => {
              navigation.navigate('HomeStack', {
                screen: 'AddGalleryScreen',
              });
            }}
          />
        ) : (
          <View></View>
        )}

        <View style={{paddingVertical: 30}}>
          {user.galleries
            ? user.galleries.map(image => {
                return (
                  <View
                    key={image.id}
                    style={{
                      padding: 10,
                    }}>
                    <FastImage
                      style={{width: '100%', height: 250, borderRadius: 10}}
                      source={{
                        uri: image.image
                          ? BASE_IMG_URL + image.image
                          : 'https://i.pravatar.cc/360',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.BLACK,
                        marginVertical: 10,
                      }}>
                      {image.description}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <MainButton
                        containerStyle={{width: '48%'}}
                        text={'Edit'}
                        onPress={() => {
                          navigation.navigate('HomeStack', {
                            screen: 'UpdateGalleryScreen',
                            params: {
                              gallery: image,
                            },
                          });
                        }}
                      />
                      <MainButton
                        containerStyle={{width: '48%'}}
                        text={'Delete'}
                        onPress={() => {
                          deleteImage({id: image.id});
                        }}
                      />
                    </View>
                  </View>
                );
              })
            : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
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

export default UploadGalleryScreen;
