import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createStyles} from './Register.styles';
import VisibleIcon from 'react-native-vector-icons/Entypo';
import NotVisibleIcon from 'react-native-vector-icons/Entypo';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../constants/Regex';
import {useCustomTheme} from '../../theme/ThemeContext';
import useAuth from '../../Utils/authUtils';
import ErrorText from '../../Components/ErrorText/ErrorText';

const Register = () => {
  const [show, setShow] = useState(true);
  const [confirm, setConfirm] = useState(true);
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);
  const focus = useIsFocused();
  const navigation = useNavigation<any>();

  const {handleRegister} = useAuth();

  useEffect(() => {
    setShow(true);
    setConfirm(true);
  }, [focus]);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('* Full name is required'),
    email: Yup.string()
      .matches(EMAIL_REGEX, '* Invalid email')
      .required('* Email is required'),
    password: Yup.string()
      .matches(PASSWORD_REGEX, '* Password is not secure')
      .required('* Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], '* Passwords must match')
      .required('* Confirmation is required'),
  });

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleUserRegister = async (values: any) => {
    const payload = {
      fullname: values?.fullName,
      email: values?.email.trim().toLowerCase(),
      password: values?.password,
    };
    handleRegister(payload);
  };

  const handleShowPassword = () => {
    setShow(false);
    if (!show) {
      setShow(true);
    }
  };

  const handleConfirm = () => {
    setConfirm(false);
    if (!confirm) {
      setConfirm(true);
    }
  };

  return (
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

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleUserRegister(values)}>
          {({errors, handleSubmit, values, handleChange, touched}) => (
            <View style={styles.inputContainer}>
              <View style={{gap: 13}}>
                <View>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#928F8F"
                    style={styles.textInput}
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                  />
                  <View style={styles.errorContainer}>
                    {touched?.fullName && errors?.fullName && (
                      <ErrorText text={errors?.fullName} />
                    )}
                  </View>
                </View>

                <View>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#928F8F"
                    style={styles.textInput}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  <View style={styles.errorContainer}>
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

                <View>
                  <TextInput
                    secureTextEntry={confirm}
                    placeholder="Confirm Password"
                    placeholderTextColor="#928F8F"
                    style={styles.textInput}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                  />
                  <TouchableOpacity
                    style={{position: 'absolute', right: 17, bottom: 25}}
                    onPress={handleConfirm}>
                    {confirm ? (
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
                  {touched?.confirmPassword && errors?.confirmPassword && (
                    <ErrorText text={errors?.confirmPassword} />
                  )}
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
                  <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.forgetText}>
                      Already have an account ?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Pressable onPress={handleSubmit} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>SIGN UP</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Register;
