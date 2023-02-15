import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {BASE_IMG_URL} from '../../constant/BaseUrl';

const VideoScreen = ({navigation, route}) => {
  const {video} = route.params;

  return (
    <View style={{flex: 1}}>
      <VideoPlayer
        source={{
          uri: BASE_IMG_URL + video.video,
        }}
        style={{
          height: '100%',
        }}
        videoStyle={{
          width: '100%',
          height: '100%',
        }}
        navigator={navigation}
        resizeMode="contain"
        fullscreen={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default VideoScreen;
