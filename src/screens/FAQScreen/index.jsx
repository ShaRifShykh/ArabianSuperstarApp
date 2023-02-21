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
import {List} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

const FAQScreen = ({navigation}) => {
  const {getFAQs, FAQS, FAQSLoading} = useContext(ArabianSuperStarContext);

  useEffect(() => {
    getFAQs();
  }, []);

  return FAQSLoading ? (
    <>
      <MainLoader />
    </>
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
        <Text style={styles.appBarTitle}>FAQs</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={{marginBottom: verticalScale(10)}}>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: 'bold',
              color: Colors.BLACK,
            }}>
            Frequently Asked Questions
          </Text>
        </View>

        {FAQS.map(faq => {
          return (
            <List.Accordion
              key={faq.id}
              title={faq.question}
              titleNumberOfLines={4}
              style={{backgroundColor: Colors.WHITE}}
              titleStyle={{
                fontSize: 15,
                color: Colors.BLACK,
              }}>
              <List.Item
                title={
                  faq.answer.includes('</a>') ? (
                    <RenderHTML
                      source={{
                        html: `${faq.answer}`,
                      }}
                      contentWidth={Dimensions.get('window').width}
                      tagsStyles={{
                        p: {color: Colors.INACTIVEGREY},
                        div: {color: Colors.INACTIVEGREY},
                      }}
                    />
                  ) : (
                    <Text style={{color: Colors.INACTIVEGREY}}>
                      {faq.answer}
                    </Text>
                  )
                }
                titleNumberOfLines={10}
                titleStyle={{fontSize: 14, color: Colors.INACTIVEGREY}}
              />
            </List.Accordion>
          );
        })}
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

export default FAQScreen;
