import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constant/Colors';
import VotePackage from '../../components/VotePackage';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainLoader from '../../components/MainLoader';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const VotePackagesScreen = ({navigation}) => {
  const {getVotesPlan, votesPlan, votesPlanLoading} = useContext(
    ArabianSuperStarContext,
  );

  useEffect(() => {
    getVotesPlan();
  }, []);

  return votesPlanLoading ? (
    <MainLoader />
  ) : (
    <ScrollView
      contentContainerStyle={{paddingBottom: verticalScale(20)}}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={styles.imgContainer}
          source={{uri: 'https://i.pravatar.cc/340'}}>
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
                color={Colors.BLACK}
              />
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Buy Votes</Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {votesPlan
            ? votesPlan.map(plan => {
                return (
                  <VotePackage
                    key={plan.id}
                    onPress={() =>
                      navigation.navigate('MainStack', {
                        screen: 'CardDetailScreen',
                        params: {
                          plan: plan,
                        },
                      })
                    }
                    price={plan.price}
                    votes={plan.votes}
                  />
                );
              })
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
    height: verticalScale(260),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
  },
  mainContainer: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(25),
  },
  heading: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default VotePackagesScreen;
