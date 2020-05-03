import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import TopTabNavigator from '../navigation/TopTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Entries';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerShown: getHeaderShown(route),
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Entries"
        component={TopTabNavigator}
        options={{
          title: '一覧',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-list-box" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '設定',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Entries':
      return '一覧';
    case 'Settings':
      return '設定';
  }
}

function getHeaderShown(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Entries':
      return false;
    case 'Settings':
      return true;
  }
}
