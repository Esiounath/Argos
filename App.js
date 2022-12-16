import React from 'react'
import Login from './Login/Login'
import store from './Redux/store'
//Appel au store général de Redux dans Argos/Redux
import { Provider } from 'react-redux'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native'
//Fonction de navigation entre les pages avec navigation.navigate(name="Login") "navigation.navigate('Login')"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//Page d'acceuille après la connexion utilisateur
import Home from './Home/Home'

const Stack = createNativeStackNavigator()
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1c2833',
  },
};
function App(){
  //Provider == donnée stockée dans le dossier Redux /Argos/Redux/
  /*Le code juste en bas sert à la navigation de chaque pages entre la page d'acceuille et le Login !*/
  return(
    <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen component={Login} name="Login" options={{headerShown:false}}/>
          <Stack.Screen component={Home} name="Home" options={{headerShown:false}}/>
        </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
export default App ;