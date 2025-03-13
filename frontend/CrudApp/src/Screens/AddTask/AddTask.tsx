import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import ErrorText from '../../Components/ErrorText/ErrorText';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';
import * as Yup from 'yup';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {createTask, updateTask} from '../../api/api';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {REMOVE_TASK} from '../../Redux/Reducers/TaskReducer';
import {SheetManager} from 'react-native-actions-sheet';
import {Sheets} from '../../constants/SheetConstants';
import {HIDE_LOADER, SHOW_LOADER} from '../../Redux/Reducers/LoaderReducers';
import LeftArrow from 'react-native-vector-icons/FontAwesome6';

const AddTask = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const taskDetails = useSelector((state: any) => state.task.Task);

  const initialValues = {
    title: Object.values(taskDetails).length > 0 ? taskDetails?.title : '',
    description:
      Object.values(taskDetails).length > 0 ? taskDetails?.description : '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
  });

  const handleCreate = async (values: any) => {
    dispatch(SHOW_LOADER());
    try {
      const payload = {
        title: values?.title,
        description: values?.description,
      };
      const response = await createTask(payload);

      if (response && response?.status === 201) {
        console.log('User data:', response?.data);
        Toast.show(response.data.message, 2, Toast.CENTER);
        navigation.navigate('Dashboard');
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

  const handleUpdate = async (values: any) => {
    dispatch(SHOW_LOADER());
    try {
      const payload = {
        title: values?.title,
        description: values?.description,
      };
      const response = await updateTask(payload, taskDetails?._id);

      if (response && response?.status === 200) {
        console.log('User data:', response?.data);
        Toast.show(response.data.message, 2, Toast.CENTER);
        dispatch(REMOVE_TASK());
        navigation.navigate('Dashboard');
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

  const handleDelete = () => {
    SheetManager.show(Sheets.DeleteSheet, {
      payload: taskDetails,
    });
  };

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowButton} onPress={handleDashboard}>
        <LeftArrow name="arrow-left-long" size={25} color={theme.blueColor} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {Object.values(taskDetails).length > 0
            ? 'UPDATE TASK'
            : 'CREATE TASK'}
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values =>
          Object.values(taskDetails).length > 0
            ? handleUpdate(values)
            : handleCreate(values)
        }
        enableReinitialize>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
        }) => (
          <>
            <View style={styles.inputFields}>
              <View>
                <Text style={styles.inputTitle}>Title</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholder="Enter task title"
                />

                {touched?.title && errors?.title && (
                  <ErrorText text={errors?.title} />
                )}
              </View>

              <View>
                <Text style={styles.inputTitle}>Description</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  placeholder="Enter task description"
                />
                {touched?.description && errors?.description && (
                  <ErrorText text={errors?.description} />
                )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButton}>
                <Text style={styles.submitText}>
                  {Object.values(taskDetails).length > 0
                    ? 'UPDATE & CONTINUE'
                    : 'SAVE & CONTINUE'}
                </Text>
              </TouchableOpacity>
              {Object.values(taskDetails).length > 0 && (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleDelete}>
                  <Text style={styles.submitText}>DELETE TASK</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddTask;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      gap: 20,
      paddingTop: heightPercentageToDP(20),
    },
    inputFields: {padding: 10, gap: 5},
    inputTitle: {
      color: theme.text,
      fontWeight: 'bold',
    },
    input: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical: 5,
      color: theme.text,
    },
    buttonContainer: {
      width: widthPercentageToDP('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 50,
      height: 80,
      backgroundColor: '#ECEAE7',
      borderColor: theme.cardDescription,
      flexDirection: 'row',
      padding: 15,
      gap: 10,
    },
    submitText: {
      color: theme.background,
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 13,
    },
    submitButton: {
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.blueColor,
      width: '50%',
      height: 45,
    },
    headerContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {fontSize: 19, fontWeight: 'bold'},
    arrowButton: {
      width: 50,
      height: 50,
      borderRadius: 50,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.borderColor,
      position: 'absolute',
      left: 10,
      top: 20,
    },
  });
