import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  DimensionValue,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ThemeColors} from '../../theme/themeConfig';
import CommonSheet from '../CommonSheet/CommonSheet';
import {Sheets} from '../../constants/SheetConstants';
import {useCustomTheme} from '../../theme/ThemeContext';
import {SheetManager} from 'react-native-actions-sheet';
import Toast from 'react-native-simple-toast';
import {deleteTask} from '../../api/api';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {REMOVE_TASK} from '../../Redux/Reducers/TaskReducer';
import {HIDE_LOADER, SHOW_LOADER} from '../../Redux/Reducers/LoaderReducers';

interface DeleteSheetProps {
  payload: any;
}

const DeleteSheet: React.FC<DeleteSheetProps> = ({payload}) => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    dispatch(SHOW_LOADER());
    try {
      const response = await deleteTask(payload?._id);

      if (response && response?.status === 200) {
        Toast.show(response?.data?.message, 2, Toast.CENTER);
        await SheetManager.hide(Sheets.DeleteSheet);
        navigation.navigate('Dashboard');
        dispatch(REMOVE_TASK());
        console.log('second');
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

  return (
    <CommonSheet
      sheetId={Sheets.DeleteSheet}
      title={'Delete Task'}
      showCancelBtn={true}>
      <View style={styles.fieldsContainer}>
        <Text style={styles.lightText}>
          {`Do you really want to delete ${payload?.title} task information`}
        </Text>
        <TouchableOpacity style={styles.input} onPress={handleDeleteTask}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input}
          onPress={() => SheetManager.hide(Sheets.DeleteSheet)}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </CommonSheet>
  );
};

export default DeleteSheet;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      backgroundColor: theme.primary,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      padding: 10,
      gap: 10,
    },
    fieldsContainer: {width: '100%'},
    lightText: {
      color: theme.cardDescription,
    },
    buttonText: {color: theme.background, fontWeight: 'bold'},
  });
