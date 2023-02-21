import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constant/Colors';
import MainButton from '../../../components/MainButton';
import {Dialog, Portal} from 'react-native-paper';
import Loader from '../../../components/Loader';
import {ArabianSuperStarContext} from '../../../context/ArabianSuperStarContext';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../constant/Metrics';
import Toast, {SuccessToast} from 'react-native-toast-message';

const CardInfoScreen = ({route, navigation}) => {
  const {plan, cardNumber, cardholderName, month, year} = route.params;
  const {buyVotes, checkoutLoading} = useContext(ArabianSuperStarContext);

  const [cvv, setCvv] = useState(null);
  const [errors, setErrors] = useState({
    cardNumber: null,
    cardholderName: null,
    month: null,
    year: null,
    cvv: null,
  });
  const [showError, setShowError] = useState(false);

  const hideDialog = () => setShowError(false);

  const submit = async () => {
    Keyboard.dismiss();

    await buyVotes({
      planId: plan.id,
      cardNumber: cardNumber,
      cardholderName: cardholderName,
      month: month,
      year: year,
      cvv: cvv,
    }).then(val => {
      if (val.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Purchased Successfully! 👋',
        });
        setTimeout(() => {
          navigation.replace('BottomStack', {
            screen: 'VoteBucketScreen',
          });
        }, 1000);
      } else if (val.response.status === 400) {
        setShowError(true);
        setErrors(val.response.data.errors);
      } else {
        console.log(val.response);
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: verticalScale(20)}}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      <Loader visible={checkoutLoading} />
      <Portal>
        <Dialog visible={showError} onDismiss={hideDialog}>
          <Dialog.Title style={{textAlign: 'center'}}>Error!</Dialog.Title>
          <Dialog.Content>
            {errors.cardNumber !== null ? (
              <>
                <Text style={{color: Colors.BLACK}}>{errors.cardNumber}</Text>
              </>
            ) : null}
            {errors.cardholderName !== null ? (
              <>
                <Text style={{color: Colors.BLACK}}>
                  {errors.cardholderName}
                </Text>
              </>
            ) : null}
            {errors.month !== null ? (
              <>
                <Text style={{color: Colors.BLACK}}>{errors.month}</Text>
              </>
            ) : null}
            {errors.year !== null ? (
              <>
                <Text style={{color: Colors.BLACK}}>{errors.year}</Text>
              </>
            ) : null}
            {errors.cvv !== null ? (
              <>
                <Text style={{color: Colors.BLACK}}>{errors.cvv}</Text>
              </>
            ) : null}
          </Dialog.Content>
        </Dialog>
      </Portal>

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
          source={require('../../../../assets/vector/back.png')}
        />

        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>CVV Number</Text>
            <TextInput
              keyboardType="numeric"
              value={cvv}
              onChangeText={text => setCvv(text)}
              style={styles.input}
            />
          </View>
        </View>

        <MainButton
          text={'Buy'}
          onPress={() => {
            submit();
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

      <Toast />
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

export default CardInfoScreen;
