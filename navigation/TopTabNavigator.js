import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { View, SafeAreaView } from 'react-native';

import { CategoriesContext } from '../contexts/categories';
import EntriesScreen from '../screens/EntriesScreen';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />
      <CategoriesContext.Consumer>
        {([categories, setCategories]) => {
          if (categories.filter(c => c.show).length) {
            const scrollEnabled = categories.filter(c => c.show).length > 3;
            return (
              <TopTab.Navigator lazy tabBarOptions={{ scrollEnabled, tabStyle: scrollEnabled ? {width: 'auto', marginHorizontal: 20} : {} }}>
                {categories.filter(c => c.show).map((c) => <TopTab.Screen key={c.id} name={c.name} initialParams={{ key: c.id }} component={EntriesScreen} />)}
              </TopTab.Navigator>
            );
          } else  {
            return null;
          }
        }}
      </CategoriesContext.Consumer>
    </>
  );
}
