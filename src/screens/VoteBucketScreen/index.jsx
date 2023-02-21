import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import Colors from '../../constant/Colors';
import MainButton from '../../components/MainButton';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const VoteBucketScreen = ({navigation}) => {
  const {user} = useContext(ArabianSuperStarContext);

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: verticalScale(20)}}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>My Votes Bucket</Text>
        </View>

        <View style={styles.profilePictureContainer}>
          <Image
            style={styles.profilePicture}
            source={{
              uri: user
                ? BASE_IMG_URL + user.profilePhoto
                : 'https://i.pravatar.cc/400',
            }}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.userInfoSubHeading}>{user.fullName}</Text>
          <Text style={[styles.userInfoText, {marginTop: verticalScale(5)}]}>
            @{user ? user.username : null}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: verticalScale(10),
            }}>
            <Image
              style={[styles.actionIcon, {width: 14, height: 18}]}
              source={require('../../../assets/icons/location.png')}
            />
            <Text
              style={[styles.userInfoText, {paddingLeft: horizontalScale(4)}]}>
              {user ? user.country : null}
            </Text>
          </View>

          <View
            style={{
              marginTop: verticalScale(25),
              alignItems: 'center',
              marginBottom: verticalScale(40),
            }}>
            <Image
              style={[
                styles.actionIcon,
                {width: moderateScale(40), height: moderateScale(40)},
              ]}
              source={require('../../../assets/icons/vote-bucket.png')}
            />
            <Text
              style={[
                styles.userInfoSubHeading,
                {marginTop: verticalScale(10)},
              ]}>
              {user ? user.availableVotes.votesAvailable : 0} Available Votes
            </Text>
          </View>

          <MainButton
            style={{paddingHorizontal: horizontalScale(30)}}
            textStyle={{fontWeight: '700'}}
            text={'Buy Votes'}
            onPress={() =>
              navigation.navigate('MainStack', {
                screen: 'VotePackagesScreen',
              })
            }
          />
        </View>
      </View>

      <View style={styles.footerLogoContainer}>
        <Image
          source={require('../../../assets/logos/logo.png')}
          style={{width: '80%', height: 80}}
          resizeMode="contain"
        />
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
  mainContainer: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(25),
  },
  headingContainer: {
    paddingTop: verticalScale(40),
    paddingHorizontal: horizontalScale(60),
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(35),
    fontWeight: '700',
    color: Colors.BLACK,
    textAlign: 'center',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  profilePicture: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginBottom: 2,
    borderRadius: 100,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: verticalScale(15),
  },
  userInfoSubHeading: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: Colors.BLACK,
  },
  userInfoText: {
    fontSize: moderateScale(16),
    color: Colors.BLACK,
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default VoteBucketScreen;
