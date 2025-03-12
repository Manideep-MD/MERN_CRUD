import {useDispatch} from 'react-redux';
import {SET_TOKEN} from '../Redux/Reducers/TokenReducers';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {fetchTasks, userLogin, userRegister} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {HIDE_LOADER, SHOW_LOADER} from '../Redux/Reducers/LoaderReducers';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleLogin = async payload => {
    dispatch(SHOW_LOADER());
    try {
      const response = await userLogin(payload);

      if (response?.status === 200) {
        console.log(response?.data?.token, 'data=========>');

        await AsyncStorage.setItem('userToken', response?.data?.token);

        dispatch(SET_TOKEN(response?.data?.token));

        Toast.show(response.data.message, 2, Toast.CENTER);

        navigation.navigate('Dashboard');
      } else {
        console.log('Error while logging in');
      }
    } catch (error) {
      console.log(
        error?.response?.data?.message || error?.message || 'Login failed',
      );
      Toast.showWithGravity(
        error?.response?.data?.message || error?.message || 'Login failed',
        2,
        Toast.BOTTOM,
      );
    } finally {
      dispatch(HIDE_LOADER());
    }
  };

  const handleRegister = async payload => {
    dispatch(SHOW_LOADER());
    try {
      const response = await userRegister(payload);

      if (response?.status === 201) {
        Toast.show(response.data.message, 2, Toast.CENTER);
        navigation.navigate('Login');
      } else {
        console.log('Error while logging in');
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.message || error?.message || 'Register failed',
      );
      Toast.showWithGravity(
        error?.response?.data?.message || error?.message || 'Register failed',
        2,
        Toast.BOTTOM,
      );
    } finally {
      dispatch(HIDE_LOADER());
    }
  };

  return {
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
