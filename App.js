import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import AddTodo from './src/screens/AddTodo';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen 
            name='Adicione'
            component={AddTodo}
            options={{presentation: 'modal'}}
            
            />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </>
  );
}