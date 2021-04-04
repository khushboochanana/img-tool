import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MediaLibraryScreen from '../screens/MediaLibrary';
import TabTwoScreen from '../screens/TabTwoScreen';
import { TabTwoParamList } from '../types';


const Drawer = createDrawerNavigator();
function InnerTabNavigator() {

    return (
        <Drawer.Navigator
            initialRouteName="TabTwo"
        >
            <Drawer.Screen name="TabTwo" component={TabTwoScreen} />
            <Drawer.Screen name="MediaLibraray" component={MediaLibraryScreen} />
        </Drawer.Navigator>);
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab


const TabTwoStack = createStackNavigator<TabTwoParamList>();

export default function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={InnerTabNavigator}
                options={{headerShown:false }}
            />
        </TabTwoStack.Navigator>
    );
}