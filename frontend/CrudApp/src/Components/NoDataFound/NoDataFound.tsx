import {View, Text} from 'react-native';
import React from 'react';
import createStyle from './NoDataFound.styles';
import LottieView from 'lottie-react-native';
import { useCustomTheme } from '../../theme/ThemeContext';

const NoDataFound = () => {
  const colors = useCustomTheme();
  const styles = createStyle(colors);

  return (
    <View style={styles.nodataContainer}>
      <View style={styles.iconContainer}>
        <LottieView
          source={require('../../assets/animatedImages/Nodata.json')}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      </View>
      <Text style={styles.nodataText}>{'Sorry...! No data found'}</Text>
    </View>
  );
};

export default NoDataFound;
