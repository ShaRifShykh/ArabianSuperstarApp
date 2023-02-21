import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ImageBackground,
  Pressable,
  Share,
  TouchableWithoutFeedback,
} from 'react-native';
import COLORS from '../../constant/Colors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import {BASE_IMG_URL, SHARE_PROFILE_URL} from '../../constant/BaseUrl';
import FastImage from 'react-native-fast-image';
import {Button, Dialog, Portal} from 'react-native-paper';
import MainLoader from '../../components/MainLoader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import Lightbox from 'react-native-lightbox-v2';
import VideoPlayer from 'react-native-video-controls';
import WebView from 'react-native-webview';

const ProfileScreen = ({navigation}) => {
  const {
    user,
    getProfile,
    profileLoading,
    userTotalRating,
    logout,
    logoutLoading,
  } = useContext(ArabianSuperStarContext);

  const [modalVisible, setModalVisible] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: SHARE_PROFILE_URL + user.username,
        url: SHARE_PROFILE_URL + user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return profileLoading ? (
    <MainLoader />
  ) : (
    <ScrollView
      contentContainerStyle={{paddingBottom: verticalScale(20)}}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <Portal>
        <Dialog
          style={{backgroundColor: COLORS.WHITE}}
          visible={modalVisible}
          onDismiss={() => setModalVisible(!modalVisible)}>
          <Dialog.Actions
            style={{
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign
                name="close"
                size={moderateScale(20)}
                color={COLORS.BLACK}
              />
            </Button>
          </Dialog.Actions>
          <Dialog.Content
            style={{
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('MainStack', {
                  screen: 'EditProfileScreen',
                });
              }}>
              <Text style={styles.modalText}>Edit Profile</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                onShare();
              }}>
              <Text style={styles.modalText}>
                Share Profile on social media
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('MainStack', {
                  screen: 'FAQScreen',
                });
              }}>
              <Text style={styles.modalText}>FAQs</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('MainStack', {
                  screen: 'HowItWorkScreen',
                });
              }}>
              <Text style={styles.modalText}>How it works</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('MainStack', {
                  screen: 'ContactScreen',
                });
              }}>
              <Text style={styles.modalText}>Contact us</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('MainStack', {
                  screen: 'TermsAndConditionScreen',
                });
              }}>
              <Text style={styles.modalText}>Terms & Conditions</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                logout();

                navigation.replace('HomeStack', {
                  screen: 'SplashScreen',
                });
              }}>
              <Text style={styles.modalText}>Logout</Text>
            </Pressable>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={{flex: 1}}>
        <ImageBackground
          style={styles.imgContainer}
          source={{
            uri: user
              ? BASE_IMG_URL + user.profilePhoto
              : 'https://i.pravatar.cc/400',
          }}>
          <View
            style={{
              paddingHorizontal: horizontalScale(30),
              paddingVertical: verticalScale(30),
              alignItems: 'flex-end',
            }}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Fontisto
                name="more-v-a"
                size={24}
                style={{paddingLeft: horizontalScale(20)}}
                color={COLORS.BLACK}
              />
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.actionContainer}>
          <View style={styles.action}>
            <Text style={styles.actionCount}>
              {user ? user.availableVotes.votesAvailable : 0}
            </Text>
            <Text style={styles.actionText}>Vote</Text>
            <Image
              source={require('../../../assets/icons/vote-bucket.png')}
              style={[styles.actionIcon, {width: 32, height: 32}]}
              resizeMode="cover"
            />
          </View>
          <View style={styles.action}>
            <Text style={styles.actionCount}>{user.totalLikes}</Text>
            <Text style={styles.actionText}>Likes</Text>
            <Image
              source={require('../../../assets/icons/like.png')}
              style={[styles.actionIcon, {width: 32, height: 32}]}
              resizeMode="cover"
            />
          </View>
          <Pressable
            style={styles.action}
            onPress={() =>
              navigation.navigate('MainStack', {
                screen: 'CommentScreen',
                params: {
                  users: user,
                },
              })
            }>
            <Text style={styles.actionCount}>{user.totalComments}</Text>
            <Text style={styles.actionText}>Comments</Text>
            <Image
              source={require('../../../assets/icons/comment.png')}
              style={[styles.actionIcon, {width: 40, height: 30}]}
              resizeMode="cover"
            />
          </Pressable>
          <View style={styles.action}>
            <Text style={styles.actionCount}>{userTotalRating ?? 0}</Text>
            <Text style={styles.actionText}>Rating</Text>

            {userTotalRating === 0 ? (
              <>
                <FontAwesome
                  name="star-o"
                  color={COLORS.BLACK}
                  size={moderateScale(35)}
                  style={{marginTop: verticalScale(6)}}
                />
              </>
            ) : userTotalRating <= 3 ? (
              <>
                <FontAwesome
                  name="star-half-empty"
                  color={COLORS.MAIN1}
                  size={moderateScale(35)}
                  style={{marginTop: verticalScale(6)}}
                />
              </>
            ) : (
              <>
                <FontAwesome
                  name="star"
                  color={COLORS.MAIN1}
                  size={moderateScale(35)}
                  style={{marginTop: verticalScale(6)}}
                />
              </>
            )}
          </View>
        </View>

        <View style={{paddingHorizontal: horizontalScale(30)}}>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.userInfoContainer}>
          <View>
            <Text style={styles.userInfoSubHeading}>
              {user ? user.fullName : null}
            </Text>
            <Text style={styles.userInfoText}>
              @{user ? user.username : null}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Image
              style={[styles.actionIcon, {width: 14, height: 18}]}
              resizeMode="cover"
              source={require('../../../assets/icons/location.png')}
            />
            <Text
              style={[styles.userInfoText, {paddingLeft: horizontalScale(4)}]}>
              {user ? user.country : null}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Zodiac</Text>

          <Text style={styles.bioContent}>{user ? user.zodiac : null}</Text>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Hobbies</Text>

          <Text style={styles.bioContent}>{user ? user.hobbies : null}</Text>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Bio</Text>

          <Text style={styles.bioContent}>{user ? user.bio : null}</Text>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Nominations</Text>

          <View style={styles.nominationContainer}>
            {user
              ? user.nominations
                ? user.nominations.map(nomination => {
                    return (
                      <View style={styles.nomination} key={nomination.id}>
                        <Text style={styles.nominationText}>
                          {nomination.nomination.name}
                        </Text>
                      </View>
                    );
                  })
                : null
              : null}
          </View>
        </View>

        <View style={styles.subContainer}>
          <Text
            style={[styles.heading, {marginHorizontal: horizontalScale(30)}]}>
            Photos
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {user
              ? user.galleries
                ? user.galleries.map(image => {
                    return (
                      <Lightbox
                        key={image.id}
                        style={{
                          width: '33%',
                          height: 130,
                          marginBottom: 1,
                          marginRight: 1,
                        }}
                        renderContent={() => {
                          return (
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <FastImage
                                style={{
                                  width: '100%',
                                  height: 400,
                                  alignSelf: 'center',
                                }}
                                resizeMode="contain"
                                source={{
                                  uri: image.image
                                    ? BASE_IMG_URL + image.image
                                    : 'https://i.pravatar.cc/360',
                                }}
                              />
                              <Text
                                style={{color: COLORS.WHITE, marginTop: 20}}>
                                {image.description}
                              </Text>
                            </View>
                          );
                        }}
                        activeProps={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}>
                        <FastImage
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          resizeMode="cover"
                          source={{
                            uri: image.image
                              ? BASE_IMG_URL + image.image
                              : 'https://i.pravatar.cc/360',
                          }}
                        />
                      </Lightbox>
                    );
                  })
                : null
              : null}
          </View>
        </View>

        <View
          style={[
            styles.subContainer,
            {marginHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Videos</Text>
          <View>
            {user
              ? user.videos
                ? user.videos.map(video => {
                    return (
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
                        thumbnail={{
                          uri: 'https://www.shutterstock.com/shutterstock/videos/1022031049/thumb/1.jpg?ip=x480',
                        }}
                        disableBack={true}
                        navigator={navigation}
                        resizeMode="contain"
                        onEnterFullscreen={() => {
                          if (video != null) {
                            navigation.navigate('VideoScreen', {
                              video: video,
                            });
                          }
                        }}
                      />
                    );
                  })
                : null
              : null}
          </View>
        </View>

        <View
          style={[
            styles.subContainer,
            {marginHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Url</Text>
          <View>
            {user
              ? user.urls
                ? user.urls.map(url => {
                    return (
                      <WebView
                        key={url.id}
                        style={{
                          width: '100%',
                          height: 200,
                          marginBottom: 10,
                          marginTop: 10,
                          opacity: 0.99,
                          alignSelf: 'center',
                        }}
                        allowsFullscreenVideo
                        allowsInlineMediaPlayback
                        mediaPlaybackRequiresUserAction
                        source={{uri: url.url.replace('watch?v=', 'embed/')}}
                      />
                    );
                  })
                : null
              : null}
          </View>
        </View>

        <View style={styles.footerLogoContainer}>
          <Image
            source={require('../../../assets/logos/logo.png')}
            style={{width: '80%', height: 80}}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: verticalScale(25),
    fontSize: moderateScale(14),
    color: COLORS.BLACK,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  imgContainer: {
    width: '100%',
    height: 350,
  },
  mainContainer: {
    paddingVertical: verticalScale(30),
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.GREY,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(25),
    paddingHorizontal: horizontalScale(30),
  },
  action: {
    alignItems: 'center',
  },
  actionCount: {
    fontSize: moderateScale(15),
    fontWeight: '800',
    color: COLORS.BLACK,
  },
  actionText: {
    fontSize: moderateScale(14),
    fontWeight: '800',
    color: COLORS.INACTIVEGREY,
  },
  actionIcon: {
    marginTop: verticalScale(10),
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(30),
  },
  userInfoSubHeading: {
    fontSize: moderateScale(15),
    fontWeight: '800',
    color: COLORS.BLACK,
  },
  userInfoText: {
    fontSize: moderateScale(15),
    color: COLORS.BLACK,
  },
  subContainer: {
    marginTop: verticalScale(30),
  },
  heading: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: COLORS.BLACK,
    paddingBottom: verticalScale(10),
  },
  bioContent: {
    fontSize: moderateScale(13),
    color: COLORS.INACTIVEGREY,
  },
  footerLogoContainer: {
    marginTop: verticalScale(30),
    alignItems: 'center',
  },
  nominationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nomination: {
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.MAIN1,
    marginRight: 2,
    marginBottom: 2,
    borderRadius: 10,
  },
  nominationText: {
    color: COLORS.WHITE,
    fontSize: moderateScale(11),
  },
});

export default ProfileScreen;
