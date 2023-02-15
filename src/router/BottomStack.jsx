import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VoteBucketScreen from '../screens/VoteBucketScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import Colors from '../constant/Colors';
import {Image} from 'react-native';
import {moderateScale, verticalScale} from '../constant/Metrics';
import MainStack from './MainStack';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen component={HomeScreen} name="HomeStackScreen" />
      <HomeStack.Screen component={MainStack} name="MainStack" />
    </HomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        component={ProfileScreen}
        name="ProfileStackScreen"
      />
      <ProfileStack.Screen component={MainStack} name="MainStack" />
    </ProfileStack.Navigator>
  );
};

const VoteBucketStack = createStackNavigator();

const VoteBucketStackScreen = () => {
  return (
    <VoteBucketStack.Navigator screenOptions={{headerShown: false}}>
      <VoteBucketStack.Screen
        component={VoteBucketScreen}
        name="VoteBucketStackScreen"
      />
      <VoteBucketStack.Screen component={MainStack} name="MainStack" />
    </VoteBucketStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator screenOptions={{headerShown: false}}>
      <NotificationStack.Screen
        component={NotificationScreen}
        name="NotificationStackScreen"
      />
      <NotificationStack.Screen component={MainStack} name="MainStack" />
    </NotificationStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator screenOptions={{headerShown: false}}>
      <SearchStack.Screen component={SearchScreen} name="SearchStackScreen" />
      <SearchStack.Screen component={MainStack} name="MainStack" />
    </SearchStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Colors.MAIN1,
        tabBarInactiveTintColor: Colors.INACTIVEGREY,
        tabBarLabelStyle: {
          fontSize: moderateScale(8.5),
          textTransform: 'uppercase',
          fontWeight: '600',
        },
        headerShown: false,
        tabBarStyle: {
          height: verticalScale(60),
          paddingTop: verticalScale(7),
          paddingBottom: verticalScale(7),
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/icons/home.png')}
                  style={{width: 30, height: 26}}
                  resizeMode="cover"
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/icons/home-inactive.png')}
                  style={{width: 30, height: 26}}
                  resizeMode="cover"
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/icons/profile.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/icons/profile-inactive.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="VoteBucketScreen"
        component={VoteBucketStackScreen}
        options={{
          tabBarLabel: 'My Votes',
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/icons/my-vote.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/icons/my-vote-inactive.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/icons/notification.png')}
                  style={{width: 22, height: 30}}
                  resizeMode="cover"
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/icons/notification-inactive.png')}
                  style={{width: 22, height: 30}}
                  resizeMode="cover"
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              return (
                <Image
                  source={require('../../assets/icons/search.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              );
            } else {
              return (
                <Image
                  source={require('../../assets/icons/search-inactive.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="cover"
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
