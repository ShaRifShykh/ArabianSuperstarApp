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
import WebView from 'react-native-webview';
import Loader from '../../components/Loader';

const UploadUrlScreen = ({navigation}) => {
  const {user, authLoading, deleteUrl} = useContext(ArabianSuperStarContext);

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
            Upload Urls
          </Text>
        </Pressable>
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
        <MainButton
          text={'Add a new Url'}
          onPress={() => {
            navigation.navigate('HomeStack', {
              screen: 'AddUrlScreen',
            });
          }}
        />

        <View style={{paddingVertical: 30}}>
          {user
            ? user.urls
              ? user.urls.map(url => {
                  return (
                    <View style={{marginBottom: 15}}>
                      {/* deleteUrl */}
                      <WebView
                        key={url.id}
                        style={{
                          width: '100%',
                          height: 200,
                          marginBottom: 10,
                          marginTop: 10,
                          opacity: 0.99,
                        }}
                        allowsFullscreenVideo
                        allowsInlineMediaPlayback
                        mediaPlaybackRequiresUserAction
                        source={{uri: url.url.replace('watch?v=', 'embed/')}}
                      />

                      <MainButton
                        text={'Delete Url'}
                        onPress={() => {
                          deleteUrl({id: url.id});
                        }}
                      />
                    </View>
                  );
                })
              : null
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

export default UploadUrlScreen;
