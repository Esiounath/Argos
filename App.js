import React from 'react'
import Login from './Login/Login'
import Event from './Home/Tab/Event'
import store from './Redux/store'
import { Provider } from 'react-redux'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Home/Home'
import Tab from './Home/Tab/Tab'

const Stack = createNativeStackNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1c2833',
  },
};
function App(){
  //const userData = useSelector((state) => state.auth)
  return(
    <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen component={Login} name="Login" options={{headerShown:false}}/>
          <Stack.Screen component={Home} name="Home" options={{headerShown:false}}/>
          <Stack.Screen component={Event} name="Events" options={{headerShown:false}}/>
          <Stack.Screen component={Tab} name="Tab" options={{headerShown:false}}/>
        </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
export default App ;