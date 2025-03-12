import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemeColors} from '../../theme/themeConfig';
import {useCustomTheme} from '../../theme/ThemeContext';
import ErrorText from '../../Components/ErrorText/ErrorText';
import {Formik} from 'formik';
import * as Yup from 'yup';

const TaskDetails = () => {
  const {theme} = useCustomTheme();
  const styles = createStyles(theme);

  const initialValues = {
    title: '',
    description: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
  });

  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}
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
                      placeholder="Enter your task title"
                    />

                    {touched.title && errors.title && (
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
                      placeholder="Enter your task description"
                    />

                    {touched.description && errors.description && (
                      <ErrorText text={errors?.description} />
                    )}
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

export default TaskDetails;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
      gap: 20,
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
  });
