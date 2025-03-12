import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {ThemeColors} from '../../theme/themeConfig';

export const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: wp('100%'),
      height: '100%',
      padding: 15,
      backgroundColor: 'white',
      display: 'flex',
      paddingTop: heightPercentageToDP(12),
    },
    textInput: {
      backgroundColor: 'transparent',
      paddingLeft: 20,
      borderRadius: 30,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#2C5DD1',
      color: '#2C5DD1',
      height: 50,
    },
    inputContainer: {
      gap: 10,
    },

    signUp: {
      fontSize: 20,
      paddingBottom: 50,
      paddingTop: 10,
      color: '#2C5DD1',
      fontWeight: 'bold',
      fontFamily: 'Arial',
    },

    loginButton: {
      borderWidth: 0,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: '#2C5DD1',
      elevation: 20,
    },

    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 30,
    },
    headerText: {
      fontSize: 30,
      color: theme.text,
      fontWeight: 'bold',
      letterSpacing: 1,
    },

    detailsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      padding: 15,
    },
    backText: {fontSize: 22, color: 'black', fontWeight: 'bold'},
    loremText: {color: '#928F8F', width: '100%', paddingLeft: 20},
    rememberContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rememberTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgetText: {color: '#2C5DD1', fontSize: 11},
    loginButtonText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Arial',
      letterSpacing: 1,
    },
    createButton: {paddingTop: 13, paddingBottom: 10},
    createText:{
      textAlign: 'center',
      color: '#2C5DD1',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: 'Arial',
      letterSpacing: 1,
    }
  });
