import axios from 'axios';
import {createContext, useState, useEffect} from 'react';
import {BASE_URL} from '../constant/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from '../constant/StorageKeys';
import NetInfo from '@react-native-community/netinfo';

export const ArabianSuperStarContext = createContext();

export const ArabianSuperStarProvider = ({children}) => {
  // Check Internet
  const [connected, setConnected] = useState(true);
  // Authentication Coding
  const [user, setUser] = useState(null);
  const [topContestants, setTopContestants] = useState(null);
  const [feeds, setFeeds] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [comments, setComments] = useState(null);
  const [userTotalRating, setUserTotalRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [isCommentingBlock, setIsCommentingBlock] = useState(0);
  const [isLikingBlock, setIsLikingBlock] = useState(0);
  const [isVotingBlock, setIsVotingBlock] = useState(0);
  const [isRatingBlock, setIsRatingBlock] = useState(0);
  const [isUserCommentingBlock, setIsUserCommentingBlock] = useState(0);
  const [isUserLikingBlock, setIsUserLikingBlock] = useState(0);
  const [isUserVotingBlock, setIsUserVotingBlock] = useState(0);
  const [isUserRatingBlock, setIsUserRatingBlock] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [hasLiked, setHasLiked] = useState(null);
  const [hasRated, setHasRated] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);
  const [votesPlan, setVotesPlan] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState(null);
  const [FAQS, setFAQS] = useState(null);
  const [howItWorks, setHowItWorks] = useState(null);
  const [countries, setCountries] = useState(null);
  const [countriesToShow, setCountriesToShow] = useState(null);
  const [nominations, setNominations] = useState(null);
  const [maleNominations, setMaleNominations] = useState(null);
  const [femaleNominations, setFemaleNominations] = useState(null);
  const [userSelectedNominations, setUserSelectedNominations] = useState(null);

  const [authLoading, setAuthLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(false);
  const [homeLoading2, setHomeLoading2] = useState(false);
  const [notifcationLoading, setNotifcationLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(true);
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [searchUsersLoading, setSearchUsersLoading] = useState(false);
  const [votesPlanLoading, setVotesPlanLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [termsAndConditionsLoading, setTermsAndConditionsLoading] =
    useState(false);
  const [FAQSLoading, setFAQSLoading] = useState(false);
  const [howItWorksLoading, setHowItWorksLoading] = useState(false);
  const [nominationLoading, setNominationLoading] = useState(false);

  const login = async ({email, password}) => {
    try {
      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/login',
        {
          email: email,
          password: password,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      );

      setUser(data.data.data);
      AsyncStorage.setItem(TOKEN, data.data.token);
      setAuthLoading(false);
      getData();

      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  // Sign Up
  const signUp = async ({
    fullName,
    username,
    email,
    phoneNo,
    password,
    confirmPassword,
  }) => {
    try {
      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/sign_up',
        {
          full_name: fullName,
          username: username,
          email: email,
          phone_no: phoneNo,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      );

      setUser(data.data.data);
      AsyncStorage.setItem(TOKEN, data.data.token);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  // Email Verification
  const verifyEmail = async ({code}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/email/verify',
        {
          code: code,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const resendEmailVerificationCode = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);
      setAuthLoading(true);

      const data = await axios.get(BASE_URL + 'auth/email/resend', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
    }
  };

  // Remaining Sign Up Process
  const addPersonalDetails = async ({
    country,
    nationality,
    gender,
    dateOfBirth,
    zodiac,
  }) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/add_personal_detail',
        {
          country: country,
          nationality: nationality,
          gender: gender,
          date_of_birth: dateOfBirth,
          zodiac: zodiac,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const addPersonalityDetails = async ({hobbies, nominations}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/add_personality_detail',
        {
          hobbies: hobbies,
          nominations: nominations,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const addBio = async ({bio}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/add_bio',
        {
          bio: bio,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const addProfilePhoto = async ({formData}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'auth/add_profile_photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);
      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
      return err;
    }
  };

  // Image CRUD
  const addImage = async ({formData}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(BASE_URL + 'gallery/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const updateImage = async ({formData, id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'gallery/update/' + id,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const deleteImage = async ({id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.get(BASE_URL + 'gallery/delete/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
      setAuthLoading(false);
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
    }
  };

  // Video CRUD
  const addVideo = async ({formData}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(BASE_URL + 'video/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const updateVideo = async ({formData, id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(BASE_URL + 'video/update/' + id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);

      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const deleteVideo = async ({id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.get(BASE_URL + 'video/delete/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
      setAuthLoading(false);
    } catch (err) {
      setAuthLoading(false);
      console.log(err);
    }
  };

  // URL CRUD
  const addUrl = async ({url}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.post(
        BASE_URL + 'url/create',
        {
          url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);
      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const deleteUrl = async ({id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);
      const data = await axios.get(BASE_URL + 'url/delete/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  // Edit Profile
  const editProfile = async ({formData}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      setAuthLoading(true);

      const data = await axios.post(BASE_URL + 'edit_profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  const editGender = async ({gender, nominations}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);
      setAuthLoading(true);

      const data = await axios.post(
        BASE_URL + 'edit_gender',
        {
          gender: gender,
          nominations: nominations,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);
      setAuthLoading(false);
      return data;
    } catch (err) {
      setAuthLoading(false);
      return err;
    }
  };

  // get User
  const getUser = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      AsyncStorage.clear();

      return data.data.message;
    } catch (error) {}
  };

  // get Profile
  const getProfile = async () => {
    try {
      setProfileLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.data);
      setUserTotalRating(data.data.totalUserRating);
      setProfileLoading(false);
    } catch (err) {
      setProfileLoading(false);
      console.log(err.response);
    }
  };

  // get Top Contestants
  const getTopContestants = async () => {
    try {
      setHomeLoading2(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'top_contestants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTopContestants(data.data);
      setHomeLoading2(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  // get Feds
  const getFeeds = async () => {
    try {
      setHomeLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'feeds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeeds(data.data);
      setHomeLoading(false);
    } catch (err) {
      setHomeLoading(false);
      console.log(err.response);
    }
  };

  // get Notifications
  const getNotifications = async () => {
    try {
      setNotifcationLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications(data.data.data);
      setNotifcationLoading(false);
    } catch (err) {
      setNotifcationLoading(false);
      console.log(err.response);
    }
  };

  // get Comments
  const getComments = async ({id}) => {
    try {
      setCommentLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'comments/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(data.data.data);
      setIsCommentingBlock(data.data.isCommentingBlock);
      setIsUserCommentingBlock(data.data.isUserCommentingBlock);
      setCommentLoading(false);
    } catch (err) {
      setCommentLoading(false);
      console.log(err.response);
    }
  };

  // add Comments
  const addComment = async ({id, comment}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.post(
        BASE_URL + 'add_comment/' + id,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComments(data.data.data);
      if (id === user.id) {
        setUser(data.data.user);
      } else {
        setUserProfile(data.data.user);
      }
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response.data);
      } else {
        console.log(err.response);
      }
    }
  };

  // get User Profile
  const getUserProfile = async ({username}) => {
    try {
      setUserProfileLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'profile/' + username, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(data.data.data);
      setUserRating(data.data.rating);
      setHasLiked(data.data.hasLiked);
      setHasRated(data.data.hasRated);
      setIsLikingBlock(data.data.isLikingBlock);
      setIsRatingBlock(data.data.isRatingBlock);
      setIsVotingBlock(data.data.isVotingBlock);
      setIsUserLikingBlock(data.data.isUserLikingBlock);
      setIsUserRatingBlock(data.data.isUserRatingBlock);
      setIsUserVotingBlock(data.data.isUserVotingBlock);

      setUserProfileLoading(false);
    } catch (err) {
      setUserProfileLoading(false);
      console.log(err.response);
    }
  };

  // add like to user
  const addLike = async ({id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'add_like/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(data.data.data);
      setHasLiked(data.data.hasLiked);
    } catch (err) {
      console.log(err.response);
    }
  };

  // send vote to user
  const sendVote = async ({id}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'send_vote/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserProfile(data.data.userData);
      setUser(data.data.data);
    } catch (err) {
      if (err.response.status === 400) {
        console.log(err.response);
      } else {
        console.log(err.response);
      }
    }
  };

  // search user
  const searchUser = async ({query, filter, country, gender}) => {
    try {
      setSearchUsersLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.post(
        BASE_URL + 'search',
        {
          search: query,
          filter: filter,
          country: country,
          gender: gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSearchUsers(data.data.data);
      setSearchUsersLoading(false);
    } catch (err) {
      setSearchUsersLoading(false);
      console.log(err.response);
    }
  };

  // search user
  const getVotesPlan = async () => {
    try {
      setVotesPlanLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'vote_plans', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVotesPlan(data.data.data);
      setVotesPlanLoading(false);
    } catch (err) {
      setVotesPlanLoading(false);
      console.log(err.response);
    }
  };

  // give rating to user
  const addRating = async ({id, rating}) => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.post(
        BASE_URL + 'add_rating/' + id,
        {
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUserProfile(data.data.data);
      setHasRated(data.data.hasRated);
      setUserRating(data.data.rating);
    } catch (err) {
      console.log(err.response);
    }
  };

  const buyVotes = async ({
    planId,
    cardNumber,
    cardholderName,
    month,
    year,
    cvv,
  }) => {
    try {
      setCheckoutLoading(true);

      let token = await AsyncStorage.getItem(TOKEN);
      const data = await axios.post(
        BASE_URL + 'buy_votes/' + planId,
        {
          cardNumber: cardNumber,
          cardholderName: cardholderName,
          month: month,
          year: year,
          cvv: cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.data.data);
      setCheckoutLoading(false);
      getNotifications();

      return data;
    } catch (err) {
      setCheckoutLoading(false);
      return err;
    }
  };

  // get Terms And Conditions
  const getTermsAndConditions = async () => {
    try {
      setTermsAndConditionsLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'terms_and_conditions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTermsAndConditions(data.data.data);
      setTermsAndConditionsLoading(false);
    } catch (err) {
      setTermsAndConditionsLoading(false);
      console.log(err.response);
    }
  };

  // get FAQs
  const getFAQs = async () => {
    try {
      setFAQSLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'faqs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFAQS(data.data.data);
      setFAQSLoading(false);
    } catch (err) {
      setFAQSLoading(false);
      console.log(err.response);
    }
  };

  // get How It Works
  const getHowItWorks = async () => {
    try {
      setHowItWorksLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'how_it_works', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHowItWorks(data.data.data);
      setHowItWorksLoading(false);
    } catch (err) {
      setHowItWorksLoading(false);
      console.log(err.response);
    }
  };

  // get countries
  const getCountries = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'countries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCountries(data.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const getCountriesToShow = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'countries_to_show', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCountriesToShow(data.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  // get Nominations
  const getNominations = async () => {
    try {
      setNominationLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'nominations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNominationLoading(false);
      setNominations(data.data.data);
    } catch (err) {
      setNominationLoading(false);
      console.log(err.response);
    }
  };

  const getMaleNominations = async () => {
    try {
      setNominationLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'male_nominations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNominationLoading(false);
      setMaleNominations(data.data.data);
    } catch (err) {
      setNominationLoading(false);
      console.log(err.response);
    }
  };

  const getFemaleNominations = async () => {
    try {
      setNominationLoading(true);
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'female_nominations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNominationLoading(false);
      setFemaleNominations(data.data.data);
    } catch (err) {
      setNominationLoading(false);
      console.log(err.response);
    }
  };

  const getUserSelectedNominations = async () => {
    try {
      let token = await AsyncStorage.getItem(TOKEN);

      const data = await axios.get(BASE_URL + 'user_selected_nominations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserSelectedNominations(data.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const getData = () => {
    getUser();
    getProfile();
    // Get Home Data
    getTopContestants();
    getFeeds();
    // Get Notification Data
    getNotifications();
    // Get Votes Plan
    getVotesPlan();
    // Get Terms And Conditions
    getTermsAndConditions();
    // Get FAQS
    getFAQs();
    // Get How It Works
    getHowItWorks();
    // Get Countries
    getCountries();
    getCountriesToShow();
    // Get Nominations
    getMaleNominations();
    getFemaleNominations();
    getUserSelectedNominations();
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnected(state.isConnected);
    });

    if (connected) {
      getData();
    }
  }, []);
  // connected, setConnected

  return (
    <ArabianSuperStarContext.Provider
      value={{
        // Auth
        user,
        login,
        // Sign Up
        signUp,
        // Email Verification
        verifyEmail,
        resendEmailVerificationCode,
        // Remaining Sign Up
        addPersonalDetails,
        addPersonalityDetails,
        addBio,
        addProfilePhoto,

        // Image CRUD
        addImage,
        updateImage,
        deleteImage,

        // Video CRUD
        addVideo,
        updateVideo,
        deleteVideo,

        // URL CRUD
        addUrl,
        deleteUrl,

        getData,

        // edit Profile
        editProfile,
        editGender,

        getProfile,
        getTopContestants,
        getFeeds,
        getNotifications,
        getComments,
        userTotalRating,
        topContestants,
        feeds,
        notifications,
        comments,
        isCommentingBlock,
        isUserCommentingBlock,
        profileLoading,
        authLoading,
        homeLoading,
        homeLoading2,
        notifcationLoading,
        commentLoading,
        // User Profile
        getUserProfile,
        userProfileLoading,
        userProfile,
        userRating,
        hasLiked,
        hasRated,
        isLikingBlock,
        isVotingBlock,
        isRatingBlock,
        isUserLikingBlock,
        isUserRatingBlock,
        isUserVotingBlock,
        addLike,
        sendVote,
        // Comments
        addComment,
        // Search
        searchUser,
        searchUsersLoading,
        searchUsers,
        // Votes Plan
        getVotesPlan,
        votesPlan,
        votesPlanLoading,
        // Checkout
        buyVotes,
        checkoutLoading,
        // Rating
        addRating,
        // Check Internet
        connected,
        // Get Terms And Conditions
        getTermsAndConditions,
        termsAndConditionsLoading,
        termsAndConditions,
        // Get FAQs
        getFAQs,
        FAQS,
        FAQSLoading,
        // Get How It Works
        getHowItWorks,
        howItWorks,
        howItWorksLoading,
        // Logout
        logout,
        // Countries
        countries,
        countriesToShow,
        // get Nominations
        getNominations,
        nominations,
        nominationLoading,
        maleNominations,
        femaleNominations,
        getUserSelectedNominations,
        userSelectedNominations,
      }}>
      {children}
    </ArabianSuperStarContext.Provider>
  );
};
