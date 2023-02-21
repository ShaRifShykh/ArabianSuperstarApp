import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Image,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constant/Colors';
import MainButton from '../../../components/MainButton';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../../constant/Metrics';

const CardDetailScreen = ({route, navigation}) => {
  const {plan} = route.params;

  const [cardNumber, setcardNumber] = useState(null);
  const [cardholderName, setcardholderName] = useState(null);
  const [month, setmonth] = useState(null);
  const [year, setyear] = useState(null);

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: verticalScale(20)}}
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
        <Text
          style={{
            fontWeight: 'bold',
            color: Colors.BLACK,
            fontSize: moderateScale(16),
            textTransform: 'uppercase',
          }}>
          Checkout
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <Image
          style={{alignSelf: 'center', marginBottom: verticalScale(25)}}
          source={require('../../../../assets/vector/front.png')}
        />

        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Card Number</Text>
            <TextInput
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={text => setcardNumber(text)}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Cardholder Name</Text>
            <TextInput
              keyboardType="default"
              value={cardholderName}
              onChangeText={text => setcardholderName(text)}
              style={styles.input}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.inputContainer,
                {flex: 1, marginRight: horizontalScale(5)},
              ]}>
              <Text style={styles.inputText}>Month</Text>
              <TextInput
                keyboardType="numeric"
                value={month}
                onChangeText={text => setmonth(text)}
                style={styles.input}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                {flex: 1, marginLeft: horizontalScale(5)},
              ]}>
              <Text style={styles.inputText}>Year</Text>
              <TextInput
                keyboardType="numeric"
                value={year}
                onChangeText={text => setyear(text)}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        <MainButton
          text={'Next'}
          onPress={() => {
            navigation.navigate('MainStack', {
              screen: 'CardInfoScreen',
              params: {
                plan: plan,
                cardNumber: cardNumber,
                cardholderName: cardholderName,
                month: month,
                year: year,
              },
            });
          }}
        />
      </View>

      <View style={styles.footerLogoContainer}>
        <Image
          source={require('../../../../assets/logos/logo.png')}
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
  appBarContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  input: {
    backgroundColor: Colors.LIGHTGREY,
    color: Colors.INACTIVEGREY,
    paddingHorizontal: horizontalScale(15),
    borderRadius: 15,
    marginTop: verticalScale(10),
  },
  inputContainer: {
    marginBottom: verticalScale(20),
  },
  inputText: {
    fontSize: moderateScale(14),
    color: Colors.INACTIVEGREY,
  },
  footerLogoContainer: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
});

export default CardDetailScreen;
