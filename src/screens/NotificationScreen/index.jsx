import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import Colors from '../../constant/Colors';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainLoader from '../../components/MainLoader';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import FastImage from 'react-native-fast-image';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const NotificationScreen = ({navigation}) => {
  const {getNotifications, notifications, notifcationLoading, user} =
    useContext(ArabianSuperStarContext);

  useEffect(() => {
    getNotifications();
  }, []);

  const FooterComponent = () => {
    return (
      <View style={styles.appBarContainer}>
        <Text
          style={{
            fontWeight: '700',
            color: Colors.BLACK,
            fontSize: moderateScale(20),
          }}>
          Notifications
        </Text>
      </View>
    );
  };

  return notifcationLoading ? (
    <MainLoader />
  ) : (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FlatList
          ListHeaderComponent={<FooterComponent />}
          data={notifications}
          renderItem={notification =>
            notification.item.comment ? (
              <>
                <Pressable
                  onPress={() => {
                    if (notification.item.comment.commentBy.id != user.id) {
                      navigation.replace('MainStack', {
                        screen: 'UserProfileScreen',
                        params: {
                          user: notification.item.comment.commentBy,
                        },
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    marginVertical: verticalScale(10),
                  }}>
                  <FastImage
                    style={{
                      width: moderateScale(60),
                      height: moderateScale(60),
                      borderRadius: 100,
                    }}
                    source={{
                      uri: notification.item.comment.commentBy.profilePhoto
                        ? BASE_IMG_URL +
                          notification.item.comment.commentBy.profilePhoto
                        : 'https://i.pravatar.cc/400',
                    }}
                  />

                  <View style={{marginLeft: horizontalScale(10)}}>
                    <Text style={styles.subHeading}>
                      {notification.item.comment.commentBy.fullName}
                    </Text>
                    <Text style={[styles.infoText, {marginTop: 1}]}>
                      <Text style={{fontWeight: '800'}}>Comment</Text> on your
                      profile.
                    </Text>
                    <Text style={styles.time}>
                      {notification.item.createdAt}
                    </Text>
                  </View>
                </Pressable>
                <View style={styles.divider}></View>
              </>
            ) : notification.item.like ? (
              <>
                <Pressable
                  onPress={() => {
                    if (notification.item.like.likeBy.id != user.id) {
                      navigation.replace('MainStack', {
                        screen: 'UserProfileScreen',
                        params: {
                          user: notification.item.like.likeBy,
                        },
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    marginVertical: verticalScale(10),
                  }}>
                  <FastImage
                    style={{
                      width: moderateScale(60),
                      height: moderateScale(60),
                      borderRadius: 100,
                    }}
                    source={{
                      uri: notification.item.like.likeBy.profilePhoto
                        ? BASE_IMG_URL +
                          notification.item.like.likeBy.profilePhoto
                        : 'https://i.pravatar.cc/400',
                    }}
                  />

                  <View style={{marginLeft: horizontalScale(10)}}>
                    <Text style={styles.subHeading}>
                      {notification.item.like.likeBy.fullName}
                    </Text>
                    <Text style={[styles.infoText, {marginTop: 1}]}>
                      <Text style={{fontWeight: '800'}}>Like</Text> on your
                      profile.
                    </Text>
                    <Text style={styles.time}>
                      {notification.item.createdAt}
                    </Text>
                  </View>
                </Pressable>
                <View style={styles.divider}></View>
              </>
            ) : notification.item.rating ? (
              <>
                <Pressable
                  onPress={() => {
                    if (notification.item.rating.ratingBy.id != user.id) {
                      navigation.replace('MainStack', {
                        screen: 'UserProfileScreen',
                        params: {
                          user: notification.item.rating.ratingBy,
                        },
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    marginVertical: verticalScale(10),
                  }}>
                  <FastImage
                    style={{
                      width: moderateScale(60),
                      height: moderateScale(60),
                      borderRadius: 100,
                    }}
                    source={{
                      uri: notification.item.rating.ratingBy.profilePhoto
                        ? BASE_IMG_URL +
                          notification.item.rating.ratingBy.profilePhoto
                        : 'https://i.pravatar.cc/400',
                    }}
                  />

                  <View style={{marginLeft: horizontalScale(10)}}>
                    <Text style={styles.subHeading}>
                      {notification.item.rating.ratingBy.fullName}
                    </Text>
                    <Text style={[styles.infoText, {marginTop: 1}]}>
                      <Text style={{fontWeight: '800'}}>Rate</Text> on your
                      profile.
                    </Text>
                    <Text style={styles.time}>
                      {notification.item.createdAt}
                    </Text>
                  </View>
                </Pressable>
                <View style={styles.divider}></View>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: verticalScale(10),
                  }}>
                  <View style={{marginLeft: horizontalScale(10)}}>
                    <Text style={[styles.infoText, {marginTop: 1}]}>
                      {notification.item.message}
                    </Text>
                    <Text style={styles.time}>
                      {notification.item.createdAt}
                    </Text>
                  </View>
                </View>
                <View style={styles.divider}></View>
              </>
            )
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={notification => notification.id}
          contentContainerStyle={{paddingBottom: verticalScale(20)}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  mainContainer: {
    paddingHorizontal: horizontalScale(25),
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.GREY,
  },
  subHeading: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: Colors.BLACK,
  },
  infoText: {
    fontSize: moderateScale(14),
    color: Colors.BLACK,
  },
  time: {
    fontSize: moderateScale(12),
    color: Colors.BLACK,
  },
  appBarContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
});

export default NotificationScreen;
