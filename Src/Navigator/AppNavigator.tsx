import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { OptionScreen, TodoBasicScreen, TodoSauceScreen, TodoToolkitScreen } from '../Screen';
import AppRoute from './AppRoute';
import { navigationRef, rightToLeftAnimation } from './NavigatorUtil';

export type AppNavigatorParams = {
  [AppRoute.OPTION]: undefined;
  [AppRoute.TODO_BASIC]: undefined;
  [AppRoute.TODO_SAUCE]: undefined;
  [AppRoute.TODO_TOOLKIT]: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParams>();

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;
export default function AppNavigator(props: Partial<StackNavigatorProps>): React.ReactElement {
  return (
    <NavigationContainer ref={navigationRef} initialRouteName={AppRoute.OPTION}>
      <Stack.Navigator {...props} screenOptions={{ headerMode: 'screen', ...rightToLeftAnimation }}>
        <Stack.Screen name={AppRoute.OPTION} component={OptionScreen} />
        <Stack.Screen name={AppRoute.TODO_BASIC} component={TodoBasicScreen} />
        <Stack.Screen name={AppRoute.TODO_SAUCE} component={TodoSauceScreen} />
        <Stack.Screen name={AppRoute.TODO_TOOLKIT} component={TodoToolkitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
