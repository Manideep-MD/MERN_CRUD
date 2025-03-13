import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';
import {useCustomTheme} from '../../theme/ThemeContext';
import {ThemeColors} from '../../theme/themeConfig';

interface ErrorProps {
  text: string;
}

const ErrorText: React.FC<ErrorProps> = ({text}) => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.errorContainer}>
      <ErrorIcon name="error-outline" size={16} color={'red'} />
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};

export default React.memo(ErrorText);

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    errorContainer: {flexDirection: 'row', alignItems: 'center', gap: 5},
  });
