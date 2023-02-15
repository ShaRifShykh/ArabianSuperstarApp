import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Image, Text, FlatList, Pressable} from 'react-native';
import COLORS from '../../constant/Colors';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainLoader from '../../components/MainLoader';
import FastImage from 'react-native-fast-image';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const {
    getTopContestants,
    getFeeds,
    feeds,
    topContestants,
    homeLoading,
    homeLoading2,
  } = useContext(ArabianSuperStarContext);

  useEffect(() => {
    getTopContestants();
    getFeeds();
  }, []);

  return homeLoading || homeLoading2 ? (
    <MainLoader />
  ) : (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../../../assets/logos/logo.png')} />
      </View>

      <View style={styles.mainContainer}>
        <View style={{paddingBottom: verticalScale(40)}}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Top Contestant</Text>
          </View>

          <FlatList
            data={topContestants}
            renderItem={user => (
              <View
                style={{paddingRight: horizontalScale(12)}}
                key={user.item.id}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('MainStack', {
                      screen: 'UserProfileScreen',
                      params: {
                        user: user.item,
                      },
                    });
                  }}
                  style={{alignItems: 'center'}}>
                  {/* <View
                    style={{
                      width: 70,
                      height: 70,
                      borderWidth: 2,
                      borderRadius: 75,
                      padding: 2,
                      borderColor: COLORS.ORANGE,
                    }}>

                  </View> */}

                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={[COLORS.YELLOW, COLORS.ORANGE]}
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 75,
                      padding: 3,
                    }}>
                    <View
                      style={{
                        backgroundColor: COLORS.WHITE,
                        borderRadius: 100,
                        padding: 1,
                      }}>
                      <FastImage
                        style={[styles.avatar]}
                        source={{
                          uri: user.item.profilePhoto
                            ? BASE_IMG_URL + user.item.profilePhoto
                            : 'https://i.pravatar.cc/400',
                        }}
                      />
                    </View>
                  </LinearGradient>

                  <Text
                    style={{
                      color: COLORS.INACTIVEGREY,
                      fontSize: 12,
                      marginTop: 2,
                    }}>
                    {user.item.fullName}
                  </Text>
                </Pressable>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={user => user.id}
            horizontal={true}
            style={{flexDirection: 'row'}}
          />
        </View>

        <FlatList
          data={feeds}
          renderItem={user => (
            <View style={{marginTop: verticalScale(25)}} key={user.item.id}>
              <Pressable
                onPress={() => {
                  navigation.navigate('MainStack', {
                    screen: 'UserProfileScreen',
                    params: {
                      user: user.item,
                    },
                  });
                }}
                style={styles.discoverProfileContainer}>
                <FastImage
                  style={[
                    styles.avatar,
                    {width: horizontalScale(50), height: verticalScale(55)},
                  ]}
                  source={{
                    uri: user.item.profilePhoto
                      ? BASE_IMG_URL + user.item.profilePhoto
                      : 'https://i.pravatar.cc/200',
                  }}
                />
                <View style={{paddingLeft: horizontalScale(14)}}>
                  <Text style={styles.profileName}>{user.item.fullName}</Text>
                  <Text style={styles.country}>
                    {user.item.country ?? null}
                  </Text>
                </View>
              </Pressable>
              <FastImage
                style={{
                  width: '100%',
                  height: 300,
                  borderRadius: 15,
                }}
                source={{
                  uri: user.item.feedGallery
                    ? BASE_IMG_URL + user.item.feedGallery.image
                    : 'https://i.pravatar.cc/400',
                }}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={user => user.id}
          contentContainerStyle={{paddingBottom: 200}}
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
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(10),
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(30),
  },
  headingContainer: {
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  heading: {
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    fontWeight: '600',
    color: COLORS.INACTIVEGREY,
  },
  avatar: {
    resizeMode: 'cover',
    borderRadius: 75,
    width: '100%',
    height: '100%',
  },
  profileName: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
  country: {
    color: COLORS.INACTIVEGREY,
  },
  discoverProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
});

export default HomeScreen;
