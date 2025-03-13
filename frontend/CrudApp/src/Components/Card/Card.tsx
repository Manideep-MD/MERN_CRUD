import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import EditIcon from 'react-native-vector-icons/Feather';


interface CardProps {
  item: any;
  handleTaskDetails: any;
}

const Card: React.FC<CardProps> = ({item, handleTaskDetails}) => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text>{item?.title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleTaskDetails(item?._id)}>
          <EditIcon name="edit" size={22} color={theme.cardDescription} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleDelete()}>
          <DeleteIcon
            name="delete-outline"
            size={26}
            color={theme.cardDescription}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default React.memo(Card);

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme.borderColor,
    },
    buttonContainer: {flexDirection: 'row', gap: 15},
  });
