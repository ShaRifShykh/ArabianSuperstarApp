import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Text,
  Pressable,
  FlatList,
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
import {Button, Dialog, Portal, RadioButton} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import MainButton from '../../components/MainButton';

const SearchScreen = ({navigation}) => {
  const {searchUser, searchUsersLoading, searchUsers, countries} = useContext(
    ArabianSuperStarContext,
  );

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState(null);
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);

  const genders = [{value: 'Male'}, {value: 'Female'}];

  useEffect(() => {
    searchUser({
      query: '',
      filter: null,
      country: null,
      gender: null,
    });
  }, []);

  return searchUsersLoading ? (
    <MainLoader />
  ) : (
    <View style={styles.container}>
      <Portal>
        <Dialog
          style={{backgroundColor: Colors.WHITE}}
          visible={modalVisible}
          onDismiss={() => setModalVisible(!modalVisible)}>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <AntDesign
                name="close"
                size={moderateScale(20)}
                color={Colors.BLACK}
              />
            </Button>
          </Dialog.Actions>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={newValue => setFilter(newValue)}
              value={filter}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton color={Colors.MAIN1} value="full_name" />
                    <Text style={{color: Colors.BLACK}}>Full Name</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton color={Colors.MAIN1} value="email" />
                    <Text style={{color: Colors.BLACK}}>Email</Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton color={Colors.MAIN1} value="username" />
                    <Text style={{color: Colors.BLACK}}>Username</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton color={Colors.MAIN1} value="nationality" />
                    <Text style={{color: Colors.BLACK}}>Nominations</Text>
                  </View>
                </View>
              </View>

              <View style={{marginTop: 10}}>
                <Text style={{color: Colors.BLACK}}>Nationality</Text>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={{color: Colors.INACTIVEGREY, fontSize: 14}}
                  selectedTextStyle={{color: Colors.BLACK, fontSize: 14}}
                  itemTextStyle={{color: Colors.INACTIVEGREY, fontSize: 14}}
                  data={countries}
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder={'Select Country'}
                  value={country}
                  search={true}
                  onChange={item => {
                    setCountry(item.name);
                  }}
                />
              </View>

              <View style={{marginTop: 10}}>
                <Text style={{color: Colors.BLACK}}>Gender</Text>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={{color: Colors.INACTIVEGREY, fontSize: 14}}
                  selectedTextStyle={{color: Colors.BLACK, fontSize: 14}}
                  itemTextStyle={{color: Colors.INACTIVEGREY, fontSize: 14}}
                  data={genders}
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder={'Select Gender'}
                  value={gender}
                  onChange={item => {
                    setGender(item.value);
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <MainButton
                  text={'Go'}
                  onPress={() => {
                    searchUser({
                      query: search,
                      filter: filter,
                      country: country,
                      gender: gender,
                    });
                    setModalVisible(!modalVisible);
                  }}
                  containerStyle={{width: '48%'}}
                />
                <MainButton
                  text={'Reset'}
                  onPress={() => {
                    setFilter('');
                    setCountry('');
                    setGender('');
                  }}
                  containerStyle={{width: '48%'}}
                />
              </View>
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: horizontalScale(20),
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => {
            searchUser({
              query: search,
              filter: filter,
              country: country,
              gender: gender,
            });
          }}>
          <Image
            source={require('../../../assets/icons/search-sm.png')}
            resizeMode="cover"
            style={{width: 20, height: 20}}
          />
        </Pressable>
        <TextInput
          keyboardType="default"
          placeholderTextColor={Colors.BLACK}
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../../../assets/icons/filter.png')}
            resizeMode="cover"
            style={{width: 20, height: 20}}
          />
        </Pressable>
      </View>
      <View style={styles.divider}></View>

      <View style={styles.mainContainer}>
        <FlatList
          data={searchUsers}
          ListEmptyComponent={() => {
            return (
              <View style={{alignItems: 'center'}}>
                <Text>No User Found!</Text>
              </View>
            );
          }}
          renderItem={user => (
            <Pressable
              onPress={() => {
                navigation.navigate('MainStack', {
                  screen: 'UserProfileScreen',
                  params: {
                    user: user.item,
                  },
                });
              }}
              style={styles.contentContainer}>
              <FastImage
                style={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                  borderRadius: 100,
                }}
                source={{
                  uri: user.item.profilePhoto
                    ? BASE_IMG_URL + user.item.profilePhoto
                    : 'https://i.pravatar.cc/400',
                }}
              />
              <View style={{marginLeft: horizontalScale(10)}}>
                <Text style={styles.subHeading}>{user.item.fullName}</Text>
                <Text style={[styles.infoText, {marginTop: 2}]}>
                  @{user.item.username}
                </Text>
              </View>
            </Pressable>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={user => user.id}
          contentContainerStyle={{paddingBottom: verticalScale(50)}}
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
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(25),
  },
  dropdown: {
    height: 50,
    marginTop: 10,
    borderColor: '#BBBBBB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  input: {
    fontSize: moderateScale(13),
    color: Colors.INACTIVEGREY,
    width: '80%',
    marginHorizontal: horizontalScale(10),
  },
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: Colors.GREY,
  },
  subHeading: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: Colors.BLACK,
  },
  infoText: {
    fontSize: moderateScale(18),
    color: Colors.BLACK,
  },
  contentContainer: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
});

export default SearchScreen;
