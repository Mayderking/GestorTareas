import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './screens/Inicio';
import EditarTarea from './screens/EditarTarea';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            headerLeft: () => null,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen name="EditarTarea" component={EditarTarea} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
