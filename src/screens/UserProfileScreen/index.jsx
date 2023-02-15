import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  ImageBackground,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainLoader from '../../components/MainLoader';
import FastImage from 'react-native-fast-image';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import {Button, Dialog, Portal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constant/Colors';
import MainButton from '../../components/MainButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import Lightbox from 'react-native-lightbox-v2';
import VideoPlayer from 'react-native-video-controls';
import WebView from 'react-native-webview';

const UserProfileScreen = ({route, navigation}) => {
  const {
    getUserProfile,
    userProfileLoading,
    userProfile,
    userRating,
    hasLiked,
    hasRated,
    isLikingBlock,
    isVotingBlock,
    isRatingBlock,
    isUserLikingBlock,
    isUserRatingBlock,
    isUserVotingBlock,
    addLike,
    sendVote,
    addRating,
  } = useContext(ArabianSuperStarContext);
  const {user} = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const [likedModal, setLikedModal] = useState(false);

  // Rating
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    getUserProfile({username: user.username});
  }, []);

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                resizeMode="cover"
                source={
                  item <= defaultRating
                    ? require('../../../assets/icons/filled-star.png')
                    : require('../../../assets/icons/star.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return userProfileLoading ? (
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
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: moderateScale(20), color: Colors.INACTIVEGREY}}>
              Rating
            </Text>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign
                name="close"
                size={moderateScale(20)}
                color={COLORS.BLACK}
              />
            </Button>
          </Dialog.Actions>
          <Dialog.Content>
            <CustomRatingBar />
            <MainButton
              containerStyle={{marginTop: verticalScale(25)}}
              text={'Submit'}
              onPress={() => {
                addRating({id: userProfile.id, rating: defaultRating});
                setModalVisible(false);
              }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{backgroundColor: COLORS.WHITE}}
          visible={likedModal}
          onDismiss={() => setLikedModal(false)}>
          <Dialog.Content>
            <Text>You've already liked this profile!</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View style={{flex: 1}}>
        <ImageBackground
          style={styles.imgContainer}
          source={{
            uri: userProfile.profilePhoto
              ? BASE_IMG_URL + userProfile.profilePhoto
              : 'https://i.pravatar.cc/400',
          }}>
          <View
            style={{
              paddingHorizontal: horizontalScale(30),
              paddingVertical: verticalScale(30),
              alignItems: 'flex-start',
            }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialIcons
                name="arrow-back-ios"
                size={moderateScale(30)}
                color={COLORS.BLACK}
              />
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.actionContainer}>
          {isVotingBlock === 0 && isUserVotingBlock === 0 ? (
            <Pressable
              onPress={() => {
                if (userProfile.availableVotes.votesAvailable !== 0) {
                  sendVote({id: userProfile.id});
                } else {
                  navigation.navigate('MainStack', {
                    screen: 'VotePackagesScreen',
                  });
                }
              }}
              style={styles.action}>
              <Text style={styles.actionCount}>
                {userProfile.availableVotes
                  ? userProfile.availableVotes.votesAvailable
                  : 0}
              </Text>
              <Text style={styles.actionText}>Vote</Text>
              <Image
                style={[styles.actionIcon, {width: 32, height: 32}]}
                resizeMode="cover"
                source={require('../../../assets/icons/vote-bucket.png')}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                Alert.alert('Your voting is blocked!');
              }}
              title="Your voting is blocked!"
              style={styles.action}>
              <Text style={styles.actionCount}>
                {userProfile.availableVotes
                  ? userProfile.availableVotes.votesAvailable
                  : 0}
              </Text>
              <Text style={styles.actionText}>Vote</Text>
              <Image
                style={[styles.actionIcon, {width: 32, height: 32}]}
                resizeMode="cover"
                source={require('../../../assets/icons/vote-bucket.png')}
              />
            </Pressable>
          )}

          {hasLiked !== null ? (
            <Pressable
              onPress={() => {
                setLikedModal(true);
              }}>
              <View style={styles.action}>
                <Text style={styles.actionCount}>{userProfile.totalLikes}</Text>
                <Text style={styles.actionText}>Likes</Text>
                <Image
                  style={[styles.actionIcon, {width: 32, height: 32}]}
                  resizeMode="cover"
                  source={require('../../../assets/icons/liked.png')}
                />
              </View>
            </Pressable>
          ) : isLikingBlock === 0 && isUserLikingBlock === 0 ? (
            <Pressable
              onPress={() => {
                addLike({id: userProfile.id});
              }}
              style={styles.action}>
              <Text style={styles.actionCount}>{userProfile.totalLikes}</Text>
              <Text style={styles.actionText}>Likes</Text>
              <Image
                style={[styles.actionIcon, {width: 32, height: 32}]}
                resizeMode="cover"
                source={require('../../../assets/icons/like.png')}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                Alert.alert('Your liking is blocked!');
              }}
              style={styles.action}>
              <Text style={styles.actionCount}>{userProfile.totalLikes}</Text>
              <Text style={styles.actionText}>Likes</Text>
              <Image
                style={[styles.actionIcon, {width: 32, height: 32}]}
                resizeMode="cover"
                source={require('../../../assets/icons/like.png')}
              />
            </Pressable>
          )}

          <Pressable
            style={styles.action}
            onPress={() =>
              navigation.navigate('MainStack', {
                screen: 'CommentScreen',
                params: {
                  users: userProfile,
                },
              })
            }>
            <Text style={styles.actionCount}>{userProfile.totalComments}</Text>
            <Text style={styles.actionText}>Comments</Text>
            <Image
              style={[styles.actionIcon, {width: 40, height: 30}]}
              resizeMode="cover"
              source={require('../../../assets/icons/comment.png')}
            />
          </Pressable>

          {hasRated !== null ? (
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.action}>
              <Text style={styles.actionCount}>{userRating}</Text>
              <Text style={styles.actionText}>Rating</Text>
              {userRating === 0 ? (
                <>
                  <FontAwesome
                    name="star-o"
                    color={COLORS.BLACK}
                    size={moderateScale(35)}
                    style={{marginTop: verticalScale(6)}}
                  />
                </>
              ) : userRating <= 3 ? (
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
            </Pressable>
          ) : isRatingBlock === 0 && isUserRatingBlock === 0 ? (
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.action}>
              <Text style={styles.actionCount}>{userRating}</Text>
              <Text style={styles.actionText}>Rating</Text>
              <Image
                style={styles.actionIcon}
                source={require('../../../assets/icons/rating.png')}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                Alert.alert('Your rating is blocked!');
              }}
              title="Your rating is blocked!"
              style={styles.action}>
              <Text style={styles.actionCount}>{userRating}</Text>
              <Text style={styles.actionText}>Rating</Text>
              <Image
                style={styles.actionIcon}
                source={require('../../../assets/icons/rating.png')}
              />
            </Pressable>
          )}
        </View>

        <View style={{paddingHorizontal: horizontalScale(30)}}>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.userInfoContainer}>
          <View>
            <Text style={styles.userInfoSubHeading}>
              {userProfile.fullName}
            </Text>
            <Text style={styles.userInfoText}>@{userProfile.username}</Text>
          </View>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Image
                style={[styles.actionIcon, {width: 14, height: 18}]}
                resizeMode="cover"
                source={require('../../../assets/icons/location.png')}
              />
              <Text
                style={[
                  styles.userInfoText,
                  {paddingLeft: horizontalScale(4)},
                ]}>
                {userProfile.country}
              </Text>
            </View>
            <Text style={styles.userInfoText}>{userProfile.zodiac}</Text>
          </View>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Hobbies</Text>

          <Text style={styles.bioContent}>{userProfile.hobbies}</Text>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Bio</Text>

          <Text style={styles.bioContent}>{userProfile.bio}</Text>
        </View>

        <View
          style={[
            styles.subContainer,
            {paddingHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Nominations</Text>

          <View style={styles.nominationContainer}>
            {userProfile
              ? userProfile.nominations
                ? userProfile.nominations.map(nomination => {
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
              justifyContent: 'space-between',
            }}>
            {userProfile
              ? userProfile.galleries
                ? userProfile.galleries.map(image => {
                    return (
                      <Lightbox
                        key={image.id}
                        style={{width: '33%', height: 130, marginBottom: 2}}
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
          {userProfile
            ? userProfile.videos
              ? userProfile.videos.map(video => {
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
                  );
                })
              : null
            : null}
        </View>

        <View
          style={[
            styles.subContainer,
            {marginHorizontal: horizontalScale(30)},
          ]}>
          <Text style={styles.heading}>Url</Text>
          <View>
            {userProfile
              ? userProfile.urls
                ? userProfile.urls.map(url => {
                    return (
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
                    );
                  })
                : null
              : null}
          </View>
        </View>

        <View style={styles.footerLogoContainer}>
          <Image source={require('../../../assets/logos/logo.png')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: COLORS.BLACK,
  },
  actionText: {
    fontSize: moderateScale(16),
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
  // Rating
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImageStyle: {
    width: moderateScale(40),
    height: moderateScale(40),
    margin: 5,
  },
});

export default UserProfileScreen;
