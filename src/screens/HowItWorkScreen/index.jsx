import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '../../constant/Colors';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import MainLoader from '../../components/MainLoader';
import RenderHTML from 'react-native-render-html';

const HowItWorkScreen = ({navigation}) => {
  const {getHowItWorks, howItWorks, howItWorksLoading} = useContext(
    ArabianSuperStarContext,
  );

  useEffect(() => {
    getHowItWorks();
  }, []);

  return howItWorksLoading ? (
    <MainLoader />
  ) : (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
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
        </Pressable>
        <Text style={styles.appBarTitle}>How it works</Text>
      </View>

      <View style={styles.mainContainer}>
        <RenderHTML
          source={{
            html: `${howItWorks}`,
          }}
          contentWidth={Dimensions.get('window').width}
          tagsStyles={{
            p: {color: Colors.BLACK},
            li: {color: Colors.BLACK},
            div: {color: Colors.BLACK},
            img: {width: Dimensions.get('window').width},
          }}
        />
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
    backgroundColor: '#fff',
  },
  appBarContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  appBarTitle: {
    fontWeight: 'bold',
    color: Colors.BLACK,
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
  },
  mainContainer: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(25),
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default HowItWorkScreen;
