import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constant/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const VotePackage = ({onPress, votes, price}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[Colors.YELLOW, Colors.ORANGE]}
        style={styles.packageContainer}>
        <Text style={styles.packageVote}>{votes}</Text>
        <Text style={styles.packageVote}>Votes</Text>
      </LinearGradient>

      <View style={styles.packageInfoContainer}>
        <Text style={styles.packageInfoPrice}>{price}</Text>
        <Text style={styles.packageInfoDesc}>
          Buy vote and you may win crash prizes
        </Text>
        <Pressable onPress={onPress}>
          <Text style={styles.packageBuyBtn}>Click To Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    alignItems: 'center',
  },
  packageContainer: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    top: 40,
    zIndex: 2,
  },
  packageVote: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: Colors.WHITE,
  },
  packageInfoContainer: {
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    paddingHorizontal: horizontalScale(15),
    paddingTop: verticalScale(50),
    borderRadius: 15,
    paddingBottom: 20,
    alignItems: 'center',
  },
  packageInfoPrice: {
    fontSize: moderateScale(24),
    color: Colors.BLACK,
  },
  packageInfoDesc: {
    fontSize: moderateScale(10),
    color: Colors.INACTIVEGREY,
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
  packageBuyBtn: {
    fontSize: moderateScale(15),
    color: Colors.YELLOW,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
});

export default VotePackage;
