import React,{useEffect} from 'react'
import { Pressable, SafeAreaView, StyleSheet,Text,View } from 'react-native'
import { useSelector } from 'react-redux';

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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Events: {
    flex: 1,
    backgroundColor:'#1c2833',
  },
});
export default Event ;
