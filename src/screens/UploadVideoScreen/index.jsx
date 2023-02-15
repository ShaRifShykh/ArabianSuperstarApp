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
import VideoPlayer from 'react-native-video-controls';
import MainButton from '../../components/MainButton';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import Loader from '../../components/Loader';

const UploadVideoScreen = ({navigation}) => {
  const {user, authLoading, deleteVideo} = useContext(ArabianSuperStarContext);

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
            Upload Video
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
        <MainButton
          text={'Add a new Video'}
          onPress={() => {
            navigation.navigate('AddVideoScreen');
          }}
        />

        <View style={{paddingVertical: 30}}>
          {user.videos
            ? user.videos.map(video => {
                return (
                  <View
                    key={video.id}
                    style={{
                      padding: 10,
                    }}>
                    <VideoPlayer
                      key={video.id}
                      source={{
                        uri: BASE_IMG_URL + video.video,
                      }}
                      style={{
                        height: 200,
                        marginBottom: 5,
                      }}
                      videoStyle={{
                        width: '100%',
                        height: '100%',
                      }}
                      paused={true}
                      disableBack={true}
                      navigator={navigation}
                      resizeMode="contain"
                      toggleResizeModeOnFullscreen={false}
                      onEnterFullscreen={() => {
                        if (video != null) {
                          navigation.navigate('VideoScreen', {
                            video: video,
                          });
                        }
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 18,
                        color: Colors.BLACK,
                        marginVertical: 10,
                      }}>
                      {video.description}
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
                          navigation.navigate('UpdateVideoScreen', {
                            videoParam: video,
                          });
                        }}
                      />
                      <MainButton
                        containerStyle={{width: '48%'}}
                        text={'Delete'}
                        onPress={() => {
                          // console.log(image.id);
                          deleteVideo({id: video.id});
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

export default UploadVideoScreen;
