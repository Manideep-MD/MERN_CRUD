import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SheetProvider} from 'react-native-actions-sheet';
import Dashboard from '../Screens/Dashboard/Dashboard';
import Login from '../Screens/Login/Login';
import {useSelector} from 'react-redux';
import AddTask from '../Screens/AddTask/AddTask';
import Register from '../Screens/Register/Register';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const loginToken = useSelector((state: any) => state.auth.loginToken);

  const getInitialRoute = () => {
    if (loginToken) return 'Dashboard';
  };

  return (
    <NavigationContainer>
      <SheetProvider>
        <Stack.Navigator initialRouteName={getInitialRoute()}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTask}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
