import React,{useEffect} from 'react'
import { Pressable, SafeAreaView, StyleSheet,Text} from 'react-native'
import { useSelector } from 'react-redux';
import Sidebar from '../Home';

 function Event({navigation}) {
    const userData = useSelector((state) => state.auth)
    useEffect(()=>{
        const time = setTimeout(()=>{
          if(userData.password === null && userData.token === null && userData.username === null && userData.alertNumber === null){
            navigation.navigate('Login')
          }
        },200)
        return () => clearTimeout(time)
      },[userData.username,userData.password,userData.token,userData.alertNumber]);
  return (
    <SafeAreaView style={styles.Events}>
      <Sidebar/>
      <Pressable onPress={()=>{navigation.goBack()}}>
        <Text style={styles.text}>
          Eden
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Events: {
    flex: 4,
    backgroundColor:'red',
  },
  text:{
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    margin:100,
  }
});
export default Event ;
