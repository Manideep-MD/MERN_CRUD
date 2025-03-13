import {
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import CreateIcon from 'react-native-vector-icons/Ionicons';
import Card from '../../Components/Card/Card';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchTaskDetails, fetchTasks} from '../../api/api';
import Toast from 'react-native-simple-toast';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {REMOVE_TASK, SET_TASK} from '../../Redux/Reducers/TaskReducer';
import {REMOVE_TOKEN} from '../../Redux/Reducers/TokenReducers';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {HIDE_LOADER, SHOW_LOADER} from '../../Redux/Reducers/LoaderReducers';
import {RootState} from '../../Redux/Store/store';

const Dashboard = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [search, setSearch] = useState<any>('');
  const [taskData, setTaskData] = useState<any>([]);
  const loginToken = useSelector((state: any) => state.auth.loginToken);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState<any>(false);
  const focus = useIsFocused();
  const [loading, setLoading] = useState<boolean>(false);
  const visible = useSelector((state: RootState) => state.loader.visible);

  useEffect(() => {
    if (loginToken) {
      handleFetchTasks();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Close Crud App',
          'Are you sure you want to exit the app?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ],
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      handleFetchTasks();
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleFetchTasks = async () => {
    dispatch(SHOW_LOADER());

    try {
      const response = await fetchTasks();

      if (response && response?.status === 200) {
        setTaskData(response?.data);
      } else {
        console.log('Failed to fetch Task');
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch user',
      );
      Toast.showWithGravity(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch user',
        2,
        Toast.BOTTOM,
      );
    } finally {
      dispatch(HIDE_LOADER());
    }
  };

  const handleTaskDetails = async (Id: any) => {
    dispatch(SHOW_LOADER());
    try {
      const response = await fetchTaskDetails(Id);

      if (response && response?.status === 200) {
        dispatch(SET_TASK(response?.data));
        navigation.navigate('AddTask');
      } else {
        console.log('Failed to fetch Task');
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch user',
      );
      Toast.showWithGravity(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch user',
        2,
        Toast.BOTTOM,
      );
    } finally {
      dispatch(HIDE_LOADER());
    }
  };

  const renderTaskList = useCallback(
    ({item}: {item: any}) => (
      <View style={{width: '100%', marginBottom: 10}} key={item?.id}>
        <Card item={item} handleTaskDetails={handleTaskDetails} />
      </View>
    ),
    [],
  );

  const handleCreate = () => {
    navigation.navigate('AddTask');
  };

  const handleLogout = async () => {
    dispatch(SHOW_LOADER());
    try {
      dispatch(REMOVE_TOKEN());
      await AsyncStorage.removeItem('userToken');
      dispatch(REMOVE_TASK());
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      Toast.show('User Logged out successfully', 2, Toast.CENTER);
    } finally {
      dispatch(HIDE_LOADER());
    }
  };

  return (
    <>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleCreate()}>
          <CreateIcon name="create-sharp" size={15} color={theme.background} />
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <VirtualizedList
        keyExtractor={(_: any, index: any) => index.toString()}
        getItemCount={() => 1}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        getItem={(_: any, index: any) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={() => (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={taskData}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={renderTaskList}
                  contentContainerStyle={{
                    marginBottom: heightPercentageToDP(10),
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
      />
    </>
  );
};

export default Dashboard;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
      gap: 20,
    },
    buttonsContainer: {
      borderWidth: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      borderColor: theme.borderColor,
    },
    button: {
      width: '95%',
      height: 40,
      backgroundColor: theme.blueColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      flexDirection: 'row',
      gap: 10,
    },
    buttonText: {
      color: theme.background,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });
