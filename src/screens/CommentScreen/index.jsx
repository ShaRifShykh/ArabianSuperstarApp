import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Pressable,
  Image,
  Keyboard,
} from 'react-native';
import Colors from '../../constant/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BASE_IMG_URL} from '../../constant/BaseUrl';
import FastImage from 'react-native-fast-image';
import {ArabianSuperStarContext} from '../../context/ArabianSuperStarContext';
import MainLoader from '../../components/MainLoader';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const CommentScreen = ({route, navigation}) => {
  const {
    getComments,
    comments,
    commentLoading,
    isCommentingBlock,
    isUserCommentingBlock,
    addComment,
    user,
  } = useContext(ArabianSuperStarContext);
  const {users} = route.params;

  const [commentVal, setCommentVal] = useState('');

  useEffect(() => {
    getComments({id: users.id});
  }, []);

  return (
    <View style={styles.container}>
      {commentLoading ? (
        <MainLoader />
      ) : (
        <ScrollView
          style={styles.content}
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
              <Text
                style={{
                  fontWeight: 'bold',
                  color: Colors.BLACK,
                  fontSize: moderateScale(16),
                }}>
                Comments
              </Text>
            </Pressable>

            <FastImage
              style={{
                width: moderateScale(45),
                height: moderateScale(45),
                borderRadius: 100,
              }}
              source={{
                uri: users
                  ? BASE_IMG_URL + users.profilePhoto
                  : 'https://i.pravatar.cc/400',
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: horizontalScale(25),
              paddingVertical: verticalScale(30),
            }}>
            {comments.map(comment => {
              return (
                <Pressable
                  onPress={() => {
                    if (comment.commentBy.id != user.id) {
                      navigation.navigate('MainStack', {
                        screen: 'UserProfileScreen',
                        params: {
                          user: comment.commentBy,
                        },
                      });
                    }
                  }}
                  key={comment.id}
                  style={{flexDirection: 'row', marginBottom: 20}}>
                  <FastImage
                    style={{
                      width: moderateScale(55),
                      height: moderateScale(55),
                      borderRadius: 100,
                    }}
                    source={{
                      uri: comment.commentBy.profilePhoto
                        ? BASE_IMG_URL + comment.commentBy.profilePhoto
                        : 'https://i.pravatar.cc/400',
                    }}
                  />

                  <View style={{marginLeft: horizontalScale(10)}}>
                    <Text style={styles.subHeading}>
                      {comment.commentBy.fullName}
                    </Text>
                    <Text
                      style={[styles.infoText, {marginTop: verticalScale(2)}]}>
                      {comment.comment}
                    </Text>
                    <Text style={styles.time}>{comment.createdAt}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      )}

      {isCommentingBlock === 0 && isUserCommentingBlock === 0 ? (
        <View style={styles.footer}>
          <TextInput
            placeholder="Type a message..."
            value={commentVal}
            onChangeText={text => setCommentVal(text)}
            style={styles.input}
          />
          <Button
            onPress={() => {
              addComment({id: users.id, comment: commentVal});
              Keyboard.dismiss();
              setCommentVal('');
            }}>
            <Ionicons
              name="send"
              size={moderateScale(22)}
              color={Colors.MAIN1}
            />
          </Button>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: verticalScale(40),
    padding: 10,
    backgroundColor: '#fff',
    color: Colors.INACTIVEGREY,
    flex: 1,
  },
  appBarContainer: {
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  subHeading: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: Colors.BLACK,
  },
  infoText: {
    fontSize: moderateScale(13),
    color: Colors.BLACK,
    width: '70%',
  },
  time: {
    fontSize: moderateScale(11),
    color: Colors.BLACK,
  },
});

export default CommentScreen;
