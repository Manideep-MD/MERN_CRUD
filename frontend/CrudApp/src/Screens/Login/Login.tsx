import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import VisibleIcon from 'react-native-vector-icons/Entypo';
import NotVisibleIcon from 'react-native-vector-icons/Entypo';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {createStyles} from './Login.styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useCustomTheme} from '../../theme/ThemeContext';
import useAuth from '../../Utils/authUtils';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../constants/Regex';
import ErrorText from '../../Components/ErrorText/ErrorText';

const Login = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const [show, setShow] = useState(true);
  const focus = useIsFocused();
  const navigation = useNavigation<any>();
  const {handleLogin} = useAuth();

  useEffect(() => {
    setShow(true);
  }, [focus]);

  useFocusEffect(
    React.useCallback(() => {
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

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, '* Invalid email')
      .required('* Email is required'),
    password: Yup.string()
      .required('* Password is required')
      .matches(PASSWORD_REGEX, '* Invalid password'),
  });

  const handleShowPassword = () => {
    setShow(false);
    if (!show) {
      setShow(true);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleUserLogin = async (values: any) => {
    console.log(values, 'val');
    const payload = {
      email: values?.email.trim().toLowerCase(),
      password: values?.password,
    };
    await handleLogin(payload);
  };

  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>CRUD APP</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.backText}>Welcome Back</Text>
            <Text style={styles.loremText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Text>
          </View>

          <View>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={values => handleUserLogin(values)}
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
                <View style={styles.inputContainer}>
                  <View style={{gap: 13}}>
                    <View>
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor={theme.cardDescription}
                        style={styles.textInput}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                      <View style={styles.error}>
                        {touched?.email && errors?.email && (
                          <ErrorText text={errors?.email} />
                        )}
                      </View>
                    </View>

                    <View>
                      <TextInput
                        secureTextEntry={show}
                        placeholder="Password"
                        placeholderTextColor="#928F8F"
                        style={styles.textInput}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <TouchableOpacity
                        style={{position: 'absolute', right: 17, bottom: 25}}
                        onPress={handleShowPassword}>
                        {show ? (
                          <NotVisibleIcon
                            name="eye-with-line"
                            size={20}
                            color="#2C5DD1"
                          />
                        ) : (
                          <VisibleIcon name="eye" size={20} color="#2C5DD1" />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.errorPasswordContainer}>
                      {touched?.password && errors?.password && (
                        <ErrorText text={errors?.password} />
                      )}
                    </View>
                  </View>

                  <View style={styles.rememberContainer}>
                    <View style={styles.rememberTextContainer}>
                      {/* <Checkbox
                  // value={isSelected}
                  // onValueChange={setSelection}
                  // style={styles.checkbox}
                  /> */}
                      <Text style={styles.forgetText}>Remember Me</Text>
                    </View>
                    <View>
                      <Text style={styles.forgetText}>Forgot Password ?</Text>
                    </View>
                  </View>

                  <Pressable onPress={handleSubmit} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          </View>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleRegister}>
            <Text style={styles.createText}>Create an account !</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;
