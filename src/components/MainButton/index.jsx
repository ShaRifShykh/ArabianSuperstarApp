import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../constant/Colors';
import {verticalScale} from '../../constant/Metrics';

const MainButton = ({onPress, text, containerStyle, style, textStyle}) => {
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[COLORS.MAIN1, COLORS.MAIN2]}
        style={[styles.container, style]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: COLORS.WHITE,
    textTransform: 'uppercase',
  },
});

export default MainButton;
