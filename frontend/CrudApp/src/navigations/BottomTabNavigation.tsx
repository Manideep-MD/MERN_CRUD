import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { renderTabIcon } from './helper';
import { useCustomTheme } from '../theme/ThemeContext';
import Login from '../Screens/Login/Login';


const BottomTab = createBottomTabNavigator();

export const BOTTOM_BAR_HEIGHT = 55;

const BottomTabNavigation = () => {

    const { theme } = useCustomTheme();

    return (
        <View style={styles.container}>
            <BottomTab.Navigator
                initialRouteName={'Login'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) =>
                        renderTabIcon(route, focused, color, size, theme),
                    headerShown: false,
                    tabBarActiveTintColor: theme?.primary,
                    tabBarLabelStyle: {
                        fontWeight: '500'
                    },
                    tabBarStyle: {
                        height: BOTTOM_BAR_HEIGHT,
                    },
                })}>
                <BottomTab.Screen name="Login" component={Login} />
            </BottomTab.Navigator>
        </View>
    );
};
export default BottomTabNavigation;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})